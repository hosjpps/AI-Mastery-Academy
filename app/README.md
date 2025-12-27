# AI Mastery Academy

> Gamified learning platform for mastering AI skills. Think Duolingo for AI.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

## Overview

AI Mastery Academy is an EdTech platform that teaches practical AI skills through gamification. Users progress through quests, earn XP, level up, and get personalized guidance from an AI Coach.

### Key Features

- **Quest-Based Learning** - Structured lessons with theory, practice, and AI evaluation
- **Gamification** - XP, levels, streaks, badges, and leaderboards
- **AI Coach** - Personal assistant for hints, guidance, and support
- **AI Evaluation** - Real-time feedback on quest submissions via GPT-4o-mini
- **Progress Tracking** - Visual quest map, stats dashboard, and achievements

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (Email + Google OAuth) |
| AI | OpenRouter (GPT-4o-mini) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| State | Zustand |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase project
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-mastery-academy.git
cd ai-mastery-academy/app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENROUTER_API_KEY=your_openrouter_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth pages (login, register)
│   │   ├── (dashboard)/        # Protected pages
│   │   ├── api/                # API routes
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── dashboard/          # Dashboard components
│   │   └── onboarding/         # Onboarding components
│   ├── lib/                    # Utilities
│   │   ├── supabase/           # Supabase clients
│   │   └── utils.ts            # Helper functions
│   ├── stores/                 # Zustand stores
│   └── types/                  # TypeScript types
├── public/                     # Static assets
└── supabase/                   # Database migrations
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | User login |
| `/register` | User registration |
| `/onboarding` | New user onboarding |
| `/dashboard` | Main dashboard |
| `/quest-map` | Quest visualization |
| `/quest/[slug]` | Quest detail page |
| `/profile` | User profile |
| `/settings` | User settings |
| `/leaderboard` | Rankings |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | AI Coach chat |
| `/api/evaluate` | POST | Quest submission evaluation |

## Database Schema

Key tables:
- `profiles` - User profiles with XP, level, streak
- `tracks` - Learning tracks (Content Creation, etc.)
- `subtracks` - Track subdivisions (Foundation, etc.)
- `quests` - Individual lessons
- `user_progress` - Quest completion tracking
- `chat_history` - AI Coach conversations
- `badges` - Achievement badges
- `user_badges` - Earned badges

## Development

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

### Generate Supabase Types
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Auto-deploys on every push to main branch.

## Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](../docs/ARCHITECTURE.md) | Technical architecture |
| [PROJECT-STATUS.md](../docs/PROJECT-STATUS.md) | Development progress |
| [CHANGELOG.md](../docs/CHANGELOG.md) | Version history |
| [AI-PROMPTS.md](../docs/AI-PROMPTS.md) | AI system prompts |

## Current Status

**Phase 1 MVP: Complete (100%)**

- Authentication (Email + Google OAuth)
- Onboarding flow
- Quest system with AI evaluation
- AI Coach with chat history
- Gamification (XP, Levels, Streaks)
- Dashboard, Profile, Settings, Leaderboard

See [PROJECT-STATUS.md](../docs/PROJECT-STATUS.md) for detailed progress.

## License

MIT

## Author

@hosjpps
