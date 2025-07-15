
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, Flag, Search, BookOpen, TrendingUp, Award, Settings, Sun, Moon, Monitor, Loader2, X } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useFlashcardStats, useCardCountsByLevel } from '@/hooks/useFlashcardStats';
import { useDebounce } from '@/hooks/useDebounce';
import FlashcardPractice from '@/components/FlashcardPractice';
import ProgressDashboard from '@/components/ProgressDashboard';
import DataSeeder from '@/components/DataSeeder';
import LiveSearch from '@/components/LiveSearch';

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState('welcome'); // welcome, practice, progress, settings
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Debounce search term to avoid excessive re-renders
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Fetch dynamic data from Supabase
  const { data: flashcardStats, isLoading: statsLoading, error: statsError } = useFlashcardStats();
  const { data: cardCounts, isLoading: countsLoading } = useCardCountsByLevel();
  
  // Check if database is empty
  const totalCards = cardCounts ? Object.values(cardCounts).reduce((sum, count) => sum + count, 0) : 0;
  const showDataSeeder = !countsLoading && totalCards === 0;

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Basic signs and everyday words',
      cardCount: cardCounts?.beginner || 0,
      color: 'bg-green-100 hover:bg-green-200 border-green-300 dark:bg-green-800/30 dark:hover:bg-green-700/40 dark:border-green-600'
    },
    {
      id: 'intermediate', 
      title: 'Intermediate',
      description: 'Common phrases and expressions',
      cardCount: cardCounts?.intermediate || 0,
      color: 'bg-blue-100 hover:bg-blue-200 border-blue-300 dark:bg-blue-800/30 dark:hover:bg-blue-700/40 dark:border-blue-600'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Complex conversations and idioms',
      cardCount: cardCounts?.advanced || 0,
      color: 'bg-purple-100 hover:bg-purple-200 border-purple-300 dark:bg-purple-800/30 dark:hover:bg-purple-700/40 dark:border-purple-600'
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Cards' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'recent', label: 'Recent' },
    { id: 'review', label: 'Due for Review' }
  ];

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Indian Sign Language
            <span className="block text-blue-600 dark:text-blue-400">Flashcards</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master ISL step-by-step with our adaptive learning system. 
            Pick a level and start signing!
          </p>
        </div>

        {/* Progress Summary */}
        <Card className="max-w-4xl mx-auto p-8 mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          {statsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Loading your progress...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {flashcardStats?.totalLearned || 0}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Cards Learned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2 flex items-center justify-center gap-2">
                  {flashcardStats?.currentStreak || 0}
                  <Award className="h-6 w-6" />
                </div>
                <div className="text-gray-600 dark:text-gray-300">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {flashcardStats?.accuracy || 0}%
                </div>
                <div className="text-gray-600 dark:text-gray-300">Accuracy</div>
              </div>
            </div>
          )}
        </Card>

        {/* Live Search */}
        <div className="max-w-4xl mx-auto mb-12">
          <LiveSearch 
            onCardSelect={(card, level) => {
              setSelectedLevel(level);
              setSelectedCard(card);
              setCurrentView('practice');
            }}
          />
        </div>

        {/* Data Seeder for Empty Database */}
        {showDataSeeder && (
          <div className="max-w-2xl mx-auto mb-12">
            <DataSeeder />
          </div>
        )}

        {/* Level Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${level.color}`}
              onClick={() => {
                setSelectedLevel(level.id);
                setCurrentView('practice');
              }}
            >
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-700 dark:text-gray-200" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {level.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4">{level.description}</p>
                <Badge variant="secondary" className="text-sm bg-white/80 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {countsLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    level.cardCount
                  )} cards
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Access Navigation */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setCurrentView('progress')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            View Progress
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setCurrentView('settings')}
            className="flex items-center gap-2"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );

  const SearchAndFilters = React.memo(() => (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Search for any sign or word..."
              value={searchTerm}
              onChange={(e) => {
                e.preventDefault();
                setSearchTerm(e.target.value);
              }}
              className="pl-10 pr-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              autoComplete="off"
              spellCheck={false}
              autoFocus={false}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchTerm('');
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant={filter === option.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(option.id)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen">
      {currentView === 'welcome' && <WelcomeScreen />}
      
      {currentView === 'practice' && (
        <FlashcardPractice 
          level={selectedLevel}
          searchTerm={selectedCard ? undefined : debouncedSearchTerm}
          filter={selectedCard ? undefined : filter}
          selectedCard={selectedCard}
          onBack={() => {
            setCurrentView('welcome');
            setSelectedCard(null);
            setSelectedLevel('');
          }}
        />
      )}
      
      {currentView === 'progress' && (
        <ProgressDashboard 
          userProgress={flashcardStats || {
            totalLearned: 0,
            currentStreak: 0,
            accuracy: 0,
            dailyGoal: 20,
            levelStats: []
          }}
          isLoading={statsLoading}
          onBack={() => setCurrentView('welcome')}
        />
      )}
      
      {currentView === 'settings' && (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('welcome')}
              className="mb-6"
            >
              ← Back to Home
            </Button>
            
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Appearance</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTheme('light')}
                      className="flex items-center gap-2"
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTheme('dark')}
                      className="flex items-center gap-2"
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                    <Button 
                      variant={theme === 'system' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTheme('system')}
                      className="flex items-center gap-2"
                    >
                      <Monitor className="h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Daily Reminders</h3>
                  <Button variant="outline" size="sm">Set Reminder Time</Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Data</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Backup Progress</Button>
                    <Button variant="outline" size="sm">Restore Data</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
