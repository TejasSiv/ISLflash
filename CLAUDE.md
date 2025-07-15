# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Indian Sign Language (ISL) Flashcards application built as a React web app. The project aims to help learners master ISL through interactive flashcards with spaced-repetition learning, progress tracking, and varied difficulty levels.

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library
- Supabase for backend/database
- React Query for data fetching
- React Router for navigation

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Directory Structure
- `src/pages/` - Main application pages (Index.tsx is the primary page)
- `src/components/` - Feature components (FlashcardPractice, ProgressDashboard)
- `src/components/ui/` - Reusable UI components from shadcn/ui
- `src/integrations/supabase/` - Supabase client and type definitions
- `src/lib/` - Utility functions and design tokens
- `src/hooks/` - Custom React hooks
- `src/styles/` - Global styles and design tokens
- `public/` - Static assets

### Key Components
- **App.tsx** - Root component with routing, query client, and toast providers
- **Index.tsx** - Main page with view state management (welcome/practice/progress/settings)
- **FlashcardPractice.tsx** - Core flashcard learning interface with Supabase integration
- **ProgressDashboard.tsx** - User progress visualization

### Data Layer
- Uses Supabase as the backend database
- Flashcards stored in `flashcards` table with fields: id, word, level, image_url, description, examples, is_favorite, needs_review, last_seen
- React Query manages data fetching and caching
- Local state management for UI interactions

### Styling System
- Comprehensive design system defined in tailwind.config.ts
- Custom color palette, typography scale, spacing, and animations
- 3D transform utilities for card flip animations
- Responsive design patterns

## Working with the Codebase

### Adding New Features
- Follow existing component patterns in `src/components/`
- Use shadcn/ui components for consistency
- Implement proper TypeScript interfaces
- Use React Query for data operations
- Follow the established design system

### Database Operations
- All Supabase operations go through `src/integrations/supabase/client.ts`
- Use proper error handling with toast notifications
- Update local state after successful database operations

### Styling Guidelines
- Use Tailwind utility classes
- Leverage the custom design system colors and animations
- Follow responsive design patterns already established
- Use the 3D transform utilities for interactive elements

## Product Context

This app implements a spaced-repetition learning system for ISL with:
- Three difficulty levels (Beginner/Intermediate/Advanced)
- Favorites and review later functionality
- Progress tracking and daily streaks
- Search and filtering capabilities
- Responsive flashcard interface with flip animations

The app is designed to be packaged as a desktop application using Tauri (future roadmap item).