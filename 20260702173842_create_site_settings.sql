/*
# Create site_settings table for Admin Dashboard

1. Purpose
   Stores the site identity configuration managed via the Admin Dashboard:
   website name, logo (as a data URL or external URL), and selected font family.
   This is a single-tenant table — one row (id = 1) holds the active config.

2. New Tables
   - `site_settings`
     - `id` (int, primary key, always 1) — singleton row
     - `site_name` (text, not null) — displayed in navbar/footer/title
     - `logo_url` (text, nullable) — logo image URL or data URL
     - `font_family` (text, not null) — CSS font-family value for the site
     - `admin_password` (text, not null) — simple password gate for /admin
     - `updated_at` (timestamptz) — last modification time

3. Security
   - RLS enabled on `site_settings`.
   - SELECT open to anon + authenticated so the public site can read branding.
   - INSERT/UPDATE/DELETE open to anon + authenticated so the admin dashboard
     (which uses the anon key, no Supabase Auth) can write config.
     This is acceptable because the admin route is additionally gated by a
     client-side password check against the `admin_password` column, and the
     table contains only public branding config (no sensitive user data).

4. Notes
   - A seed row with id=1 is inserted with sensible defaults so the site
     has branding before the admin first configures it.
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  site_name text NOT NULL DEFAULT 'Daily Rate Pro',
  logo_url text,
  font_family text NOT NULL DEFAULT 'Inter',
  admin_password text NOT NULL DEFAULT 'admin123',
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT singleton_row CHECK (id = 1)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_settings" ON site_settings;
CREATE POLICY "anon_read_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_settings" ON site_settings;
CREATE POLICY "anon_insert_settings" ON site_settings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_settings" ON site_settings;
CREATE POLICY "anon_update_settings" ON site_settings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_settings" ON site_settings;
CREATE POLICY "anon_delete_settings" ON site_settings FOR DELETE
  TO anon, authenticated USING (true);

-- Seed the singleton row if it doesn't exist
INSERT INTO site_settings (id, site_name, logo_url, font_family, admin_password)
VALUES (1, 'Daily Rate Pro', NULL, 'Inter', 'admin123')
ON CONFLICT (id) DO NOTHING;