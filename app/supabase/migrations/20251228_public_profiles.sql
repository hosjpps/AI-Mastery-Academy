-- =============================================
-- Public Profiles - Enable public access to user badges
-- =============================================

-- Allow anyone to view user badges for public profiles
DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;

CREATE POLICY "User badges are publicly viewable"
  ON user_badges FOR SELECT
  USING (true);

-- Allow anyone to view completed quest counts (for public profile stats)
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Add policy to count completed quests publicly (read-only, no sensitive data)
CREATE POLICY "Public can count completed quests"
  ON user_progress FOR SELECT
  USING (status = 'completed');
