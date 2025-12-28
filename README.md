# AI Mastery Academy

> Gamified learning platform for AI skills - Think Duolingo for AI learning

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![License](https://img.shields.io/badge/License-Private-red)

## Overview

AI Mastery Academy is an EdTech platform that teaches AI skills through gamification. Users complete quests, earn XP, level up, maintain streaks, and get help from an AI Coach.

### Key Features

- **Quest System** - Structured lessons with theory, practice, and AI evaluation
- **Learning Tracks** - Content Creation, Automation, Development paths
- **Gamification** - XP, levels, streaks, badges, leaderboards
- **AI Coach** - Context-aware chat assistant for help and guidance
- **Public Profiles** - Share your achievements with others

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router) + TypeScript + Tailwind CSS |
| UI Components | shadcn/ui |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| AI | OpenRouter (GPT-4o-mini for chat, evaluation) |
| Hosting | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- OpenRouter API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-mastery-academy

# Install dependencies
cd app
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
pnpm dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENROUTER_API_KEY=your_openrouter_key
```

## Project Structure

```
ai-mastery-academy/
├── app/                    # Next.js application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities, clients
│   │   ├── hooks/         # Custom hooks
│   │   └── stores/        # Zustand stores
│   └── supabase/
│       └── migrations/    # Database migrations
├── docs/                  # Documentation
└── CLAUDE.md             # AI assistant instructions
```

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical architecture and DB schema |
| [PROJECT-STATUS.md](docs/PROJECT-STATUS.md) | Current development status |
| [CHANGELOG.md](docs/CHANGELOG.md) | Version history |
| [UI-GUIDELINES.md](docs/UI-GUIDELINES.md) | Design system and components |

## Current Status

**Phase 2: Gamification & Polish** - In Progress

- [x] Authentication (Email + Google OAuth)
- [x] Onboarding flow
- [x] Quest system with AI evaluation
- [x] Gamification (XP, levels, streaks, badges)
- [x] AI Coach with context awareness
- [x] Public profiles
- [x] Performance optimization
- [x] Content Creation Track (25 quests)
- [ ] TTS for audio learners
- [ ] Stripe integration (Phase 3)

## Learning Tracks

### Foundation (10 quests)
Core prompt engineering skills for everyone.

### Content Creation (25 quests) - NEW
- **Text Generation** (8 quests) - Blog writing, social media, email marketing
- **Image Generation** (8 quests) - AI art, brand visuals, product photography
- **Presentations & Design** (9 quests) - Pitch decks, reports, infographics

### Coming Soon
- Automation Track
- Development Track

## Contributing

This is a solo developer project. For questions or feedback, please open an issue.

## License

Private - All rights reserved.
