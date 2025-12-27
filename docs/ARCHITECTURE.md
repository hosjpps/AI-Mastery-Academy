# AI Mastery Academy - Architecture

> Last updated: 2024-12-27

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Component Structure](#component-structure)
- [AI Integration](#ai-integration)
- [Gamification System](#gamification-system)

---

## Overview

AI Mastery Academy is a gamified learning platform for AI skills. Built as a solo developer project with a focus on simplicity, scalability, and AI-first approach.

### Key Principles
- **Supabase-first**: Leverage managed services to reduce ops burden
- **AI-native**: OpenRouter for flexible model selection
- **Gamification**: XP, levels, streaks, badges for engagement
- **Adaptive learning**: Content personalized to learning style

---

## Tech Stack

### Frontend
| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | Next.js 15 (App Router) | SSR, API routes, Vercel native |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI development |
| Animations | Framer Motion | Gamification animations |
| State | Zustand | Simple global state |
| Data Fetching | TanStack Query | Caching, sync |
| Forms | React Hook Form + Zod | Validation |

### Backend
| Category | Technology | Purpose |
|----------|------------|---------|
| Database | Supabase PostgreSQL | Primary data store |
| Auth | Supabase Auth | Google OAuth + Email |
| Storage | Supabase Storage | User screenshots |
| Realtime | Supabase Realtime | AI Coach chat |
| Edge Functions | Supabase Edge Functions | AI API calls |

### AI Layer
| Category | Technology | Purpose |
|----------|------------|---------|
| LLM Gateway | OpenRouter | Unified API for all models |
| Primary Model | Claude 3.5 Sonnet | Evaluation, complex coaching |
| Secondary Model | GPT-4o-mini | Hints, simple tasks, chat |
| SDK | Vercel AI SDK | Streaming responses |

### Infrastructure
| Category | Technology | Purpose |
|----------|------------|---------|
| Hosting | Vercel | Frontend + API |
| Analytics | PostHog | Product analytics |
| Error Tracking | Sentry | Error monitoring |
| Email | Resend | Transactional emails |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    Next.js 15 (Vercel)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │  Pages   │  │   UI     │  │  State   │  │  AI Chat     │    │
│  │ (App     │  │ shadcn/  │  │ Zustand  │  │  Component   │    │
│  │ Router)  │  │ ui       │  │          │  │              │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                   │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │  Next.js API     │  │  Supabase Edge   │                     │
│  │  Routes          │  │  Functions       │                     │
│  │  /api/*          │  │  (AI calls)      │                     │
│  └────────┬─────────┘  └────────┬─────────┘                     │
└───────────┼─────────────────────┼───────────────────────────────┘
            │                     │
            ▼                     ▼
┌───────────────────────┐  ┌──────────────────────────────────────┐
│      SUPABASE         │  │           AI LAYER                   │
│  ┌─────────────────┐  │  │  ┌──────────────────────────────┐   │
│  │   PostgreSQL    │  │  │  │        OpenRouter            │   │
│  │   - profiles    │  │  │  │  ┌────────┐ ┌────────────┐  │   │
│  │   - quests      │  │  │  │  │ Claude │ │ GPT-4o-mini│  │   │
│  │   - progress    │  │  │  │  └────────┘ └────────────┘  │   │
│  │   - gamification│  │  │  └──────────────────────────────┘   │
│  ├─────────────────┤  │  └──────────────────────────────────────┘
│  │   Auth          │  │
│  ├─────────────────┤  │
│  │   Storage       │  │
│  ├─────────────────┤  │
│  │   Realtime      │  │
│  └─────────────────┘  │
└───────────────────────┘
```

---

## Database Schema

### Core Tables

```sql
-- Users & Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,

  -- Onboarding
  learning_style TEXT CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic')),
  career_track TEXT CHECK (career_track IN ('freelancer', 'entrepreneur', 'career', 'hobbyist')),
  daily_goal_minutes INTEGER DEFAULT 15,

  -- Gamification
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracks (Content Creation, Automation, Development)
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER,
  is_locked BOOLEAN DEFAULT false,
  unlock_requirements JSONB
);

-- Subtracks
CREATE TABLE subtracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES tracks(id),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER,
  is_locked BOOLEAN DEFAULT false,
  UNIQUE(track_id, slug)
);

-- Quests
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtrack_id UUID REFERENCES subtracks(id),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_minutes INTEGER,
  xp_reward INTEGER DEFAULT 100,
  quest_type TEXT CHECK (quest_type IN ('lesson', 'practice', 'boss', 'daily')),
  content JSONB,
  prerequisites UUID[],
  order_index INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  quest_id UUID REFERENCES quests(id),
  status TEXT CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  submission_type TEXT,
  submission_data JSONB,
  ai_feedback JSONB,
  xp_earned INTEGER,
  UNIQUE(user_id, quest_id)
);

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  requirements JSONB
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES profiles(id),
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- Daily Activity
CREATE TABLE daily_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  activity_date DATE NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  quests_completed INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  UNIQUE(user_id, activity_date)
);

-- AI Chat
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  quest_id UUID REFERENCES quests(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id),
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leaderboard (materialized view)
CREATE MATERIALIZED VIEW weekly_leaderboard AS
SELECT
  p.id,
  p.username,
  p.avatar_url,
  p.level,
  COALESCE(SUM(da.xp_earned), 0) as weekly_xp
FROM profiles p
LEFT JOIN daily_activity da ON p.id = da.user_id
  AND da.activity_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY p.id
ORDER BY weekly_xp DESC
LIMIT 100;
```

---

## API Routes

```
/api
├── /auth
│   ├── /callback          # OAuth callback
│   └── /session           # Get current session
│
├── /user
│   ├── GET /profile       # Get user profile
│   ├── PATCH /profile     # Update profile
│   ├── GET /progress      # Get all progress
│   └── GET /badges        # Get user badges
│
├── /tracks
│   ├── GET /              # List all tracks
│   ├── GET /[slug]        # Get track with subtracks
│   └── GET /[slug]/quests # Get quests for track
│
├── /quests
│   ├── GET /[id]          # Get quest content
│   ├── POST /[id]/start   # Start quest
│   └── POST /[id]/submit  # Submit quest solution
│
├── /ai
│   ├── POST /chat         # AI Coach chat
│   ├── POST /evaluate     # Evaluate submission
│   └── POST /hint         # Get hint for quest
│
├── /gamification
│   ├── GET /leaderboard   # Get leaderboard
│   ├── POST /streak       # Update streak
│   └── GET /daily-quests  # Get daily challenges
│
└── /onboarding
    ├── POST /assessment   # Submit skill assessment
    └── POST /preferences  # Save learning preferences
```

---

## Component Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── onboarding/
│   │       ├── assessment/
│   │       ├── preferences/
│   │       └── quest-map/
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard home
│   │   ├── quest-map/
│   │   ├── tracks/[slug]/[questId]/
│   │   ├── profile/
│   │   ├── leaderboard/
│   │   └── settings/
│   │
│   ├── api/
│   └── layout.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui
│   ├── quest/
│   ├── gamification/
│   ├── ai/
│   └── layout/
│
├── lib/
│   ├── supabase/
│   ├── ai/
│   └── utils/
│
├── hooks/
├── stores/
└── types/
```

---

## AI Integration

### Model Selection

```typescript
export const MODEL_SELECTION = {
  // High quality - Claude
  evaluation: 'anthropic/claude-3.5-sonnet',
  coach_complex: 'anthropic/claude-3.5-sonnet',
  content_generation: 'anthropic/claude-3.5-sonnet',

  // Cost-effective - GPT-4o-mini
  coach_simple: 'openai/gpt-4o-mini',
  feedback_summary: 'openai/gpt-4o-mini',
  hints: 'openai/gpt-4o-mini',
  classification: 'openai/gpt-4o-mini',
  simple_chat: 'openai/gpt-4o-mini'
};
```

### Cost Estimates (per 1M tokens)
- Claude 3.5 Sonnet: $3 input / $15 output
- GPT-4o-mini: $0.15 input / $0.60 output

---

## Gamification System

### XP & Levels

```typescript
const XP_PER_LEVEL = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  // exponential growth...
];

const XP_REWARDS = {
  quest_complete: '50-500 based on difficulty',
  daily_quest: 25,
  streak_bonus: '10 × streak_days',
  first_of_day: 20,
  perfect_score: 50, // 90+ score bonus
};
```

### Streak Rules
- Maintain: Complete at least 1 quest per day
- Freeze: 1 per week (free), unlimited (premium)
- Milestones: 7, 30, 100, 365 days

### Badge Categories
- **Milestone**: First Quest, 10 Quests, 100 Quests
- **Streak**: 7-Day, 30-Day, 100-Day
- **Skill**: Prompt Master, Automation Guru, Vibe Coder
- **Special**: Beta Tester, Bug Hunter, Community Helper

---

## Related Documents
- [PROJECT-STATUS.md](./PROJECT-STATUS.md) - Current development status
- [CHANGELOG.md](./CHANGELOG.md) - Version history
