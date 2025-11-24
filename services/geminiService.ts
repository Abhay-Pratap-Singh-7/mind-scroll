
import { GoogleGenAI, Type } from "@google/genai";
import { Task, QuizData } from "../types";

const API_KEY = process.env.API_KEY || '';

// Mock fallback in case API key is missing during demo
const MOCK_SCHEDULE: Task[] = [
  { time: '09:00', task: 'Review Goals (Simulated)' },
  { time: '10:00', task: 'Deep Work Session 1' },
  { time: '12:00', task: 'Lunch & Break' },
  { time: '13:00', task: 'Administrative Tasks' },
  { time: '15:00', task: 'Deep Work Session 2' },
  { time: '17:00', task: 'Wrap up & Plan tomorrow' }
];

const MOCK_QUIZ: QuizData[] = [
  {
      question: 'Which programming language is known as the "language of the web"?',
      options: [
        { id: 'opt1', text: 'Python', isCorrect: false },
        { id: 'opt2', text: 'JavaScript', isCorrect: true },
        { id: 'opt3', text: 'C++', isCorrect: false },
        { id: 'opt4', text: 'Java', isCorrect: false }
      ],
      explanation: 'JavaScript is the dominant client-side scripting language of the World Wide Web.'
  },
  {
    question: 'What is the powerhouse of the cell?',
    options: [
      { id: 'opt1', text: 'Nucleus', isCorrect: false },
      { id: 'opt2', text: 'Ribosome', isCorrect: false },
      { id: 'opt3', text: 'Mitochondria', isCorrect: true },
      { id: 'opt4', text: 'Golgi Apparatus', isCorrect: false }
    ],
    explanation: 'Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell\'s biochemical reactions.'
  }
];

export const generateSchedule = async (goals: string): Promise<Task[]> => {
  if (!API_KEY) {
    console.warn("No API_KEY found in env. Returning mock data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_SCHEDULE;
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Current date is ${new Date().toLocaleDateString()}. The user has these goals for today: "${goals}". Create a realistic, time-blocked schedule for them starting from now or morning. Return strict JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING, description: "Time of day (e.g., 09:00 AM)" },
              task: { type: Type.STRING, description: "Short task description" }
            },
            required: ["time", "task"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return MOCK_SCHEDULE;
    
    return JSON.parse(text) as Task[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const recoverDaySchedule = async (originalSchedule: Task[]): Promise<Task[]> => {
  if (!API_KEY) {
     console.warn("No API_KEY found. Returning shifted mock data.");
     await new Promise(resolve => setTimeout(resolve, 1000));
     return MOCK_SCHEDULE.map(t => ({...t, task: t.task + " (Recovered)"}));
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user has fallen behind on their schedule. Current time is ${currentTime}. Original schedule was: ${JSON.stringify(originalSchedule)}. Please create a 'Recover the Day' schedule that condenses remaining tasks or prioritizes key ones starting from ${currentTime}. Be encouraging. Return strict JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING, description: "Time of day" },
              task: { type: Type.STRING, description: "Task description" }
            },
            required: ["time", "task"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return MOCK_SCHEDULE;
    return JSON.parse(text) as Task[];
  } catch (error) {
    console.error("Gemini Recover Error:", error);
    throw error;
  }
};

export const generateQuiz = async (topic: string): Promise<QuizData[]> => {
    if (!API_KEY) {
      console.warn("No API_KEY found. Returning mock data.");
      await new Promise(resolve => setTimeout(resolve, 1500));
      return MOCK_QUIZ;
    }
  
    const ai = new GoogleGenAI({ apiKey: API_KEY });
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate 3 engaging multiple choice quiz questions about "${topic}". For each question provide 4 options (one correct) and a short interesting explanation. Return strict JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      text: { type: Type.STRING },
                      isCorrect: { type: Type.BOOLEAN }
                    },
                    required: ["text", "isCorrect"]
                  }
                },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "explanation"]
            }
          }
        }
      });
  
      const text = response.text;
      if (!text) return MOCK_QUIZ;
      
      const rawData = JSON.parse(text);
      // Post-process to add IDs
      return rawData.map((q: any, qIdx: number) => ({
          ...q,
          options: q.options.map((opt: any, oIdx: number) => ({
              ...opt,
              id: `q${qIdx}_opt${oIdx}`
          }))
      }));
  
    } catch (error) {
      console.error("Gemini Quiz Error:", error);
      throw error;
    }
  };