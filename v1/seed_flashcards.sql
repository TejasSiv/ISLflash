-- Sample ISL Flashcards Data
-- Run this in your Supabase SQL Editor to populate the flashcards table

INSERT INTO flashcards (word, image_url, description, examples, level, is_favorite, needs_review) VALUES

-- Beginner Level Cards
('Hello', '/placeholder.svg', 'Raise your dominant hand to about shoulder height, with palm facing outward and fingers together. Wave your hand gently side to side.', '["Hello, nice to meet you!", "Hello, how are you today?"]', 'beginner', false, false),

('Thank you', '/placeholder.svg', 'Place your dominant hand flat against your chin with fingertips touching, then move your hand forward and slightly down.', '["Thank you for your help!", "Thank you very much!"]', 'beginner', false, false),

('Please', '/placeholder.svg', 'Place your dominant hand flat on your chest, then move it in a small circular motion clockwise.', '["Please help me.", "Please sit down."]', 'beginner', false, false),

('Sorry', '/placeholder.svg', 'Make a fist with your dominant hand and rub it in a circular motion on your chest over your heart.', '["Sorry, I''m late.", "Sorry for the confusion."]', 'beginner', false, false),

('Yes', '/placeholder.svg', 'Make an ''S'' handshape (closed fist) and nod it up and down like a head nodding.', '["Yes, I agree.", "Yes, that''s correct."]', 'beginner', false, false),

('No', '/placeholder.svg', 'Extend your index and middle fingers, then snap them closed against your thumb repeatedly.', '["No, I disagree.", "No, that''s wrong."]', 'beginner', false, false),

('Water', '/placeholder.svg', 'Make a ''W'' handshape and tap it twice against your chin.', '["I need water.", "The water is cold."]', 'beginner', false, false),

('Eat', '/placeholder.svg', 'Bring your fingertips to your lips as if putting food in your mouth, repeat the motion.', '["Let''s eat dinner.", "I want to eat."]', 'beginner', false, false),

('Good', '/placeholder.svg', 'Place your dominant hand flat with fingers pointing up, then move it down to rest on your non-dominant hand which is held flat.', '["That''s very good!", "Good job on your work."]', 'beginner', false, false),

('Bad', '/placeholder.svg', 'Place your dominant hand flat against your chin, then flip it down and away from your face with a quick motion.', '["The weather is bad today.", "That''s a bad idea."]', 'beginner', false, false),

-- Intermediate Level Cards
('Beautiful', '/placeholder.svg', 'Start with a flat hand in front of your face, fingers spread. Close your fingers as you move your hand in a circle around your face.', '["The sunset is beautiful.", "She has beautiful eyes."]', 'intermediate', false, false),

('Important', '/placeholder.svg', 'Hold both hands in ''F'' handshapes, then twist them upward simultaneously while bringing them closer together.', '["This is very important.", "Education is important."]', 'intermediate', false, false),

('Family', '/placeholder.svg', 'Make ''F'' handshapes with both hands, thumbs touching, then move hands outward in a circle until pinkies touch.', '["I love my family.", "Family is everything."]', 'intermediate', false, false),

('Friend', '/placeholder.svg', 'Hook your index fingers together, then reverse the position so the other finger is on top.', '["He is my best friend.", "Friends help each other."]', 'intermediate', false, false),

('Work', '/placeholder.svg', 'Make fists with both hands, then tap the back of one hand on top of the other repeatedly.', '["I go to work every day.", "Work hard for success."]', 'intermediate', false, false),

('School', '/placeholder.svg', 'Hold your non-dominant hand flat, then clap your dominant hand on top of it twice.', '["I go to school.", "School starts tomorrow."]', 'intermediate', false, false),

('Love', '/placeholder.svg', 'Cross both arms over your chest and hug yourself, as if embracing something dear to your heart.', '["I love you very much.", "Love makes life meaningful."]', 'intermediate', false, false),

('Happy', '/placeholder.svg', 'Use both hands with fingers spread, palms facing your body, and brush them upward on your chest repeatedly.', '["I am very happy today.", "Happy birthday to you!"]', 'intermediate', false, false),

-- Advanced Level Cards
('Responsibility', '/placeholder.svg', 'Place both ''R'' handshapes on your right shoulder, then move them across to your left shoulder.', '["Taking responsibility is important.", "It''s my responsibility to help."]', 'advanced', false, false),

('Philosophy', '/placeholder.svg', 'Make a ''P'' handshape and move it in a wavy motion in front of your forehead, indicating deep thinking.', '["I study philosophy.", "His philosophy of life is simple."]', 'advanced', false, false),

('Communication', '/placeholder.svg', 'Make ''C'' handshapes with both hands, alternating them back and forth near your mouth and then extending outward.', '["Good communication is key.", "We need better communication."]', 'advanced', false, false),

('Democracy', '/placeholder.svg', 'Make a ''D'' handshape and move it in a straight line from left to right, indicating equality and fairness.', '["Democracy gives people power.", "We live in a democracy."]', 'advanced', false, false),

('Independence', '/placeholder.svg', 'Make ''I'' handshapes with both hands, cross them at the wrists, then separate them outward and upward.', '["Independence Day celebration.", "Financial independence is a goal."]', 'advanced', false, false),

('Opportunity', '/placeholder.svg', 'Make ''O'' handshapes with both hands, then move them forward and slightly upward, as if grasping a chance.', '["This is a great opportunity.", "Opportunity knocks once."]', 'advanced', false, false);

-- Verify the data was inserted
SELECT level, COUNT(*) as card_count FROM flashcards GROUP BY level ORDER BY 
  CASE level 
    WHEN 'beginner' THEN 1 
    WHEN 'intermediate' THEN 2 
    WHEN 'advanced' THEN 3 
  END;