import { supabase } from '@/integrations/supabase/client';

export const sampleFlashcards = [
  // Beginner Level Cards
  {
    word: "Hello",
    level: "beginner",
    description: "Raise your dominant hand to about shoulder height, with palm facing outward and fingers together. Wave your hand gently side to side.",
    image_url: "/placeholder.svg",
    examples: ["Hello, nice to meet you!", "Hello, how are you today?"],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Thank you",
    level: "beginner", 
    description: "Place your dominant hand flat against your chin with fingertips touching, then move your hand forward and slightly down.",
    image_url: "/placeholder.svg",
    examples: ["Thank you for your help!", "Thank you very much!"],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Please",
    level: "beginner",
    description: "Place your dominant hand flat on your chest, then move it in a small circular motion clockwise.",
    image_url: "/placeholder.svg",
    examples: ["Please help me.", "Please sit down."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Sorry",
    level: "beginner",
    description: "Make a fist with your dominant hand and rub it in a circular motion on your chest over your heart.",
    image_url: "/placeholder.svg",
    examples: ["Sorry, I'm late.", "Sorry for the confusion."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Yes",
    level: "beginner",
    description: "Make an 'S' handshape (closed fist) and nod it up and down like a head nodding.",
    image_url: "/placeholder.svg",
    examples: ["Yes, I agree.", "Yes, that's correct."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "No",
    level: "beginner",
    description: "Extend your index and middle fingers, then snap them closed against your thumb repeatedly.",
    image_url: "/placeholder.svg",
    examples: ["No, I disagree.", "No, that's wrong."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Water",
    level: "beginner",
    description: "Make a 'W' handshape and tap it twice against your chin.",
    image_url: "/placeholder.svg",
    examples: ["I need water.", "The water is cold."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Eat",
    level: "beginner",
    description: "Bring your fingertips to your lips as if putting food in your mouth, repeat the motion.",
    image_url: "/placeholder.svg",
    examples: ["Let's eat dinner.", "I want to eat."],
    is_favorite: false,
    needs_review: false
  },

  // Intermediate Level Cards
  {
    word: "Beautiful",
    level: "intermediate",
    description: "Start with a flat hand in front of your face, fingers spread. Close your fingers as you move your hand in a circle around your face.",
    image_url: "/placeholder.svg",
    examples: ["The sunset is beautiful.", "She has beautiful eyes."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Important",
    level: "intermediate",
    description: "Hold both hands in 'F' handshapes, then twist them upward simultaneously while bringing them closer together.",
    image_url: "/placeholder.svg",
    examples: ["This is very important.", "Education is important."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Family",
    level: "intermediate",
    description: "Make 'F' handshapes with both hands, thumbs touching, then move hands outward in a circle until pinkies touch.",
    image_url: "/placeholder.svg",
    examples: ["I love my family.", "Family is everything."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Friend",
    level: "intermediate",
    description: "Hook your index fingers together, then reverse the position so the other finger is on top.",
    image_url: "/placeholder.svg",
    examples: ["He is my best friend.", "Friends help each other."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Work",
    level: "intermediate",
    description: "Make fists with both hands, then tap the back of one hand on top of the other repeatedly.",
    image_url: "/placeholder.svg",
    examples: ["I go to work every day.", "Work hard for success."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "School",
    level: "intermediate",
    description: "Hold your non-dominant hand flat, then clap your dominant hand on top of it twice.",
    image_url: "/placeholder.svg",
    examples: ["I go to school.", "School starts tomorrow."],
    is_favorite: false,
    needs_review: false
  },

  // Advanced Level Cards
  {
    word: "Responsibility",
    level: "advanced",
    description: "Place both 'R' handshapes on your right shoulder, then move them across to your left shoulder.",
    image_url: "/placeholder.svg",
    examples: ["Taking responsibility is important.", "It's my responsibility to help."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Philosophy",
    level: "advanced",
    description: "Make a 'P' handshape and move it in a wavy motion in front of your forehead, indicating deep thinking.",
    image_url: "/placeholder.svg",
    examples: ["I study philosophy.", "His philosophy of life is simple."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Communication",
    level: "advanced",
    description: "Make 'C' handshapes with both hands, alternating them back and forth near your mouth and then extending outward.",
    image_url: "/placeholder.svg",
    examples: ["Good communication is key.", "We need better communication."],
    is_favorite: false,
    needs_review: false
  },
  {
    word: "Democracy",
    level: "advanced",
    description: "Make a 'D' handshape and move it in a straight line from left to right, indicating equality and fairness.",
    image_url: "/placeholder.svg",
    examples: ["Democracy gives people power.", "We live in a democracy."],
    is_favorite: false,
    needs_review: false
  }
];

export const seedFlashcards = async () => {
  try {
    console.log('Starting to seed flashcards...');
    
    // Check if cards already exist
    const { data: existingCards, error: checkError } = await supabase
      .from('flashcards')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('Error checking existing cards:', checkError);
      return { success: false, error: checkError };
    }
    
    if (existingCards && existingCards.length > 0) {
      console.log('Cards already exist in database');
      return { success: true, message: 'Cards already exist' };
    }
    
    // Insert sample cards
    const { data, error } = await supabase
      .from('flashcards')
      .insert(sampleFlashcards.map(card => ({
        ...card,
        examples: JSON.stringify(card.examples)
      })));
    
    if (error) {
      console.error('Error seeding flashcards:', error);
      return { success: false, error };
    }
    
    console.log('Successfully seeded flashcards:', data);
    return { success: true, data };
    
  } catch (error) {
    console.error('Unexpected error seeding flashcards:', error);
    return { success: false, error };
  }
};