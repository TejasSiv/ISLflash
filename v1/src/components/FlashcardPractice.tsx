import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Flag, ArrowLeft, RotateCcw, Shuffle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { shuffleArray } from '@/utils/shuffle';
import { useDebounce } from '@/hooks/useDebounce';
import PracticeSearchAndFilters from '@/components/PracticeSearchAndFilters';

interface FlashcardPracticeProps {
  level: string;
  searchTerm?: string;
  filter?: string;
  selectedCard?: FlashCard | null;
  onBack: () => void;
}

interface FlashCard {
  id: string;
  word: string;
  image_url: string;
  description: string;
  examples: string[];
  level: string;
  is_favorite: boolean;
  needs_review: boolean;
  last_seen: Date | null;
}

const FlashcardPractice = ({ level, searchTerm: externalSearchTerm, filter: externalFilter, selectedCard, onBack }: FlashcardPracticeProps) => {
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filteredCards, setFilteredCards] = useState<FlashCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  
  // Internal search state for practice mode
  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const [internalFilter, setInternalFilter] = useState('all');
  
  // Use external search/filter if provided (from main page), otherwise use internal
  const activeSearchTerm = externalSearchTerm ?? internalSearchTerm;
  const activeFilter = externalFilter ?? internalFilter;
  
  
  // Debounce search for performance
  const debouncedSearchTerm = useDebounce(activeSearchTerm, 300);
  
  const { toast } = useToast();

  // Helper function to safely parse examples
  const parseExamples = (examples: string | null): string[] => {
    if (!examples) return [];
    
    try {
      // First try to parse as JSON
      const parsed = JSON.parse(examples);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      // If it's not an array, wrap it in an array
      return [String(parsed)];
    } catch (error) {
      // If JSON parsing fails, treat it as a plain string
      console.log('Examples field is not valid JSON, treating as plain text:', examples);
      return [examples];
    }
  };

  // Fetch flashcards from Supabase
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching flashcards for level:', level);
        
        let query = supabase
          .from('flashcards')
          .select('*');
        
        // Filter by level if specified
        if (level) {
          query = query.eq('level', level);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching flashcards:', error);
          toast({
            title: "Error loading flashcards",
            description: "Failed to load flashcards from database.",
            variant: "destructive",
          });
          return;
        }
        
        console.log('Fetched flashcards:', data);
        
        // Transform the data to match our interface
        const transformedCards: FlashCard[] = (data || []).map(card => ({
          id: card.id,
          word: card.word,
          image_url: card.image_url,
          description: card.description,
          examples: parseExamples(card.examples),
          level: card.level,
          is_favorite: card.is_favorite,
          needs_review: card.needs_review,
          last_seen: card.last_seen ? new Date(card.last_seen) : null
        }));
        
        // Shuffle cards on initial load for better learning experience
        const shuffledCards = shuffleArray(transformedCards);
        setCards(shuffledCards);
        setIsShuffled(true);
      } catch (error) {
        console.error('Error in fetchFlashcards:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while loading flashcards.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFlashcards();
  }, [level, toast]);

  useEffect(() => {
    // Early return if no cards
    if (cards.length === 0) {
      setFilteredCards([]);
      return;
    }

    // If a specific card is selected (from search), show only that card
    if (selectedCard) {
      setFilteredCards([selectedCard]);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      return;
    }

    let filtered = cards.filter(card => {
      // Search filter - more efficient search
      if (debouncedSearchTerm && debouncedSearchTerm.trim() !== '') {
        const searchLower = debouncedSearchTerm.toLowerCase().trim();
        const wordLower = card.word.toLowerCase();
        const descriptionLower = card.description.toLowerCase();
        
        // Search in word, description, and examples for better results
        const exampleText = card.examples.join(' ').toLowerCase();
        
        const matchesSearch = wordLower.includes(searchLower) || 
                             descriptionLower.includes(searchLower) || 
                             exampleText.includes(searchLower);
        
        if (!matchesSearch) {
          return false;
        }
      }
      
      // Category filter
      switch (activeFilter) {
        case 'favorites':
          return card.is_favorite;
        case 'review':
          return card.needs_review;
        case 'recent':
          return card.last_seen !== null;
        default:
          return true;
      }
    });
    
    setFilteredCards(filtered);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [debouncedSearchTerm, activeFilter, cards, selectedCard]);

  const currentCard = filteredCards[currentCardIndex];
  const progressPercentage = filteredCards.length > 0 ? ((currentCardIndex + 1) / filteredCards.length) * 100 : 0;

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = async (known: boolean) => {
    if (!currentCard) return;
    
    console.log(`Card "${currentCard.word}" marked as ${known ? 'known' : 'needs review'}`);
    
    try {
      // Update the card in the database
      const { error } = await supabase
        .from('flashcards')
        .update({
          needs_review: !known,
          last_seen: new Date().toISOString()
        })
        .eq('id', currentCard.id);
      
      if (error) {
        console.error('Error updating flashcard:', error);
        toast({
          title: "Error",
          description: "Failed to update flashcard progress.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in handleResponse:', error);
    }
    
    // Move to next card
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Session complete
      console.log('Session completed!');
      toast({
        title: "Session Complete!",
        description: `You've completed all ${filteredCards.length} cards.`,
      });
      onBack();
    }
  };

  const toggleFavorite = async () => {
    if (!currentCard) return;
    
    const newFavoriteStatus = !currentCard.is_favorite;
    
    try {
      const { error } = await supabase
        .from('flashcards')
        .update({ is_favorite: newFavoriteStatus })
        .eq('id', currentCard.id);
      
      if (error) {
        console.error('Error updating favorite status:', error);
        toast({
          title: "Error",
          description: "Failed to update favorite status.",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === currentCard.id 
            ? { ...card, is_favorite: newFavoriteStatus }
            : card
        )
      );
      
      toast({
        title: newFavoriteStatus ? "Added to Favorites" : "Removed from Favorites",
        description: `"${currentCard.word}" ${newFavoriteStatus ? 'added to' : 'removed from'} favorites.`,
      });
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
    }
  };

  const toggleReviewLater = async () => {
    if (!currentCard) return;
    
    const newReviewStatus = !currentCard.needs_review;
    
    try {
      const { error } = await supabase
        .from('flashcards')
        .update({ needs_review: newReviewStatus })
        .eq('id', currentCard.id);
      
      if (error) {
        console.error('Error updating review status:', error);
        toast({
          title: "Error",
          description: "Failed to update review status.",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === currentCard.id 
            ? { ...card, needs_review: newReviewStatus }
            : card
        )
      );
      
      toast({
        title: newReviewStatus ? "Marked for Review" : "Removed from Review",
        description: `"${currentCard.word}" ${newReviewStatus ? 'marked for' : 'removed from'} review.`,
      });
    } catch (error) {
      console.error('Error in toggleReviewLater:', error);
    }
  };

  const handleShuffle = () => {
    if (filteredCards.length > 0) {
      const shuffled = shuffleArray(filteredCards);
      setFilteredCards(shuffled);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setIsShuffled(true);
      
      toast({
        title: "Cards Shuffled!",
        description: `Randomized ${shuffled.length} cards for varied practice.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-800 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <Card className="p-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Loading flashcards...</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-800">
        {/* Search and Filters - show even when no cards found so user can search */}
        {!selectedCard && (
          <PracticeSearchAndFilters
            searchTerm={internalSearchTerm}
            onSearchChange={setInternalSearchTerm}
            filter={internalFilter}
            onFilterChange={setInternalFilter}
            resultCount={filteredCards.length}
            totalCount={cards.length}
            level={level}
          />
        )}
        
        <div className="max-w-2xl mx-auto text-center p-8">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <Card className="p-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">No cards found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {cards.length === 0 
                ? "No flashcards available for this level. Please add some flashcards to the database."
                : "Try adjusting your search or filter criteria."
              }
            </p>
            <Button onClick={onBack}>Return to Home</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-800">
      {/* Search and Filters - only show if not viewing a specific selected card */}
      {!selectedCard && (
        <PracticeSearchAndFilters
          searchTerm={internalSearchTerm}
          onSearchChange={setInternalSearchTerm}
          filter={internalFilter}
          onFilterChange={setInternalFilter}
          resultCount={filteredCards.length}
          totalCount={cards.length}
          level={level}
        />
      )}
      
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Badge variant="secondary">
                {level.charAt(0).toUpperCase() + level.slice(1)} Level
              </Badge>
              {isShuffled && (
                <Badge variant="outline" className="text-xs">
                  <Shuffle className="h-3 w-3 mr-1" />
                  Shuffled
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Card {currentCardIndex + 1} of {filteredCards.length}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShuffle}
              disabled={filteredCards.length <= 1}
              className="flex items-center gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
            <div className="w-24">
              <Progress value={progressPercentage} className="w-full" />
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <Card 
            className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleCardFlip}
          >
            {/* Front of card */}
            <div className={`absolute inset-0 backface-hidden ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="h-full p-8 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite();
                    }}
                    className={currentCard.is_favorite ? 'text-red-500' : 'text-gray-400'}
                  >
                    <Heart className="h-4 w-4" fill={currentCard.is_favorite ? 'currentColor' : 'none'} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReviewLater();
                    }}
                    className={currentCard.needs_review ? 'text-yellow-500' : 'text-gray-400'}
                  >
                    <Flag className="h-4 w-4" fill={currentCard.needs_review ? 'currentColor' : 'none'} />
                  </Button>
                </div>
                
                <div className="text-center">
                  <img 
                    src={currentCard.image_url} 
                    alt={`Sign for ${currentCard.word}`}
                    className="w-48 h-32 object-cover rounded-lg mb-6 mx-auto"
                  />
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {currentCard.word}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Click to see description</p>
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? '' : 'rotate-y-180'}`}>
              <div className="h-full p-8 flex flex-col justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    How to sign "{currentCard.word}"
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {currentCard.description}
                  </p>
                  
                  {currentCard.examples.length > 0 && (
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Example usage:</h4>
                      <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                        {currentCard.examples.map((example, index) => (
                          <li key={index} className="italic">• {example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Response Buttons */}
        {isFlipped && (
          <div className="flex justify-center gap-6 animate-fade-in">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleResponse(false)}
              className="px-8 py-3 border-orange-300 text-orange-700 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-900/20"
            >
              I'm Still Learning
            </Button>
            <Button
              size="lg"
              onClick={() => handleResponse(true)}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            >
              I Know This
            </Button>
          </div>
        )}

        {/* Flip Hint */}
        {!isFlipped && (
          <div className="text-center">
            <Button variant="ghost" onClick={handleCardFlip} className="text-gray-500 dark:text-gray-400">
              <RotateCcw className="h-4 w-4 mr-2" />
              Click card to flip and see description
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardPractice;