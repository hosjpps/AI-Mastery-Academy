# AI Mastery Academy - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### In Progress
- TTS for audio learners

---

## [0.2.4] - 2025-12-28

### Added
- **Content Creation Track** (25 new quests!)
  - **Text Generation Subtrack** (8 quests)
    - Blog Writing with AI
    - Social Media Content
    - Email Marketing
    - Copywriting Formulas (AIDA, PAS)
    - Product Descriptions
    - SEO Content Creation
    - Video & Podcast Scripts
    - Content Repurposing Master (Boss Quest)
  - **Image Generation Subtrack** (8 quests)
    - Image AI Fundamentals
    - Visual Prompt Engineering
    - Brand Visual Identity
    - Social Media Graphics
    - AI Product Photography
    - Custom Illustrations
    - Thumbnails & Covers
    - Visual Campaign Master (Boss Quest)
  - **Presentations & Design Subtrack** (9 quests)
    - AI Presentation Basics
    - Slide Design Principles
    - Data Visualization
    - Pitch Deck Creation
    - Professional Reports
    - Infographic Design
    - Business Proposals
    - Template Systems
    - Complete Design System (Boss Quest)

### Technical
- 3 new subtracks in database
- 25 quests with full theory and practice content
- Total XP available: 3,925 XP in Content Creation Track
- 3 Boss Quests with advanced challenges

---

## [0.2.3] - 2025-12-28

### Added
- **Performance Optimizations**
  - Dynamic import for AI Coach widget (reduces initial bundle)
  - Server-side caching for quest-map data (1 hour TTL)
  - Loading skeletons for dashboard, profile, leaderboard, quest-map
  - Skeleton UI component (`@/components/ui/skeleton`)

- **UX Improvements**
  - Debounced username availability check (500ms delay)
  - Route prefetching for unlocked quests
  - Faster page transitions with loading states

### Changed
- Quest-map refactored to Server Component with cached data
- Username check no longer blocks UI during typing

### Technical
- New component: `Skeleton` for loading states
- Quest-map split into server (page.tsx) and client (quest-map-client.tsx)
- Uses `unstable_cache` for static content caching

---

## [0.2.2] - 2025-12-28

### Added
- **Public Profiles**
  - Public profile page at `/u/[username]`
  - Social meta tags for sharing (OG, Twitter)
  - Share button with native share API / clipboard fallback
  - Profile statistics visible to public (XP, level, streak, badges)
  - CTA for visitors to join the platform

- **Username Management**
  - Username editing in settings (with validation)
  - Real-time availability checking
  - Username format validation (letters, numbers, -, _)
  - Public profile link preview in settings

- **Share Profile**
  - Share button on private profile page
  - Share button on public profile page
  - Native share API support (mobile)
  - Clipboard fallback for desktop

### Changed
- Updated RLS policies to allow public viewing of user badges
- Profile settings now shows public profile link

### Technical
- New migration: `20251228_public_profiles.sql`
- New route: `/u/[username]` (public profile)
- 19 routes total (6 API, 13 pages)

---

## [0.2.1] - 2025-12-28

### Added
- **Advanced AI Coach**
  - Quest context awareness - AI knows current quest content
  - User profile personalization (learning style, career track, level)
  - Quick action buttons: Hint, Explain, Example
  - Dynamic suggested prompts based on context
  - Chat session history with session switching
  - Learning style-adapted responses (visual/auditory/kinesthetic)

- **Chat Sessions API**
  - `/api/chat/sessions` - List user's chat sessions
  - `/api/chat/sessions/[id]` - Load specific session messages

### Changed
- AI Coach widget now shows quest title when on quest page
- System prompt includes full user context and quest content
- Suggestions are dynamic based on whether user is on a quest

### Technical
- New `stores/questStore.ts` for global quest context
- New `components/chat/ai-coach-provider.tsx` wrapper
- 18 routes total (6 API, 12 pages)

---

## [0.2.0] - 2025-12-28

### Added
- **Gamification System**
  - Full streak system with XP multipliers (25%/50%/75%/100% at 3/7/14/30 days)
  - Auto-badge awarding on quest completion
  - 15+ badges (streak, level, XP, quest milestones)
  - Daily Challenge feature with bonus XP
  - Badge notification on earn
  - Level-up notification

- **Daily Challenge**
  - `/api/daily-challenge` endpoint
  - Dashboard card component
  - Date-seeded consistent daily quest selection
  - +50 bonus XP for daily completion

- **Landing Page Expansion**
  - Stats bar section
  - How It Works (4-step journey)
  - AI Coach preview with chat mockup
  - Quest preview cards (6 quests)
  - Testimonials section (3 reviews)
  - FAQ accordion (5 questions)
  - Enhanced footer with links
  - Navigation menu in header

### Changed
- Quest completion now uses centralized gamification system
- XP calculation includes streak multipliers
- Dashboard now shows Daily Challenge card

### Technical
- New `lib/gamification.ts` with all gamification utilities
- New `components/gamification/daily-challenge.tsx`
- 17 routes total (4 API, 13 pages)

---

## [0.1.0-beta] - 2025-12-28

### Added
- **Profile Page**
  - User stats display (XP, quests completed, streak)
  - Level progress visualization
  - Badges showcase
  - Account information

- **Settings Page**
  - Profile editing (display name)
  - Learning preferences (daily goal, learning style, career track)
  - Save functionality with toast notifications

- **Leaderboard Page**
  - Top 3 podium design
  - Full rankings list with user highlight
  - XP and streak display

- **Quest Content**
  - Added theory and practice content to 10 Foundation quests
  - RICE Framework for prompt structure
  - 5W1H Method for context
  - Output formatting techniques
  - Iterative prompting strategies
  - Total: 925 XP available in Foundation track

- **AI Evaluation API**
  - `/api/evaluate` endpoint for quest submissions
  - OpenRouter integration (GPT-4o-mini)
  - Structured evaluation with score (0-100) and feedback
  - Fallback mock evaluation when API unavailable

### Changed
- Quest submission now uses real AI evaluation instead of mock
- Updated dashboard layout with AI Coach widget
- Removed duplicate AI Coach button from sidebar

### Technical
- 16 routes total (5 API, 11 pages)
- API routes: `/api/chat`, `/api/evaluate`
- All TypeScript strict mode compliant

---

## [0.1.0-alpha] - 2025-12-27

### Added
- **Authentication System**
  - Login page with email/password
  - Registration page with username
  - Forgot password flow
  - OAuth callback handler
  - Protected routes with server-side auth
  - Supabase auth integration

- **Onboarding Flow**
  - Multi-step wizard (5 steps)
  - Learning style selection (visual, auditory, kinesthetic)
  - Career track selection (freelancer, entrepreneur, career, hobbyist)
  - Daily goal setting (5-60 minutes)
  - Profile update on completion

- **Dashboard**
  - Stats cards (Total XP, Level, Current Streak, Longest Streak)
  - Level progress bar with XP calculation
  - Continue learning section with quest cards
  - Learning tracks overview with progress

- **Quest System**
  - Quest Map page with expandable tracks
  - Quest path visualization with status indicators
  - Quest detail page with theory/practice tabs
  - Quest progress tracking (start, complete)
  - XP earning on quest completion
  - Navigation between quests

- **AI Coach**
  - Floating chat widget (bottom-right corner)
  - OpenRouter API integration (GPT-4o-mini)
  - Chat history saved to database
  - Context-aware system prompt
  - Quick suggestion buttons
  - Mock responses for development (no API key)

- **Gamification**
  - XP system with level thresholds
  - Level calculation (1-10 based on XP)
  - Streak tracking in profiles
  - User progress tracking per quest

- **UI Components (shadcn/ui)**
  - Button, Card, Input, Label
  - Avatar, Badge, Progress
  - Dialog, DropdownMenu
  - Textarea, Toast/Sonner

- **Layout**
  - Dashboard sidebar (desktop)
  - Mobile bottom navigation
  - Dashboard header with user menu
  - Responsive design

- **Database**
  - Complete schema migration
  - RLS policies enabled
  - Seed data for tracks, subtracks, quests, badges
  - TypeScript types generated

### Technical
- Next.js 15 with App Router
- Supabase client (server + client)
- Zustand store for user state
- Server Actions for auth
- API route for chat

---

## [0.0.1] - 2024-12-27

### Added
- Project documentation structure
  - `docs/ARCHITECTURE.md` - Technical architecture
  - `docs/PROJECT-STATUS.md` - Development status tracking
  - `docs/CHANGELOG.md` - This file
- Initial concept documents
  - `context.md` - Full product concept
  - `Content Strategy.md` - AI content generation strategy

### Decided
- Tech stack: Next.js 15 + Supabase + OpenRouter
- Primary AI model: Claude 3.5 Sonnet (evaluation)
- Secondary AI model: GPT-4o-mini (simple tasks)
- Hosting: Vercel
- Language: English only (MVP)
- First track: AI Content Creation

---

## Version History Format

```
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```

---

## Upcoming Versions

### [0.1.0] - MVP
- Authentication system
- Onboarding flow
- Foundation Track (10 quests)
- Basic gamification (XP, levels, streaks)
- AI Coach (basic)

### [0.2.0] - Content Track
- Content Creation Track (25 quests)
- Badges system
- Leaderboards
- Daily challenges

### [0.3.0] - Premium
- Stripe integration
- Premium tier
- Enhanced AI features

### [1.0.0] - Public Launch
- All core tracks complete
- Stable platform
- Production-ready
