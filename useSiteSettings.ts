/**
 * useSiteSettings
 * ---------------
 * Fetches site branding config from Supabase on mount and applies the
 * selected font family to the document root. Returns the settings plus
 * loading/error state. Falls back to sensible defaults if the fetch
 * fails so the site always renders.
 */

import { useEffect, useState } from 'react';
import { supabase, type SiteSettings } from '../lib/supabase';

const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  site_name: 'Daily Rate Pro',
  logo_url: null,
  font_family: 'Inter',
  admin_password: 'admin123',
  updated_at: '',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (!cancelled && !error && data) {
        setSettings(data as SiteSettings);
      }
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Apply the selected font family to the document root
  useEffect(() => {
    const font = settings.font_family || 'Inter';
    document.documentElement.style.setProperty('--site-font', `"${font}", sans-serif`);
    document.body.style.fontFamily = `"${font}", system-ui, sans-serif`;
  }, [settings.font_family]);

  return { settings, setSettings, loading };
}
