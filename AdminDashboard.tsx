/**
 * AdminDashboard
 * --------------
 * Password-protected admin panel for managing site identity:
 *  - Upload / change the logo (stored as a data URL in Supabase)
 *  - Edit the website name
 *  - Select / change font styles
 *
 * Accessible via the /admin route. The password is checked against
 * the `admin_password` column in the `site_settings` table.
 */

import { useEffect, useState } from 'react';
import { Lock, Upload, Type, Save, CheckCircle2, AlertCircle, LogOut, Image as ImageIcon } from 'lucide-react';
import { supabase, type SiteSettings } from '../lib/supabase';

const FONT_OPTIONS = [
  { label: 'Inter (Default Sans)', value: 'Inter' },
  { label: 'Plus Jakarta Sans (Display)', value: 'Plus Jakarta Sans' },
  { label: 'Poppins (Rounded Sans)', value: 'Poppins' },
  { label: 'Roboto (Neutral Sans)', value: 'Roboto' },
  { label: 'Lato (Friendly Sans)', value: 'Lato' },
  { label: 'Merriweather (Serif)', value: 'Merriweather' },
  { label: 'Playfair Display (Elegant Serif)', value: 'Playfair Display' },
  { label: 'Source Code Pro (Monospace)', value: 'Source Code Pro' },
];

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [siteName, setSiteName] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState('Inter');

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (!error && data) {
        setSettings(data as SiteSettings);
        setSiteName(data.site_name);
        setLogoUrl(data.logo_url);
        setFontFamily(data.font_family);
      }
      setLoading(false);
    })();
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) {
      setAuthError('Settings not loaded yet. Please wait.');
      return;
    }
    if (password === settings.admin_password) {
      setAuthed(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) {
      setErrorMsg('Logo file too large. Please use an image under 500KB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLogoUrl(reader.result as string);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedMsg('');
    setErrorMsg('');

    const { error } = await supabase
      .from('site_settings')
      .update({
        site_name: siteName,
        logo_url: logoUrl,
        font_family: fontFamily,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    if (error) {
      setErrorMsg('Failed to save settings. Please try again.');
    } else {
      setSavedMsg('Settings saved successfully! Changes are now live.');
      document.body.style.fontFamily = `"${fontFamily}", system-ui, sans-serif`;
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="glass rounded-2xl px-8 py-6 text-navy-200">Loading admin panel...</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 animate-fade-in">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 shadow-gold-glow">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-extrabold text-white">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-navy-200">
              Enter your password to manage your site identity.
            </p>
          </div>

          <form onSubmit={handleAuth} className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block text-sm font-semibold text-white">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="input-premium mt-1.5"
                placeholder="Enter admin password"
              />
            </div>

            {authError && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {authError}
              </p>
            )}

            <button type="submit" className="btn-gold w-full">
              <Lock className="h-4 w-4" />
              Unlock Dashboard
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-navy-300/60">
            Default password is <span className="font-mono font-semibold text-gold-400">admin687</span>.
            Change it after your first login.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold text-white heading-accent inline-block">
          Admin Dashboard
        </h1>
        <button onClick={() => setAuthed(false)} className="btn-secondary text-sm">
          <LogOut className="h-4 w-4" />
          Lock
        </button>
      </div>

      {savedMsg && (
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          {savedMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          {errorMsg}
        </div>
      )}

      {/* Logo Upload */}
      <section className="mt-8 glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-gold-400" />
          <h2 className="font-display text-lg font-bold text-white">Site Logo</h2>
        </div>
        <p className="mt-2 text-sm text-navy-200">
          Upload a logo image (PNG, JPG, or SVG — under 500KB). It will appear in the navbar and footer.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row items-start gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo preview" className="h-full w-full object-contain" />
            ) : (
              <ImageIcon className="h-8 w-8 text-navy-300/50" />
            )}
          </div>

          <div className="flex-1">
            <label className="btn-secondary cursor-pointer text-sm">
              <Upload className="h-4 w-4" />
              Choose Image
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
            {logoUrl && (
              <button
                onClick={() => setLogoUrl(null)}
                className="ml-3 text-sm text-red-400 hover:underline"
              >
                Remove logo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Site Name */}
      <section className="mt-6 glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-gold-400" />
          <h2 className="font-display text-lg font-bold text-white">Website Name</h2>
        </div>
        <p className="mt-2 text-sm text-navy-200">
          This name appears in the navbar, footer, and browser title.
        </p>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="input-premium mt-4"
          placeholder="Daily Rate Pro"
        />
      </section>

      {/* Font Selector */}
      <section className="mt-6 glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-gold-400" />
          <h2 className="font-display text-lg font-bold text-white">Font Style</h2>
        </div>
        <p className="mt-2 text-sm text-navy-200">
          Select a font family for the entire website. The change applies instantly on save.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.value}
              onClick={() => setFontFamily(font.value)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                fontFamily === font.value
                  ? 'border-gold-400/50 bg-gold-400/10 shadow-gold-glow'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full border-2 ${
                  fontFamily === font.value
                    ? 'border-gold-400 bg-gold-400'
                    : 'border-white/20'
                }`}
              />
              <span style={{ fontFamily: `"${font.value}", sans-serif` }} className="text-sm font-semibold text-white">
                {font.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Save */}
      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-gold w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
