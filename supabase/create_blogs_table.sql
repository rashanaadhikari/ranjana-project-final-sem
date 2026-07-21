-- ============================================================
-- SS Rental – Blogs Table
-- Run this in Supabase SQL Editor if the blogs table is missing
-- ============================================================

CREATE TABLE IF NOT EXISTS blogs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT,
  content         TEXT,
  blog_image      TEXT,
  is_published    BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Index for author_id
CREATE INDEX IF NOT EXISTS idx_blogs_author_id ON blogs(author_id);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public can view published blogs
CREATE POLICY "Public can view published blogs"
  ON blogs FOR SELECT
  USING (is_published = TRUE);

-- Authors can manage their own blogs
CREATE POLICY "Authors can manage own blogs"
  ON blogs FOR ALL
  USING (auth.uid() = author_id);

-- Trigger for updated_at
CREATE TRIGGER trg_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
