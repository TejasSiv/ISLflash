import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, Heart, Flag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';

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

interface LiveSearchProps {
  onCardSelect: (card: FlashCard, level: string) => void;
}

const LiveSearch = ({ onCardSelect }: LiveSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<FlashCard[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Helper function to safely parse examples
  const parseExamples = (examples: string | null): string[] => {
    if (!examples) return [];
    
    try {
      const parsed = JSON.parse(examples);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [String(parsed)];
    } catch (error) {
      return [examples];
    }
  };

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      setShowResults(true);

      try {
        const searchLower = debouncedSearchTerm.toLowerCase().trim();
        
        // Search in word, description, and examples
        const { data, error } = await supabase
          .from('flashcards')
          .select('*')
          .or(`word.ilike.%${searchLower}%,description.ilike.%${searchLower}%`);

        if (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } else {
          const transformedResults: FlashCard[] = (data || []).map(card => ({
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
          
          setSearchResults(transformedResults);
        }
      } catch (error) {
        console.error('Unexpected search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  const handleCardClick = (card: FlashCard) => {
    onCardSelect(card, card.level);
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <Input
          ref={searchInputRef}
          placeholder="Search for any sign or word... (type at least 2 characters)"
          value={searchTerm}
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);
          }}
          className="pl-12 pr-12 h-12 text-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          autoComplete="off"
          spellCheck={false}
          onFocus={() => {
            if (searchResults.length > 0 && searchTerm.trim().length >= 2) {
              setShowResults(true);
            }
          }}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {showResults && searchTerm.trim().length >= 2 && (
        <Card className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto z-50 border shadow-lg bg-white dark:bg-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isSearching ? 'Searching...' : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found`}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResults(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-pulse text-gray-500 dark:text-gray-400">
                  Searching flashcards...
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {highlightMatch(card.word, searchTerm)}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {card.level}
                          </Badge>
                          {card.is_favorite && (
                            <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                          )}
                          {card.needs_review && (
                            <Flag className="h-4 w-4 text-yellow-500" fill="currentColor" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {highlightMatch(card.description, searchTerm)}
                        </p>
                      </div>
                      <img 
                        src={card.image_url} 
                        alt={`Sign for ${card.word}`}
                        className="w-12 h-8 object-cover rounded ml-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No flashcards found for "{searchTerm}"
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default LiveSearch;