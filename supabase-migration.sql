-- ═══════════════════════════════════════════════
-- GYM BRO — Supabase Migration
-- Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════════

-- 1. PROFILES (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar TEXT NOT NULL DEFAULT '💪',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. WORKOUT CHECKS
CREATE TABLE IF NOT EXISTS workout_checks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week INTEGER NOT NULL,
  day_id TEXT NOT NULL,
  ex_idx INTEGER NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week, day_id, ex_idx)
);
ALTER TABLE workout_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workout_checks_select_own" ON workout_checks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "workout_checks_insert_own" ON workout_checks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "workout_checks_update_own" ON workout_checks FOR UPDATE USING (auth.uid() = user_id);

-- 3. COMMENTS
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week INTEGER NOT NULL,
  day_id TEXT NOT NULL,
  body TEXT NOT NULL,
  ex_name TEXT DEFAULT '',
  avatar TEXT DEFAULT '💪',
  username TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comments_select_all" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_own" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_delete_own" ON comments FOR DELETE USING (auth.uid() = user_id);

-- 4. WARMUP CHECKS
CREATE TABLE IF NOT EXISTS warmup_checks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week INTEGER NOT NULL,
  day_id TEXT NOT NULL,
  item_idx INTEGER NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week, day_id, item_idx)
);
ALTER TABLE warmup_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "warmup_checks_select_own" ON warmup_checks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "warmup_checks_insert_own" ON warmup_checks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "warmup_checks_update_own" ON warmup_checks FOR UPDATE USING (auth.uid() = user_id);

-- 5. PROGRESSION
CREATE TABLE IF NOT EXISTS progression (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_id TEXT NOT NULL,
  ex_idx INTEGER NOT NULL,
  streak INTEGER DEFAULT 0,
  level INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, day_id, ex_idx)
);
ALTER TABLE progression ENABLE ROW LEVEL SECURITY;
CREATE POLICY "progression_select_own" ON progression FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progression_insert_own" ON progression FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progression_update_own" ON progression FOR UPDATE USING (auth.uid() = user_id);

-- 6. SKILLS (calisthenics progression)
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_key TEXT NOT NULL,
  step_idx INTEGER NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_key, step_idx)
);
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "skills_select_own" ON skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "skills_insert_own" ON skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "skills_update_own" ON skills FOR UPDATE USING (auth.uid() = user_id);

-- 7. NOTES (session notes)
CREATE TABLE IF NOT EXISTS notes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week INTEGER NOT NULL,
  day_id TEXT NOT NULL,
  note_a TEXT DEFAULT '',
  note_b TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week, day_id)
);
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notes_select_own" ON notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notes_insert_own" ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notes_update_own" ON notes FOR UPDATE USING (auth.uid() = user_id);
