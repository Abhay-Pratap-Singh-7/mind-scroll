
import { FeedItem, FeedItemType } from './types';

export const NEWS_FEED: FeedItem[] = [
  {
    id: 'news-1',
    type: FeedItemType.NEWS,
    data: {
      category: 'SPACE',
      headline: 'James Webb Telescope Discovers New "Fluffy" Planet',
      summary: 'Astronomers have identified a planet with the density of cotton candy orbiting a red dwarf star 1,200 light-years away.',
      imageUrl: 'https://picsum.photos/800/600?random=1',
      color: 'purple',
      url: 'https://science.nasa.gov/mission/webb/'
    }
  },
  {
    id: 'news-2',
    type: FeedItemType.NEWS,
    data: {
      category: 'HEALTH',
      headline: 'The Science of Sleep: Why 8 Hours Matters',
      summary: 'New research links consistent sleep patterns to a 40% reduction in long-term cognitive decline markers.',
      imageUrl: 'https://picsum.photos/800/600?random=2',
      color: 'green',
      url: 'https://www.nih.gov/news-events'
    }
  },
  {
    id: 'news-3',
    type: FeedItemType.NEWS,
    data: {
      category: 'PRODUCTIVITY',
      headline: 'The 2-Minute Rule for Procrastination',
      summary: 'If a task takes less than two minutes, do it immediately. This simple rule can clear 50% of your daily clutter.',
      imageUrl: 'https://picsum.photos/800/600?random=3',
      color: 'yellow',
      url: 'https://jamesclear.com/procrastination'
    }
  },
  {
    id: 'news-4',
    type: FeedItemType.NEWS,
    data: {
      category: 'AI TECH',
      headline: 'Neural Interfaces Enter Human Trials',
      summary: 'A leading biotech firm has successfully implanted a wireless chip allowing paralyzed patients to control cursors with thought.',
      imageUrl: 'https://picsum.photos/800/600?random=4',
      color: 'blue',
      url: 'https://neuralink.com/'
    }
  }
];

export const QUIZ_FEED: FeedItem[] = [
  {
    id: 'quiz-1',
    type: FeedItemType.QUIZ,
    data: {
      question: 'Which programming language is known as the "language of the web"?',
      options: [
        { id: 'opt1', text: 'Python', isCorrect: false },
        { id: 'opt2', text: 'JavaScript', isCorrect: true },
        { id: 'opt3', text: 'C++', isCorrect: false },
        { id: 'opt4', text: 'Java', isCorrect: false }
      ],
      explanation: 'JavaScript is the dominant client-side scripting language of the World Wide Web.'
    }
  }
];

export const QUIZ_START_FEED: FeedItem[] = [
  {
    id: 'quiz-input',
    type: FeedItemType.QUIZ_INPUT,
    data: {}
  }
];

export const MINDFULNESS_FEED: FeedItem[] = [
  {
    id: 'mindfulness-1',
    type: FeedItemType.MINDFULNESS,
    data: {
      title: 'Box Breathing',
      instruction: 'Inhale for 4s, Hold for 4s, Exhale for 4s, Hold for 4s.',
      durationSeconds: 60
    }
  },
  {
    id: 'mindfulness-2',
    type: FeedItemType.MINDFULNESS,
    data: {
      title: '4-7-8 Relax',
      instruction: 'Inhale quietly for 4s. Hold breath for 7s. Exhale forcefully for 8s.',
      durationSeconds: 60
    }
  },
  {
    id: 'mindfulness-3',
    type: FeedItemType.MINDFULNESS,
    data: {
      title: 'Deep Focus',
      instruction: 'Focus intensely on the center circle. Let all other thoughts drift away.',
      durationSeconds: 60
    }
  }
];

export const SCHEDULER_START: FeedItem[] = [
  {
    id: 'scheduler-input',
    type: FeedItemType.SCHEDULER_INPUT,
    data: {} 
  }
];

export const FOCUS_MODE_FEED: FeedItem[] = [
  {
    id: 'focus-mode-1',
    type: FeedItemType.FOCUS_MODE,
    data: {
      apps: ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'Facebook', 'Snapchat']
    }
  }
];

// New Smart Scroll (Micro Learning) Feed
export const MICRO_LEARNING_FEED: FeedItem[] = [
  {
    id: 'ml-story-1',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'FICTION',
      title: 'Micro-Thriller',
      content: 'I woke up to hear knocking on glass. At first, I thought it was the window until I heard it come from the mirror.',
      subContent: '28 words'
    }
  },
  {
    id: 'ml-puzzle-1',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'PUZZLE',
      title: 'Mental Fitness',
      content: 'Jimmy’s mother had 4 children. She named the first Monday, the second Tuesday, and the third Wednesday. What is the name of the fourth child?',
      answer: 'Jimmy. (It\'s Jimmy\'s mother!)'
    }
  },
  {
    id: 'ml-vocab-1',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'VOCAB',
      title: 'Word of the Now',
      content: 'Ebullient',
      subContent: '/ih-BUHL-yuhnt/ (adj): Cheerful and full of energy.'
    }
  },
  {
    id: 'ml-story-2',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'FICTION',
      title: 'Micro-SciFi',
      content: 'The last man on Earth sat alone in a room. There was a knock on the door.',
      subContent: 'Frederic Brown'
    }
  },
  {
    id: 'ml-history-1',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'HISTORY',
      title: 'On This Day',
      content: 'On this day in 1969, Neil Armstrong became the first human to step onto the surface of the Moon.',
      subContent: 'July 20th'
    }
  },
  {
    id: 'ml-puzzle-2',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'PUZZLE',
      title: 'Pattern Recog',
      content: 'Which number comes next? 2, 3, 5, 9, 17...',
      answer: '33. (Multiply by 2, minus 1: 2*2-1=3, 3*2-1=5, etc.)'
    }
  },
  {
    id: 'ml-code-1',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'CODE',
      title: 'Logic Puzzle',
      content: 'What is the output of this JavaScript snippet?',
      codeSnippet: `console.log(0.1 + 0.2 === 0.3);`,
      answer: 'False. Due to floating point precision, 0.1 + 0.2 equals 0.30000000000000004.'
    }
  },
  {
    id: 'ml-book-1',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'BOOK',
      title: 'Book Nugget',
      content: '"You do not rise to the level of your goals. You fall to the level of your systems."',
      subContent: 'Atomic Habits by James Clear'
    }
  },
    {
    id: 'ml-vocab-2',
    type: FeedItemType.MICRO_LEARNING,
    data: {
      type: 'VOCAB',
      title: 'Word of the Now',
      content: 'Ineffable',
      subContent: '/in-EF-uh-buhl/ (adj): Too great or extreme to be expressed in words.'
    }
  }
];

export const POWER_SCROLL_FEED: FeedItem[] = [
    ...MICRO_LEARNING_FEED.slice(0, 3),
     {
    id: 'interrupter-1',
    type: FeedItemType.MINDFULNESS,
    data: {
      title: 'Interrupter Break',
      instruction: 'Stop. Take a deep breath. Drop your shoulders.',
      durationSeconds: 5
    }
  }
];

export const OFFLINE_GAMES_FEED: FeedItem[] = [
  {
    id: 'game-1',
    type: FeedItemType.OFFLINE_GAMES,
    data: {
      gameType: 'TIC_TAC_TOE',
      title: 'Neon Tic-Tac-Toe',
      description: 'Classic grid. You vs AI.'
    }
  },
  {
    id: 'game-2',
    type: FeedItemType.OFFLINE_GAMES,
    data: {
      gameType: 'RPS',
      title: 'Rock Paper Scissors',
      description: 'Quick draw against the machine.'
    }
  },
   {
    id: 'game-3',
    type: FeedItemType.OFFLINE_GAMES,
    data: {
      gameType: 'MEMORY',
      title: 'Memory Match',
      description: 'Find the matching pairs.'
    }
  }
];

export const DO_ONE_THING_TASKS = [
    "Drink a glass of water.",
    "Stretch your neck for 30 seconds.",
    "Clean one item off your desk.",
    "Take 3 deep breaths.",
    "Text a friend to say hi.",
    "Review your top goal for today.",
    "Fix your posture.",
    "Close your eyes for 20 seconds.",
    "Do 5 pushups.",
    "Clear your browser tabs."
];
