
export enum FeedItemType {
  NEWS = 'NEWS',
  QUIZ = 'QUIZ',
  QUIZ_INPUT = 'QUIZ_INPUT',
  MINDFULNESS = 'MINDFULNESS',
  SCHEDULER_INPUT = 'SCHEDULER_INPUT',
  GENERATED_SCHEDULE = 'GENERATED_SCHEDULE',
  FOCUS_MODE = 'FOCUS_MODE',
  MICRO_LEARNING = 'MICRO_LEARNING',
  TASK_TRIAGE = 'TASK_TRIAGE',
  OFFLINE_GAMES = 'OFFLINE_GAMES',
}

export type AppMode = 'HOME' | FeedItemType | 'POWER_SCROLL';

export interface NewsData {
  category: string;
  headline: string;
  summary: string;
  imageUrl: string;
  color: 'purple' | 'green' | 'yellow' | 'blue';
  url?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizData {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface MindfulnessData {
  title: string;
  instruction: string;
  durationSeconds: number;
}

export interface Task {
  time: string;
  task: string;
}

export interface FocusModeData {
  apps: string[];
}

export interface MicroLearningData {
  type: 'VOCAB' | 'TRIVIA' | 'NEWS_SUMMARY' | 'HISTORY' | 'CODE' | 'BOOK' | 'FICTION' | 'PUZZLE';
  title: string;
  content: string;
  subContent?: string; // Pronunciation, Book Title, Author, or extra fact
  codeSnippet?: string; // For CODE type
  answer?: string; // For CODE/Logic/Puzzle type (revealable)
}

export interface TaskTriageData {
  taskId: string;
  text: string;
}

export interface GameData {
  gameType: 'TIC_TAC_TOE' | 'MEMORY' | 'RPS';
  title: string;
  description: string;
}

export interface Reward {
  id: string;
  name: string;
  type: 'ACCESSORY' | 'THEME' | 'TOKEN';
  icon: string;
}

export interface PetState {
  mood: 'Happy' | 'Sad' | 'Hungry' | 'Sleepy' | 'Sick' | 'Focused';
  treats: number;
  health: number;
  xp: number;
}

export interface FeedItem {
  id: string;
  type: FeedItemType;
  data: any; 
}
