import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseConfig) {
  console.warn('Supabase environment variables are not set. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export interface SiteSettings {
  id: number;
  site_name: string;
  logo_url: string | null;
  font_family: string;
  admin_password: string;
  updated_at: string;
}

export interface UserReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
}
