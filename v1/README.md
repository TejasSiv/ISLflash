# ISL Flashcards App

A modern, interactive Indian Sign Language (ISL) learning application built with React, TypeScript, and Supabase.

## Features

- **Multi-Level Learning**: Beginner, Intermediate, and Advanced flashcard levels
- **Interactive Flashcards**: Click to flip and see sign descriptions with examples
- **Smart Search**: Real-time search across cards with live filtering
- **Progress Tracking**: Monitor learning progress, streaks, and accuracy
- **Dark Mode Support**: Full light/dark theme switching
- **Favorites & Review**: Mark cards for favorites and review later
- **Randomization**: Shuffle cards for varied learning experience
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Radix UI + Tailwind CSS
- **Backend**: Supabase (Database + Authentication)
- **State Management**: React Query for data fetching
- **Icons**: Lucide React
- **Deployment**: Lovable Platform

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd v1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
```sql
-- Run the SQL commands in seed_flashcards.sql in your Supabase SQL editor
```

5. Start the development server:
```bash
npm run dev
```

## Database Schema

The app uses a single `flashcards` table with the following structure:

```sql
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  examples JSONB DEFAULT '[]',
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  is_favorite BOOLEAN DEFAULT false,
  needs_review BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Key Components

- **FlashcardPractice**: Main practice interface with card flipping and progress tracking
- **LiveSearch**: Real-time search with dropdown results and card previews
- **PracticeSearchAndFilters**: Search and filter functionality for practice mode
- **ProgressDashboard**: Visual progress tracking and statistics
- **DataSeeder**: Utility for seeding sample flashcard data

## Features in Detail

### Search Functionality
- Real-time search across word, description, and examples
- Debounced input (300ms) for optimal performance
- Live result filtering with match highlighting
- Persistent search state during practice sessions

### Practice Mode
- Card flipping animation with front/back views
- Progress tracking with visual progress bar
- Favorite and review marking
- Shuffle functionality with Fisher-Yates algorithm
- Session completion tracking

### Theme Support
- Light/Dark/System theme modes
- Persistent theme preference
- Comprehensive dark mode styling across all components

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/

