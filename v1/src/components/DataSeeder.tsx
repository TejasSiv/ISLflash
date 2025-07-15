import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { seedFlashcards } from '@/utils/seedFlashcards';
import { Loader2, Database, CheckCircle } from 'lucide-react';

const DataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);
  const { toast } = useToast();

  const handleSeedData = async () => {
    setIsSeeding(true);
    
    try {
      const result = await seedFlashcards();
      
      if (result.success) {
        setIsSeeded(true);
        toast({
          title: "Success!",
          description: "Sample flashcards have been added to your database.",
        });
        
        // Refresh the page to show the new data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: "Failed to seed flashcards. Please check the console for details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while seeding data.",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  if (isSeeded) {
    return (
      <Card className="p-6 text-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Data Seeded Successfully!
        </h3>
        <p className="text-green-600 dark:text-green-300 mb-4">
          Sample flashcards have been added to your database. The page will refresh shortly to show the new data.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 text-center">
      <Database className="h-12 w-12 mx-auto text-blue-600 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        No Flashcards Found
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        It looks like your database is empty. Would you like to add some sample ISL flashcards to get started?
      </p>
      <Button 
        onClick={handleSeedData} 
        disabled={isSeeding}
        className="flex items-center gap-2"
      >
        {isSeeding ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Database className="h-4 w-4" />
        )}
        {isSeeding ? 'Adding Sample Data...' : 'Add Sample Flashcards'}
      </Button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
        This will add 20 sample ISL flashcards across all difficulty levels.
      </p>
    </Card>
  );
};

export default DataSeeder;