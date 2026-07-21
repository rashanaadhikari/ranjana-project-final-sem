-- ============================================================
-- SS Rental – Supabase properties table schema
-- ============================================================

-- Room type enum
CREATE TYPE room_type_enum AS ENUM (
  'Single Room',
  '2/3 Room Flat',
  '1 BHK',
  '2 BHK',
  '3 BHK',
  'Office Space',
  'Business Shutter'
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id        UUID REFERENCES users(id) ON DELETE SET NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  room_type       room_type_enum NOT NULL,          -- human-readable: "2 BHK"
  room_type_slug  TEXT NOT NULL,          -- for filtering: "2bhk"
  price_per_month INTEGER NOT NULL,
  bedrooms        INTEGER DEFAULT 1,
  kitchens        INTEGER DEFAULT 1,
  floor_number    TEXT,
  is_living_room_available BOOLEAN DEFAULT TRUE,
  rent_design     TEXT,
  tags            TEXT,                   -- comma-separated or json, keeping TEXT for simplicity
  detailed_address TEXT,
  rating          NUMERIC(2,1) DEFAULT 0,
  review_count    INTEGER DEFAULT 0,
  image_urls      TEXT[] DEFAULT '{}',    -- Changed from image_url TEXT
  badge           TEXT,                   -- e.g. "Featured", "New"
  contact_phone   TEXT,
  contact_email   TEXT,
  location        TEXT NOT NULL,
  latitude        DECIMAL(10,8),
  longitude       DECIMAL(11,8),
  rejection_reason TEXT,
  blocked_reason   TEXT,
  is_active        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Index for common query patterns
CREATE INDEX IF NOT EXISTS idx_properties_active     ON properties(is_active);
CREATE INDEX IF NOT EXISTS idx_properties_room_type  ON properties(room_type_slug);
CREATE INDEX IF NOT EXISTS idx_properties_price      ON properties(price_per_month);
CREATE INDEX IF NOT EXISTS idx_properties_location   ON properties USING gin(to_tsvector('english', location));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Public can READ active properties
CREATE POLICY "Public can view active properties"
  ON properties FOR SELECT
  USING (is_active = TRUE);

-- Owners can manage their own listings (requires auth)
CREATE POLICY "Owners can insert own properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own properties"
  ON properties FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own properties"
  ON properties FOR DELETE
  USING (auth.uid() = owner_id);

-- ============================================================
-- Sample seed data (optional – remove in production)
-- ============================================================
-- INSERT INTO properties (title, location, room_type, room_type_slug, price_per_month, rating, review_count, image_urls, badge, is_active) VALUES
--   ('Modern Flat / Apartment',        'Itahari-19, Tarahara',    '2 BHK',          '2bhk',           2500,  4.8, 32, '{"https://picsum.photos/seed/flat1/400/300"}',   'Featured', true),
--   ('Cozy Single Room with Balcony',  'Dharan-4, Bhanu Chowk',   'Single Room',    'single-room',    3500,  4.5, 18, '{"https://picsum.photos/seed/room2/400/300"}',   NULL,       true),
--   ('Spacious 1BHK Flat',             'Biratnagar-5, Traffic Chowk', '1 BHK',      '1bhk',           5000,  4.7, 24, '{"https://picsum.photos/seed/bhk1/400/300"}',    NULL,       true),
--   ('Luxury 3BHK Family Apartment',   'Itahari-10, Sundar Nagar','3 BHK',          '3bhk',          12000,  4.9, 41, '{"https://picsum.photos/seed/luxury4/400/300"}', 'New',      true),
--   ('Office Space – Prime Location',  'Dharan-9, Main Road',     'Office Space',   'office-space',  15000,  4.6, 12, '{"https://picsum.photos/seed/office5/400/300"}', NULL,       true),
--   ('2 Rooms Flat – Well Furnished',  'Itahari-6, Shantinagar',  '2/3 Rooms Flat', 'rooms-flat',    7500,  4.4,  9, '{"https://picsum.photos/seed/flat6/400/300"}',   NULL,       true),
--   ('Budget Single Room',             'Dharan-7, Pancha Kanya',  'Single Room',    'single-room',    2000,  4.1,  5, '{"https://picsum.photos/seed/room7/400/300"}',   NULL,       true),
--   ('2BHK Semi-Furnished Flat',       'Itahari-3, Katahari Road','2 BHK',          '2bhk',           8500,  4.7, 27, '{"https://picsum.photos/seed/bhk8/400/300"}',    NULL,       true);

-- ============================================================
-- Users Table Setup
-- ============================================================
CREATE TYPE user_role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id      TEXT,
  role           user_role NOT NULL DEFAULT 'user',
  name           TEXT,
  email          TEXT,
  phone_number   TEXT,
  address        TEXT,
  is_blocked     BOOLEAN NOT NULL DEFAULT false,
  blocked_reason TEXT,
  avatar_url     TEXT,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own data
CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- Bookings Table
-- ============================================================
CREATE TYPE booking_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');

CREATE TABLE IF NOT EXISTS bookings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id    UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status         booking_status NOT NULL DEFAULT 'pending',
  message        TEXT,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create bookings
CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings (e.g., cancel)
CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Owners can view all bookings for their properties
CREATE POLICY "Owners can view all bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = (SELECT owner_id FROM properties WHERE properties.id = bookings.property_id));

-- Owners can update booking status (approve/reject)
CREATE POLICY "Owners can update booking status"
  ON bookings FOR UPDATE
  USING (auth.uid() = (SELECT owner_id FROM properties WHERE properties.id = bookings.property_id));

-- ============================================================
-- Reviews Table
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id    UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating         INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment        TEXT,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users can view all reviews
CREATE POLICY "Users can view all reviews"
  ON reviews FOR SELECT
  USING (true);

-- Users can create reviews
CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Favourite --
CREATE TABLE favourites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, property_id)  -- ek palta matra save garnxa
);


--Blog

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
