# AI Mastery Academy

> Gamified learning platform for AI skills

## Project Overview

AI Mastery Academy is an EdTech platform teaching AI skills through gamification. Think Duolingo for AI learning - with quests, XP, levels, streaks, and an AI Coach.

**Current Phase:** Pre-Development (Planning Complete)
**Solo Developer Project**

---

## Quick Links

| Document | Purpose |
|----------|---------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical architecture, DB schema, API routes |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Development phases and milestones |
| [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md) | Current progress and blockers |
| [docs/WORKFLOW.md](docs/WORKFLOW.md) | How to use agents and tools |
| [docs/UI-GUIDELINES.md](docs/UI-GUIDELINES.md) | Design system and components |
| [docs/AI-PROMPTS.md](docs/AI-PROMPTS.md) | System prompts for AI features |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Version history |

---

## Tech Stack

```
Frontend:    Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
Backend:     Supabase (PostgreSQL, Auth, Storage, Edge Functions)
AI:          OpenRouter (Claude 3.5 Sonnet + GPT-4o-mini)
Hosting:     Vercel
Monitoring:  Sentry + PostHog
```

---

## Project Structure

```
ai-mastery-academy/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   ├── components/     # React components
│       │   ├── lib/            # Utilities, clients
│       │   ├── hooks/          # Custom hooks
│       │   ├── stores/         # Zustand stores
│       │   └── types/          # TypeScript types
│       └── public/
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── database/               # Supabase types, queries
│   └── ai/                     # AI utilities, prompts
├── supabase/
│   ├── migrations/             # Database migrations
│   └── functions/              # Edge Functions
├── docs/                       # Documentation
└── CLAUDE.md                   # This file
```

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Database migrations
pnpm db:migrate

# Generate Supabase types
pnpm db:types
```

---

## Key Concepts

### Core Features
1. **Quests** - Individual lessons with theory, practice, and AI evaluation
2. **Tracks** - Learning paths (Content Creation, Automation, Development)
3. **AI Coach** - Chat assistant for help and guidance
4. **Gamification** - XP, levels, streaks, badges, leaderboards

### User Flow
```
Sign Up → Onboarding (Assessment) → Dashboard → Quest Map →
Complete Quests → Earn XP → Level Up → Unlock Content
```

### AI Integration
- **Evaluation**: Claude 3.5 Sonnet evaluates user submissions
- **Coaching**: GPT-4o-mini for chat assistance and hints
- **Content**: AI-generated quest content and examples

---

## Coding Standards

### TypeScript
- Strict mode enabled
- Explicit return types for functions
- Zod for runtime validation
- No `any` type

### React
- Functional components only
- Server Components by default, 'use client' when needed
- Custom hooks for logic reuse
- Zustand for global state

### Styling
- Tailwind CSS utilities
- shadcn/ui components
- CSS variables for theming
- Mobile-first responsive

### API
- RESTful conventions
- Proper error handling with typed errors
- Rate limiting on AI endpoints
- RLS for data isolation

---

## Agent Usage

### For UI Work
```bash
/agent-frontend <task description>
```

### For API/Database Work
```bash
/agent-backend <task description>
```

### For Full Features
```bash
/agent-fullstack <task description>
```

### Quick Scaffolding
```bash
/quick-component <type>
/quick-page <type>
```

See [docs/WORKFLOW.md](docs/WORKFLOW.md) for detailed usage.

---

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENROUTER_API_KEY`
- `SENTRY_DSN`
- `POSTHOG_KEY`

---

## Current Focus

**Phase 0: Project Setup**
- [ ] Initialize repository
- [ ] Set up Next.js
- [ ] Configure Supabase
- [ ] Connect external services

**Next Milestone: M1.1 Authentication**
- Google OAuth
- Email/Password auth
- Protected routes

---

## Important Notes

1. **Solo project** - Optimize for simplicity over scalability initially
2. **Supabase-first** - Use Supabase features before custom implementations
3. **AI costs** - Use GPT-4o-mini for most tasks, Claude for quality-critical
4. **English only** - MVP is English, i18n deferred
5. **No video** - Text + audio (TTS in Phase 2) + interactive

---

## When Starting New Session

1. Read `docs/PROJECT-STATUS.md` for current state
2. Check TODO list for pending tasks
3. Review recent changes in `docs/CHANGELOG.md`
4. Use appropriate agent for the task type
5. Update documentation after significant changes
