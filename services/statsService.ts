
export interface UserStats {
  minutesSaved: number; // Time spent in focus mode
  learningMinutes: number; // Time spent on quizzes/reading
  streak: number;
  lastLoginDate: string;
}

const STORAGE_KEY = 'mindscroll_user_stats';

const getTodayString = () => new Date().toDateString();

export const getStats = (): UserStats => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const defaultStats: UserStats = {
    minutesSaved: 0,
    learningMinutes: 0,
    streak: 1,
    lastLoginDate: getTodayString(),
  };

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStats));
    return defaultStats;
  }

  const stats = JSON.parse(stored) as UserStats;
  
  // Handle Streak Logic on Load
  const today = getTodayString();
  if (stats.lastLoginDate !== today) {
    const lastLogin = new Date(stats.lastLoginDate);
    const diffTime = Math.abs(new Date().getTime() - lastLogin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
        stats.streak += 1;
    } else if (diffDays > 1) {
        stats.streak = 1;
    }
    stats.lastLoginDate = today;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }

  return stats;
};

export const addMinutesSaved = (minutes: number) => {
  const stats = getStats();
  stats.minutesSaved += minutes;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  // Dispatch event for UI updates
  window.dispatchEvent(new Event('stats-updated'));
};

export const addLearningMinutes = (minutes: number) => {
  const stats = getStats();
  stats.learningMinutes += minutes;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  window.dispatchEvent(new Event('stats-updated'));
};
