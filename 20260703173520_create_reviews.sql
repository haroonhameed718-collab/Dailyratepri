/*
# Create user_reviews table

1. New Tables
- `user_reviews`
  - `id` (uuid, primary key)
  - `name` (text, not null) — reviewer display name
  - `rating` (integer, 1-5, not null) — star rating
  - `comment` (text, not null) — short review text
  - `approved` (boolean, default true) — admin can hide spam
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `user_reviews`.
- Allow anon + authenticated to SELECT approved reviews (publicly visible).
- Allow anon + authenticated to INSERT new reviews (public submission, no login required).
- No UPDATE or DELETE policies — reviews are immutable once submitted; admin manages via Supabase dashboard.

3. Notes
- This is a single-tenant no-auth app, so policies use `TO anon, authenticated`.
- `approved` defaults to true so reviews appear immediately; admin can set to false to hide spam.
*/

CREATE TABLE IF NOT EXISTS user_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reviews" ON user_reviews;
CREATE POLICY "anon_select_reviews" ON user_reviews FOR SELECT
  TO anon, authenticated USING (approved = true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON user_reviews;
CREATE POLICY "anon_insert_reviews" ON user_reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);
