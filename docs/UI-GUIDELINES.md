# AI Mastery Academy - UI Guidelines

> Design system and UI patterns for consistent development

---

## Design Principles

1. **Gamified but Professional** - Fun without being childish
2. **Dark Mode First** - Primary theme is dark (easier on eyes for learning)
3. **Responsive** - Mobile-first approach
4. **Accessible** - WCAG 2.1 AA compliance
5. **Performance** - Minimal bundle, fast interactions

---

## Color Palette

### Brand Colors
```css
--primary: #6366f1;       /* Indigo - main actions */
--primary-hover: #4f46e5;
--secondary: #8b5cf6;     /* Purple - accent */

--success: #10b981;       /* Green - completed, correct */
--warning: #f59e0b;       /* Amber - streak, caution */
--error: #ef4444;         /* Red - errors */
--info: #3b82f6;          /* Blue - information */
```

### Dark Theme (Primary)
```css
--background: #0f0f0f;
--surface: #1a1a1a;
--surface-elevated: #262626;
--border: #333333;

--text-primary: #ffffff;
--text-secondary: #a3a3a3;
--text-muted: #737373;
```

### Light Theme (Optional)
```css
--background: #ffffff;
--surface: #f5f5f5;
--surface-elevated: #ffffff;
--border: #e5e5e5;

--text-primary: #0f0f0f;
--text-secondary: #525252;
--text-muted: #a3a3a3;
```

---

## Typography

### Font Stack
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Scale
```css
--text-xs: 0.75rem;    /* 12px - labels */
--text-sm: 0.875rem;   /* 14px - body small */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.125rem;   /* 18px - body large */
--text-xl: 1.25rem;    /* 20px - heading small */
--text-2xl: 1.5rem;    /* 24px - heading */
--text-3xl: 1.875rem;  /* 30px - heading large */
--text-4xl: 2.25rem;   /* 36px - display */
```

---

## Components

### Buttons
```tsx
// Primary - main actions
<Button variant="default">Start Quest</Button>

// Secondary - alternative actions
<Button variant="secondary">View Details</Button>

// Ghost - subtle actions
<Button variant="ghost">Cancel</Button>

// Destructive - dangerous actions
<Button variant="destructive">Delete</Button>
```

### Cards
```tsx
// Quest Card
<Card className="hover:border-primary/50 transition-colors">
  <CardHeader>
    <Badge>Beginner</Badge>
    <CardTitle>Prompt Engineering 101</CardTitle>
  </CardHeader>
  <CardContent>
    <Progress value={60} />
  </CardContent>
</Card>
```

### Gamification Elements

#### XP Bar
```tsx
<div className="flex items-center gap-2">
  <span className="text-sm text-muted-foreground">Level 5</span>
  <Progress value={75} className="flex-1 h-2" />
  <span className="text-sm font-medium">750/1000 XP</span>
</div>
```

#### Streak Counter
```tsx
<div className="flex items-center gap-1">
  <Flame className="w-5 h-5 text-warning" />
  <span className="font-bold">7</span>
  <span className="text-muted-foreground">day streak</span>
</div>
```

#### Badges
```tsx
<div className="flex gap-2">
  <Badge variant="outline" className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
    <Trophy className="w-3 h-3 mr-1" />
    First Quest
  </Badge>
</div>
```

---

## Layout Patterns

### Dashboard Layout
```
┌─────────────────────────────────────────────────────┐
│  Header (Logo, XP Bar, User Menu)                   │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Sidebar  │           Main Content                   │
│  - Home  │                                          │
│  - Map   │                                          │
│  - Track │                                          │
│  - ...   │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

### Quest Page Layout
```
┌─────────────────────────────────────────────────────┐
│  Breadcrumb: Track > Subtrack > Quest               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Quest Content                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │ Theory Block                                │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │ Practice Block                              │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  AI Coach (floating button → slide-out panel)       │
└─────────────────────────────────────────────────────┘
```

---

## Animation Guidelines

### Micro-interactions
```tsx
// Hover transitions
className="transition-all duration-200"

// XP gain animation
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="text-2xl font-bold text-primary"
>
  +{xp} XP
</motion.div>

// Level up celebration
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: [0, 1.2, 1] }}
  transition={{ duration: 0.5 }}
>
  Level Up! 🎉
</motion.div>
```

### Loading States
```tsx
// Skeleton for cards
<Skeleton className="h-32 w-full rounded-lg" />

// Spinner for actions
<Loader2 className="w-4 h-4 animate-spin" />
```

---

## Responsive Breakpoints

```css
/* Mobile first */
--sm: 640px;   /* Tablet */
--md: 768px;   /* Small laptop */
--lg: 1024px;  /* Desktop */
--xl: 1280px;  /* Large desktop */
```

### Mobile Adaptations
- Sidebar becomes bottom navigation
- Cards stack vertically
- AI Coach becomes full-screen modal
- Reduce padding and margins

---

## Icons

Using **Lucide React** for consistency:

```tsx
import {
  // Navigation
  Home, Map, User, Settings,

  // Gamification
  Trophy, Flame, Star, Zap,

  // Actions
  Play, Check, X, Plus,

  // AI
  Bot, MessageSquare, Sparkles,

  // Content
  Book, Code, Image, Video
} from 'lucide-react';
```

---

## Accessibility

- All interactive elements have focus states
- Color contrast ratio ≥ 4.5:1
- Skip links for keyboard navigation
- Screen reader labels for icons
- Reduced motion preference respected

```tsx
// Respect reduced motion
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
/>
```
