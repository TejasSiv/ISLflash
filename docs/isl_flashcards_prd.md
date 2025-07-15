## Product Requirements Document (PRD)

### 1. Purpose

The Indian Sign Language Flashcards App is a cross-platform desktop application (Windows & macOS) designed to help learners of all levels master Indian Sign Language (ISL) through interactive flashcards. Inspired by Magoosh’s vocabulary practice, the app provides spaced-repetition learning, varied difficulty levels, and progress tracking to ensure effective skill acquisition.

### 2. Goals & Success Metrics

- **Learning Efficacy**: Users demonstrate at least 80% retention on reviewed signs within one week.
- **Engagement**: Average daily session length ≥ 10 minutes.
- **Adoption**: 1,000 active users within 3 months of launch.
- **Retention**: 40% of new users return after 30 days.

### 3. Target Audience & Use Cases

- **Beginners**: Individuals with no prior knowledge of ISL.
- **Intermediate Learners**: Users familiar with basic signs seeking to expand vocabulary.
- **Advanced Users**: Fluent signers refining speed and accuracy.
- **Use Cases**:
  - Quick daily practice.
  - Preparing for standardized ISL certification.
  - Supplementary tool for ISL courses.

### 4. Core Features & Requirements

#### 4.1 Flashcards

- **Front**: Image or short video of the sign.
- **Back**: Text description and example usage.
- **Flip Interaction**: Click/tap to reveal back side.

#### 4.2 Difficulty Levels

- **Beginner**: 100 foundational signs.
- **Intermediate**: 200 common phrases & sentences.
- **Advanced**: 100 nuanced expressions & regional variants.

#### 4.3 Spaced-Repetition & Progress Tracker

- **Metrics**: seen\_count, correct\_count, last\_reviewed.
- **Dashboard**: Visual progress bars by level.
- **Daily Review**: Algorithm selects weak areas.

#### 4.4 Favorites & Review Later

- Mark signs as favorites.
- Separate review queue for flagged items.

#### 4.5 Search & Filter

- Search by keyword.
- Filter by difficulty, favorites, or recently added.

#### 4.6 Settings

- Theme (Light/Dark).
- Notification reminders (daily practice).
- Data sync options (offline vs. cloud).

### 5. User Stories

1. **As a Beginner**, I want to practice 20 new flashcards daily so that I can build foundational ISL vocabulary.
2. **As an Intermediate Learner**, I want to review only my weak signs so that I can focus on improvement.
3. **As an Advanced User**, I want to search for specific regional variations to refine my fluency.
4. **As any user**, I want to track my progress and see my accuracy rate over time.

### 6. Functional Requirements

- **FR1**: The system shall load flashcards from a local SQLite database.
- **FR2**: The system shall display flashcards one at a time with flip animation.
- **FR3**: The system shall record user response (know/don’t know) and update metrics.
- **FR4**: The system shall generate a daily review set based on spaced-repetition.
- **FR5**: The system shall allow marking/unmarking favorites.
- **FR6**: The system shall provide search and filter functionality.

### 7. Non-Functional Requirements

- **NFR1**: The app shall launch within 3 seconds.
- **NFR2**: The app shall support offline usage.
- **NFR3**: Data storage must be encrypted at rest.
- **NFR4**: UI responsiveness: animations < 200ms.
- **NFR5**: Compatibility: Windows 10+ & macOS 10.15+.

### 8. UI/UX Overview

- **Home Screen**: Level selector, Practice button, Progress summary.
- **Practice Screen**: Flashcard display, flip button, response buttons (Know/Don’t Know).
- **Dashboard**: Charts for progress by level, daily streak.
- **Settings**: Toggles for theme, reminders, data sync.

### 9. Technical Architecture

- **Frontend**: React + Tailwind, packaged via Tauri.
- **Backend**: Local FastAPI server (embedded) or direct DB access.
- **Database**: SQLite for flashcards & progress.
- **Media Storage**: Static assets in `public/media`.
- **State Management**: Zustand or Redux.

### 10. Data Model (Simplified)

```sql
-- Flashcards
CREATE TABLE signs (
  id TEXT PRIMARY KEY,
  word TEXT,
  level TEXT,
  image_path TEXT,
  video_path TEXT,
  description TEXT
);

-- User Progress
CREATE TABLE progress (
  sign_id TEXT PRIMARY KEY,
  seen_count INTEGER,
  correct_count INTEGER,
  last_reviewed DATE,
  favorite BOOLEAN
);
```

### 11. Roadmap & Milestones

| Milestone                    | Target Date  | Status  |
| ---------------------------- | ------------ | ------- |
| PRD Finalization             | Jul 7, 2025  | Planned |
| React UI Skeleton            | Jul 14, 2025 | Planned |
| SQLite Schema & Seed Data    | Jul 18, 2025 | Planned |
| Flashcard Practice Module    | Jul 25, 2025 | Planned |
| Progress Tracker & Dashboard | Aug 1, 2025  | Planned |
| Beta Release (Windows/Mac)   | Aug 15, 2025 | Planned |
| User Feedback & Iteration    | Sep 1, 2025  | Planned |
| Public Launch                | Sep 15, 2025 | Planned |

### 12. Risks & Assumptions

- **R1**: Quality of ISL media—requires clear, high-resolution assets.
- **R2**: Packaging complexities across OS—Tauri configuration.
- **A1**: Users have basic computer literacy.
- **A2**: Offline-first is sufficient; cloud sync is optional initially.

### 13. Appendix

- **A**: Glossary of terms.
- **B**: References to Indian Sign Language resources.
- **C**: UI wireframe sketches.

