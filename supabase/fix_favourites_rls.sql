-- ============================================================
-- SS Rental – Fix Favourites RLS Policies
-- Run this in your Supabase SQL Editor to enable favourites visibility
-- ============================================================

-- 1. Enable Row Level Security
ALTER TABLE favourites ENABLE ROW LEVEL SECURITY;

-- 2. Policy: Users can view their own favourites
-- This allows getMyFavourites() to return rows for the logged-in user
CREATE POLICY "Users can view own favourites"
  ON favourites FOR SELECT
  USING (auth.uid() = user_id);

-- 3. Policy: Users can insert their own favourites
-- This allows toggleFavourite() to add new items
CREATE POLICY "Users can insert own favourites"
  ON favourites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Policy: Users can delete their own favourites
-- This allows toggleFavourite() to remove items
CREATE POLICY "Users can delete own favourites"
  ON favourites FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Policy: Admins can view all favourites (Optional, for analytics)
CREATE POLICY "Admins can view all favourites"
  ON favourites FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
