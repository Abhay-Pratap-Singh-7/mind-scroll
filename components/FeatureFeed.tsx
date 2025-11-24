
import React, { useState, useRef, useEffect } from 'react';
import { FeedItem, FeedItemType, AppMode, Task } from '../types';
import { NEWS_FEED, QUIZ_START_FEED, MINDFULNESS_FEED, SCHEDULER_START, FOCUS_MODE_FEED, POWER_SCROLL_FEED, MICRO_LEARNING_FEED, OFFLINE_GAMES_FEED } from '../constants';
import { NewsCard } from './NewsCard';
import { QuizCard } from './QuizCard';
import { QuizInputCard } from './QuizInputCard';
import { MindfulnessCard } from './MindfulnessCard';
import { SchedulerInputCard } from './SchedulerInputCard';
import { GeneratedScheduleCard } from './GeneratedScheduleCard';
import { FocusModeCard } from './FocusModeCard';
import { MicroLearningCard } from './MicroLearningCard';
import { TaskTriageCard } from './TaskTriageCard';
import { OfflineGameCard } from './OfflineGameCard';
import { generateSchedule, recoverDaySchedule, generateQuiz } from '../services/geminiService';
import { ChevronLeft } from 'lucide-react';

interface FeatureFeedProps {
  mode: AppMode;
  onBack: () => void;
  onRequestTrade?: () => void;
}

export const FeatureFeed: React.FC<FeatureFeedProps> = ({ mode, onBack, onRequestTrade }) => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (mode) {
      case FeedItemType.NEWS:
        setFeed(NEWS_FEED);
        break;
      case FeedItemType.QUIZ:
        setFeed(QUIZ_START_FEED);
        break;
      case FeedItemType.MINDFULNESS:
        setFeed(MINDFULNESS_FEED);
        break;
      case FeedItemType.SCHEDULER_INPUT:
        setFeed(SCHEDULER_START);
        break;
      case FeedItemType.FOCUS_MODE:
        setFeed(FOCUS_MODE_FEED);
        break;
      case FeedItemType.MICRO_LEARNING:
        setFeed(MICRO_LEARNING_FEED);
        break;
      case FeedItemType.OFFLINE_GAMES:
        setFeed(OFFLINE_GAMES_FEED);
        break;
      case 'POWER_SCROLL':
        setFeed(POWER_SCROLL_FEED);
        break;
      default:
        setFeed([]);
    }
  }, [mode]);

  const handleScheduleGenerate = async (goals: string, isRecovery: boolean = false) => {
    const inputIndex = feed.findIndex(item => item.type === FeedItemType.SCHEDULER_INPUT);
    
    try {
        let schedule: Task[];
        if (isRecovery) {
            // Pass empty array or existing schedule if we had state management for it, 
            // for now we mock it in service or pass empty
            schedule = await recoverDaySchedule([]);
        } else {
            schedule = await generateSchedule(goals);
        }
        
        const newScheduleItem: FeedItem = {
            id: `schedule-result-${Date.now()}`,
            type: FeedItemType.GENERATED_SCHEDULE,
            data: { tasks: schedule }
        };

        const newFeed = [...feed];
        // Insert result right after the input
        newFeed.splice(inputIndex + 1, 0, newScheduleItem);
        setFeed(newFeed);

        setTimeout(() => {
            if (scrollContainerRef.current) {
                const height = scrollContainerRef.current.clientHeight;
                scrollContainerRef.current.scrollTo({
                    top: (inputIndex + 1) * height,
                    behavior: 'smooth'
                });
            }
        }, 100);

    } catch (error) {
        console.error("Failed to generate schedule", error);
        alert("Could not generate schedule. Please check your API key.");
    }
  };

  const handleQuizGenerate = async (topic: string) => {
    const inputIndex = feed.findIndex(item => item.type === FeedItemType.QUIZ_INPUT);
    
    try {
        const quizDataArray = await generateQuiz(topic);
        
        const newQuizItems: FeedItem[] = quizDataArray.map((q, idx) => ({
            id: `generated-quiz-${Date.now()}-${idx}`,
            type: FeedItemType.QUIZ,
            data: q
        }));

        const newFeed = [...feed];
        // Insert result right after the input
        newFeed.splice(inputIndex + 1, 0, ...newQuizItems);
        setFeed(newFeed);

        setTimeout(() => {
            if (scrollContainerRef.current) {
                const height = scrollContainerRef.current.clientHeight;
                scrollContainerRef.current.scrollTo({
                    top: (inputIndex + 1) * height,
                    behavior: 'smooth'
                });
            }
        }, 100);

    } catch (error) {
        console.error("Failed to generate quiz", error);
        alert("Could not generate quiz. Please check your API key.");
    }
  };

  return (
    <div className="h-full w-full relative bg-transparent">
      {/* Back Button - Fixed Position container */}
      <div className="absolute top-4 left-6 z-50 flex items-center h-8">
        <button 
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
            <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Feed */}
      <div 
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
      >
        {feed.map((item, index) => (
          <div 
            key={item.id} 
            className="h-full w-full snap-start flex items-center justify-center relative border-b border-white/5"
          >
             {/* Counter - Absolute to slide, matching header position */}
             {feed.length > 1 && (
               <div className="absolute top-4 right-6 z-50 flex items-center h-8">
                  <div className="text-[10px] font-bold text-white/40 font-mono tracking-widest bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                      {index + 1} / {feed.length}
                  </div>
               </div>
             )}

            {item.type === FeedItemType.NEWS && <NewsCard data={item.data} />}
            {item.type === FeedItemType.QUIZ && <QuizCard data={item.data} />}
            {item.type === FeedItemType.QUIZ_INPUT && <QuizInputCard onGenerate={handleQuizGenerate} />}
            {item.type === FeedItemType.MINDFULNESS && <MindfulnessCard data={item.data} />}
            {item.type === FeedItemType.SCHEDULER_INPUT && <SchedulerInputCard onGenerate={handleScheduleGenerate} />}
            {item.type === FeedItemType.GENERATED_SCHEDULE && <GeneratedScheduleCard tasks={item.data.tasks} />}
            {item.type === FeedItemType.FOCUS_MODE && <FocusModeCard data={item.data} onRequestTrade={onRequestTrade} />}
            {item.type === FeedItemType.MICRO_LEARNING && <MicroLearningCard data={item.data} />}
            {item.type === FeedItemType.TASK_TRIAGE && <TaskTriageCard data={item.data} />}
            {item.type === FeedItemType.OFFLINE_GAMES && <OfflineGameCard data={item.data} />}
          </div>
        ))}
      </div>

       {/* Hint only if scrollable */}
       {feed.length > 1 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-40 opacity-50">
            <div className="flex flex-col items-center gap-1 animate-bounce">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Swipe</div>
            </div>
        </div>
       )}
    </div>
  );
};
