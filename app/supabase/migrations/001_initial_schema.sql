-- =============================================
-- AI Mastery Academy - Initial Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES (extends auth.users)
-- =============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,

  -- Onboarding
  learning_style TEXT CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic')),
  career_track TEXT CHECK (career_track IN ('freelancer', 'entrepreneur', 'career', 'hobbyist')),
  daily_goal_minutes INTEGER DEFAULT 15,
  onboarding_completed BOOLEAN DEFAULT false,

  -- Gamification
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- TRACKS (Content Creation, Automation, Development)
-- =============================================
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  is_locked BOOLEAN DEFAULT false,
  unlock_requirements JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SUBTRACKS
-- =============================================
CREATE TABLE subtracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  is_locked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(track_id, slug)
);

-- =============================================
-- QUESTS (Individual lessons)
-- =============================================
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtrack_id UUID REFERENCES subtracks(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,

  -- Quest metadata
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_minutes INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 100,
  quest_type TEXT NOT NULL CHECK (quest_type IN ('lesson', 'practice', 'boss', 'daily')),

  -- Content (JSON structure)
  content JSONB,

  -- Requirements
  prerequisites UUID[],
  order_index INTEGER DEFAULT 0,

  -- Status
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER quests_updated_at
  BEFORE UPDATE ON quests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- USER PROGRESS
-- =============================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,

  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Submission data
  submission_type TEXT,
  submission_data JSONB,

  -- AI Evaluation
  ai_feedback JSONB,
  xp_earned INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, quest_id)
);

CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- BADGES
-- =============================================
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT, -- 'milestone', 'skill', 'special', 'streak'
  requirements JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- =============================================
-- DAILY ACTIVITY (for streaks)
-- =============================================
CREATE TABLE daily_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  quests_completed INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

-- =============================================
-- AI CHAT SESSIONS
-- =============================================
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quest_id UUID REFERENCES quests(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, but only update their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tracks: public read
CREATE POLICY "Tracks are viewable by everyone"
  ON tracks FOR SELECT
  USING (true);

-- Subtracks: public read
CREATE POLICY "Subtracks are viewable by everyone"
  ON subtracks FOR SELECT
  USING (true);

-- Quests: public read for published
CREATE POLICY "Published quests are viewable by everyone"
  ON quests FOR SELECT
  USING (is_published = true);

-- User Progress: only own data
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Badges: public read
CREATE POLICY "Badges are viewable by everyone"
  ON badges FOR SELECT
  USING (true);

-- User Badges: own data viewable, public badges viewable
CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges"
  ON user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Daily Activity: only own data
CREATE POLICY "Users can view own activity"
  ON daily_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON daily_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activity"
  ON daily_activity FOR UPDATE
  USING (auth.uid() = user_id);

-- Chat Sessions: only own data
CREATE POLICY "Users can view own chat sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Chat Messages: access through session ownership
CREATE POLICY "Users can view messages in own sessions"
  ON chat_messages FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM chat_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages in own sessions"
  ON chat_messages FOR INSERT
  WITH CHECK (
    session_id IN (
      SELECT id FROM chat_sessions WHERE user_id = auth.uid()
    )
  );

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_quests_subtrack ON quests(subtrack_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_quest ON user_progress(quest_id);
CREATE INDEX idx_daily_activity_user_date ON daily_activity(user_id, activity_date);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);

-- =============================================
-- SEED DATA: Foundation Track
-- =============================================
INSERT INTO tracks (slug, title, description, icon, order_index) VALUES
('foundation', 'AI Foundation', 'Master the basics of AI and prompt engineering', '🎯', 0),
('content-creation', 'AI Content Creation', 'Create amazing content with AI tools', '✍️', 1),
('automation', 'AI Automation', 'Automate workflows and processes', '⚡', 2),
('development', 'AI Development', 'Build applications with AI', '💻', 3);

INSERT INTO subtracks (track_id, slug, title, description, order_index) VALUES
((SELECT id FROM tracks WHERE slug = 'foundation'), 'basics', 'AI Basics', 'Understanding AI fundamentals', 0),
((SELECT id FROM tracks WHERE slug = 'foundation'), 'prompts', 'Prompt Engineering', 'Master the art of prompts', 1);

-- Foundation quests
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
(
  (SELECT id FROM subtracks WHERE slug = 'basics'),
  'what-is-ai',
  'What is AI?',
  'Discover what artificial intelligence really is and how it works',
  'beginner',
  10,
  50,
  'lesson',
  0,
  true,
  '{
    "theory": {
      "content": "Artificial Intelligence (AI) is technology that enables computers to simulate human intelligence...",
      "key_concepts": ["Machine Learning", "Neural Networks", "Large Language Models"]
    },
    "practice": {
      "type": "quiz",
      "questions": [
        {"q": "What does LLM stand for?", "options": ["Large Language Model", "Little Learning Machine"], "correct": 0}
      ]
    }
  }'::jsonb
),
(
  (SELECT id FROM subtracks WHERE slug = 'basics'),
  'first-prompt',
  'Your First Prompt',
  'Write your first AI prompt and see the magic happen',
  'beginner',
  15,
  100,
  'practice',
  1,
  true,
  '{
    "theory": {
      "content": "A prompt is an instruction you give to an AI model..."
    },
    "practice": {
      "type": "text_submission",
      "task": "Write a prompt that asks AI to explain something complex in simple terms",
      "criteria": ["Clear instruction", "Specific topic", "Target audience defined"]
    }
  }'::jsonb
);

-- Seed badges
INSERT INTO badges (slug, title, description, icon, category, requirements) VALUES
('first-quest', 'First Steps', 'Complete your first quest', '🎯', 'milestone', '{"type": "quests_completed", "value": 1}'::jsonb),
('streak-7', 'Week Warrior', 'Maintain a 7-day streak', '🔥', 'streak', '{"type": "streak", "value": 7}'::jsonb),
('streak-30', 'Monthly Master', 'Maintain a 30-day streak', '🏆', 'streak', '{"type": "streak", "value": 30}'::jsonb),
('prompt-master', 'Prompt Master', 'Complete all prompt engineering quests', '✨', 'skill', '{"type": "subtrack_completed", "subtrack": "prompts"}'::jsonb);
