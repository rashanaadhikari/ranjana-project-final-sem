-- ============================================================
-- SS Rental – Messages Table Schema
-- ============================================================

CREATE TABLE IF NOT EXISTS messages (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id) ON DELETE SET NULL, -- Connects with users fk id
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone_number   TEXT,
  subject        TEXT NOT NULL,
  message        TEXT NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Admins can view all messages
CREATE POLICY "Admins can view all messages"
  ON messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

-- Admins can delete messages
CREATE POLICY "Admins can delete messages"
  ON messages FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

-- Anyone can insert messages (public contact form)
CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);
