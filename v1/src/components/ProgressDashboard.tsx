
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Award, Target, Calendar, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { UserStats } from '@/hooks/useFlashcardStats';

interface ProgressDashboardProps {
  userProgress: UserStats;
  isLoading?: boolean;
  onBack: () => void;
}

const ProgressDashboard = ({ userProgress, isLoading = false, onBack }: ProgressDashboardProps) => {
  const weeklyData = [
    { day: 'Mon', accuracy: 85, cardsLearned: 15 },
    { day: 'Tue', accuracy: 92, cardsLearned: 18 },
    { day: 'Wed', accuracy: 78, cardsLearned: 12 },
    { day: 'Thu', accuracy: 88, cardsLearned: 20 },
    { day: 'Fri', accuracy: 94, cardsLearned: 22 },
    { day: 'Sat', accuracy: 87, cardsLearned: 16 },
    { day: 'Sun', accuracy: 91, cardsLearned: 19 }
  ];

  const weakAreas = [
    { sign: 'Complex emotions', attempts: 8, accuracy: 45 },
    { sign: 'Family relationships', attempts: 12, accuracy: 58 },
    { sign: 'Time expressions', attempts: 6, accuracy: 62 },
    { sign: 'Food items', attempts: 10, accuracy: 67 },
    { sign: 'Weather terms', attempts: 7, accuracy: 71 }
  ];

  const levelProgress = userProgress.levelStats.map(stat => ({
    level: stat.level.charAt(0).toUpperCase() + stat.level.slice(1),
    completed: stat.completedCards,
    total: stat.totalCards,
    percentage: stat.totalCards > 0 ? Math.round((stat.completedCards / stat.totalCards) * 100) : 0
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your Learning Progress</h1>
          
          <div></div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="animate-pulse">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-3"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </Card>
            ))
          ) : (
            <>
              <Card className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <BookOpen className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {userProgress.totalLearned}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Cards Learned</div>
              </Card>
              
              <Card className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <Award className="h-8 w-8 mx-auto text-green-600 mb-3" />
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {userProgress.currentStreak}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
              </Card>
              
              <Card className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 mx-auto text-purple-600 mb-3" />
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {userProgress.accuracy}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Overall Accuracy</div>
              </Card>
              
              <Card className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <Target className="h-8 w-8 mx-auto text-orange-600 mb-3" />
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {userProgress.dailyGoal}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Daily Goal</div>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Level Progress */}
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Progress by Level
            </h3>
            
            <div className="space-y-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="text-right mt-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 ml-auto"></div>
                    </div>
                  </div>
                ))
              ) : (
                levelProgress.map((level, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700 dark:text-gray-200">{level.level}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {level.completed}/{level.total} cards
                      </span>
                    </div>
                    <Progress value={level.percentage} className="h-3" />
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {level.percentage}% complete
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Weekly Accuracy Chart */}
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week's Performance
            </h3>
            
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-20">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{day.day}</span>
                  </div>
                  
                  <div className="flex-1 mx-4">
                    <Progress value={day.accuracy} className="h-2" />
                  </div>
                  
                  <div className="text-right w-20">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{day.accuracy}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{day.cardsLearned} cards</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weak Areas */}
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Areas to Focus On
            </h3>
            
            <div className="space-y-4">
              {weakAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100">{area.sign}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {area.attempts} attempts • {area.accuracy}% accuracy
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="ml-4">
                    Practice Now
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievement Badges */}
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Award className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                <div className="font-medium text-yellow-800 dark:text-yellow-200">First Week</div>
                <div className="text-sm text-yellow-600 dark:text-yellow-300">7 days of practice</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="font-medium text-green-800 dark:text-green-200">Quick Learner</div>
                <div className="text-sm text-green-600 dark:text-green-300">50 cards in one day</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <BookOpen className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <div className="font-medium text-blue-800 dark:text-blue-200">Level Master</div>
                <div className="text-sm text-blue-600 dark:text-blue-300">Completed Beginner</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="font-medium text-purple-800 dark:text-purple-200">Perfectionist</div>
                <div className="text-sm text-purple-600 dark:text-purple-300">100% accuracy day</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
