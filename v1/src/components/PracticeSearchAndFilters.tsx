import React, { useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface PracticeSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  resultCount: number;
  totalCount: number;
  level: string;
}

const filterOptions = [
  { id: 'all', label: 'All Cards' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'recent', label: 'Recent' },
  { id: 'review', label: 'Due for Review' }
];

const PracticeSearchAndFilters: React.FC<PracticeSearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  resultCount,
  totalCount,
  level
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const handleClearSearch = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSearchChange('');
    // Keep focus on the input after clearing
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  }, [onSearchChange]);

  const handleFilterClick = useCallback((filterId: string) => {
    onFilterChange(filterId);
  }, [onFilterChange]);

  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <Input
              ref={searchInputRef}
              placeholder={`Search ${level} level cards...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              autoComplete="off"
              spellCheck={false}
              type="text"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                tabIndex={-1} // Prevent tab focus
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Results Counter */}
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {searchTerm ? (
              <span>
                {resultCount} of {totalCount} cards
                {resultCount !== totalCount && (
                  <span className="text-blue-600 dark:text-blue-400"> (filtered)</span>
                )}
              </span>
            ) : (
              <span>{totalCount} total cards</span>
            )}
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant={filter === option.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterClick(option.id)}
                className="transition-all duration-200 whitespace-nowrap"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Search Status */}
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Searching for: <span className="font-medium text-gray-700 dark:text-gray-300">"{searchTerm}"</span>
            {resultCount === 0 && (
              <span className="text-orange-600 dark:text-orange-400 ml-2">
                - No matches found. Try different keywords.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(PracticeSearchAndFilters);