import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LevelStats {
  level: string;
  totalCards: number;
  completedCards: number;
  favoriteCards: number;
  reviewCards: number;
}

export interface UserStats {
  totalLearned: number;
  currentStreak: number;
  accuracy: number;
  dailyGoal: number;
  levelStats: LevelStats[];
}

export const useFlashcardStats = () => {
  return useQuery({
    queryKey: ['flashcard-stats'],
    queryFn: async (): Promise<UserStats> => {
      // Fetch card counts by level
      const { data: levelCounts, error: levelError } = await supabase
        .from('flashcards')
        .select('level')
        .then(({ data, error }) => {
          if (error) throw error;
          
          // Count cards by level
          const counts = data?.reduce((acc, card) => {
            acc[card.level] = (acc[card.level] || 0) + 1;
            return acc;
          }, {} as Record<string, number>) || {};
          
          return { data: counts, error: null };
        });

      if (levelError) throw levelError;

      // Fetch favorite and review counts by level
      const { data: statusCounts, error: statusError } = await supabase
        .from('flashcards')
        .select('level, is_favorite, needs_review, last_seen')
        .then(({ data, error }) => {
          if (error) throw error;
          
          const stats = data?.reduce((acc, card) => {
            if (!acc[card.level]) {
              acc[card.level] = {
                favorites: 0,
                reviews: 0,
                completed: 0
              };
            }
            
            if (card.is_favorite) acc[card.level].favorites++;
            if (card.needs_review) acc[card.level].reviews++;
            if (card.last_seen) acc[card.level].completed++;
            
            return acc;
          }, {} as Record<string, { favorites: number; reviews: number; completed: number }>) || {};
          
          return { data: stats, error: null };
        });

      if (statusError) throw statusError;

      // Calculate overall stats
      const totalCards = Object.values(levelCounts || {}).reduce((sum, count) => sum + count, 0);
      const totalCompleted = Object.values(statusCounts || {}).reduce((sum, stats) => sum + stats.completed, 0);
      const totalFavorites = Object.values(statusCounts || {}).reduce((sum, stats) => sum + stats.favorites, 0);

      // Build level stats
      const levelStats: LevelStats[] = ['beginner', 'intermediate', 'advanced'].map(level => ({
        level,
        totalCards: levelCounts?.[level] || 0,
        completedCards: statusCounts?.[level]?.completed || 0,
        favoriteCards: statusCounts?.[level]?.favorites || 0,
        reviewCards: statusCounts?.[level]?.reviews || 0,
      }));

      // Mock some additional stats (you can enhance these with real calculations)
      return {
        totalLearned: totalCompleted,
        currentStreak: 12, // This could be calculated from last_seen dates
        accuracy: totalCompleted > 0 ? Math.round((totalCompleted / totalCards) * 100) : 0,
        dailyGoal: 20, // This could come from user preferences
        levelStats
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useCardCountsByLevel = () => {
  return useQuery({
    queryKey: ['card-counts-by-level'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flashcards')
        .select('level');

      if (error) throw error;

      const counts = data?.reduce((acc, card) => {
        acc[card.level] = (acc[card.level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return {
        beginner: counts.beginner || 0,
        intermediate: counts.intermediate || 0,
        advanced: counts.advanced || 0,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};