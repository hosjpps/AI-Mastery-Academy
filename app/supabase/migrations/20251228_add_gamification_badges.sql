-- =============================================
-- Add More Gamification Badges
-- =============================================

-- Additional streak badges
INSERT INTO badges (slug, title, description, icon, category, requirements) VALUES
('streak-3', 'Getting Started', 'Maintain a 3-day streak', '🔥', 'streak', '{"type": "streak", "value": 3}'::jsonb),
('streak-14', 'Two Week Warrior', 'Maintain a 14-day streak', '💪', 'streak', '{"type": "streak", "value": 14}'::jsonb),
('streak-100', 'Century Streak', 'Maintain a 100-day streak', '🏅', 'streak', '{"type": "streak", "value": 100}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Level badges
INSERT INTO badges (slug, title, description, icon, category, requirements) VALUES
('level-5', 'Rising Star', 'Reach Level 5', '⭐', 'milestone', '{"type": "level", "value": 5}'::jsonb),
('level-10', 'AI Expert', 'Reach Level 10', '🌟', 'milestone', '{"type": "level", "value": 10}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Quest completion badges
INSERT INTO badges (slug, title, description, icon, category, requirements) VALUES
('quests-5', 'Quest Beginner', 'Complete 5 quests', '📚', 'milestone', '{"type": "quests_completed", "value": 5}'::jsonb),
('quests-10', 'Quest Explorer', 'Complete 10 quests', '🗺️', 'milestone', '{"type": "quests_completed", "value": 10}'::jsonb),
('quests-25', 'Quest Master', 'Complete 25 quests', '👑', 'milestone', '{"type": "quests_completed", "value": 25}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- XP badges
INSERT INTO badges (slug, title, description, icon, category, requirements) VALUES
('xp-500', 'XP Hunter', 'Earn 500 XP', '💎', 'milestone', '{"type": "xp", "value": 500}'::jsonb),
('xp-1000', 'XP Collector', 'Earn 1,000 XP', '💰', 'milestone', '{"type": "xp", "value": 1000}'::jsonb),
('xp-5000', 'XP Legend', 'Earn 5,000 XP', '🏆', 'milestone', '{"type": "xp", "value": 5000}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Special badges
INSERT INTO badges (slug, title, description, icon, category, requirements) VALUES
('early-adopter', 'Early Adopter', 'Joined during beta', '🚀', 'special', '{"type": "special", "value": "beta"}'::jsonb),
('perfect-score', 'Perfectionist', 'Get a 100/100 on any quest', '💯', 'special', '{"type": "special", "value": "perfect_score"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;
