# AI Mastery Academy - Development Workflow

> How to use Claude Code tools effectively for this project

---

## Available Tools Overview

### Plugins (Active)

| Plugin | Use For | When to Use |
|--------|---------|-------------|
| **supabase** | Database, Auth, Storage | DB migrations, RLS policies, Edge Functions |
| **vercel** | Deployment | Deploy, logs, environment |
| **context7** | Documentation | Look up Next.js, Supabase, Tailwind docs |
| **typescript-lsp** | Type checking | Type errors, refactoring |
| **feature-dev** | Feature planning | New feature architecture |
| **pr-review-toolkit** | Code review | Before merging PRs |
| **commit-commands** | Git commits | Creating commits |
| **frontend-design** | UI creation | Building components |
| **code-review** | Quality check | After implementing features |
| **stripe** | Payments | Phase 3 (Premium) |
| **sentry** | Error tracking | Debugging production issues |
| **hookify** | Automation rules | Creating development hooks |

### Custom Commands (Most Useful for This Project)

| Command | Purpose | Example Usage |
|---------|---------|---------------|
| `/agent-frontend` | UI implementation | `/agent-frontend Create the Quest Card component` |
| `/agent-backend` | API/Database work | `/agent-backend Create user progress API` |
| `/agent-fullstack` | End-to-end features | `/agent-fullstack Implement streak system` |
| `/quick-component` | Fast component creation | `/quick-component card` |
| `/quick-page` | Page scaffolding | `/quick-page dashboard` |
| `/generate-tests` | Test generation | `/generate-tests unit` |
| `/code-review` | Code quality check | `/code-review staged` |
| `/refactor` | Code improvement | `/refactor simplify` |
| `/security-scan` | Security audit | `/security-scan auth` |

### Skills (Auto-Applied)

| Skill | Triggers When | What It Does |
|-------|---------------|--------------|
| **react-patterns** | Working with .tsx files | Applies React best practices |
| **typescript-strict** | Writing TypeScript | Enforces strict typing |
| **database-patterns** | Working with Supabase | DB design patterns |
| **api-security** | Creating APIs | Security best practices |
| **testing-patterns** | Writing tests | Test structure patterns |
| **saas-development** | SaaS features | Subscription, multi-tenant patterns |

---

## Recommended Workflow

### Daily Development Flow

```
1. Start session
   → Review PROJECT-STATUS.md
   → Check current phase/milestone

2. Pick a task
   → Use TodoWrite for tracking

3. Research (if needed)
   → Use context7 for documentation
   → Use Explore agent for codebase questions

4. Implement
   → Use appropriate agent (/agent-frontend, /agent-backend)
   → Skills auto-apply based on file type

5. Review
   → /code-review staged
   → Fix any issues

6. Commit
   → /commit (uses commit-commands plugin)

7. Update docs
   → Update PROJECT-STATUS.md
   → Add to CHANGELOG.md if significant
```

---

## Agent Usage Patterns

### For UI Work → `/agent-frontend`

```bash
# Creating new components
/agent-frontend Create the QuestCard component with XP display,
difficulty badge, and progress indicator

# Styling pages
/agent-frontend Style the dashboard layout with sidebar and header

# Animations
/agent-frontend Add level-up celebration animation with confetti
```

### For API/DB Work → `/agent-backend`

```bash
# Database
/agent-backend Create Supabase migration for user_progress table

# API routes
/agent-backend Create API route for quest submission with AI evaluation

# Auth
/agent-backend Implement RLS policies for user data isolation
```

### For Full Features → `/agent-fullstack`

```bash
# End-to-end features
/agent-fullstack Implement the complete streak system with
daily tracking and streak freeze

# Complex flows
/agent-fullstack Build the onboarding wizard with assessment
and preference saving
```

### For Quick Tasks → `/quick-*`

```bash
# Fast component
/quick-component modal  # Creates modal component

# Fast page
/quick-page form  # Creates form page

# Fast CRUD
/quick-crud Quest title:string,difficulty:string,xp:number
```

---

## Feature Development Process

### Example: Implementing "Quest Completion"

```
Step 1: Plan
   → Use /feature-dev plugin or Plan agent
   → Create TODO list

Step 2: Database (if needed)
   /agent-backend Create user_progress table with status tracking

Step 3: API
   /agent-backend Create POST /api/quests/[id]/complete endpoint

Step 4: UI Components
   /agent-frontend Create SubmissionForm component
   /agent-frontend Create AIFeedback display component

Step 5: Page Integration
   /agent-frontend Integrate submission into quest page

Step 6: Testing
   /generate-tests unit
   /generate-tests e2e

Step 7: Review
   /code-review staged
   /security-scan api

Step 8: Commit
   /commit
```

---

## Parallel Agent Usage

For complex features, run agents in parallel:

```typescript
// Example: Building Authentication System

// Agent 1: Backend
/agent-backend Create auth middleware and session management

// Agent 2: Frontend (in parallel)
/agent-frontend Create login and register forms

// Agent 3: Testing (after both complete)
/generate-tests e2e
```

---

## Documentation Lookup

Use **context7** plugin for up-to-date docs:

```bash
# Next.js App Router
"Look up Next.js App Router server components"

# Supabase
"Find Supabase RLS documentation"

# Tailwind
"Search Tailwind animation utilities"

# Framer Motion
"Get Framer Motion gesture examples"
```

---

## Common Workflows

### Starting a New Milestone

```bash
1. Update PROJECT-STATUS.md
2. Create detailed TODO list
3. Set up any new database tables
4. Create API routes skeleton
5. Build UI components
6. Connect everything
7. Test
8. Review and commit
```

### Bug Fixing

```bash
1. Reproduce the bug
2. Use Explore agent to find root cause
3. Fix with appropriate agent
4. Add test to prevent regression
5. /code-review staged
6. /commit
```

### Code Review Before PR

```bash
1. /code-review staged          # Quality check
2. /security-scan all           # Security audit
3. /generate-tests unit         # Add missing tests
4. Update CHANGELOG.md
5. Create PR
```

---

## Tool Selection Guide

| Task Type | Primary Tool | Secondary |
|-----------|--------------|-----------|
| New React component | `/agent-frontend` | `/quick-component` |
| New API route | `/agent-backend` | - |
| Database migration | `/agent-backend` | supabase plugin |
| Full feature | `/agent-fullstack` | feature-dev plugin |
| UI styling | `/agent-frontend` | frontend-design plugin |
| Testing | `/generate-tests` | - |
| Code quality | `/code-review` | pr-review-toolkit |
| Security | `/security-scan` | - |
| Deployment | vercel plugin | `/deploy` |
| Documentation lookup | context7 plugin | WebSearch |

---

## Performance Tips

1. **Use agents for complex tasks** - Don't micromanage, let agents work autonomously
2. **Parallel agents for independent work** - Frontend and backend can run simultaneously
3. **Use /quick-* for simple scaffolding** - Faster than full agents
4. **Skills auto-apply** - No need to invoke them manually
5. **Context7 for docs** - Faster than web search for known libraries

---

## Project-Specific Conventions

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- API routes: `route.ts`
- Types: `types.ts` or `*.types.ts`

### Commit Messages
- Use conventional commits (feat:, fix:, etc.)
- Reference milestone: `feat(M1.3): add quest submission`

### Branch Strategy
- `main` - production
- `develop` - integration
- `feature/M1.3-quest-system` - feature branches by milestone
