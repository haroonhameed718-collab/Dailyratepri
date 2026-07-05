/**
 * Navbar
 * ------
 * Responsive top navigation bar with glassmorphism styling.
 * Links to the 4 main calculator tools plus the home page.
 * Includes a professional Admin button (top-right) linking to /admin.
 * Brand name and logo are dynamically loaded from site settings.
 * Collapses into a mobile menu on small screens.
 */

import { useState } from 'react';
import { Menu, X, Calculator, TrendingUp, Percent, Coins, Home, LineChart, Settings, Tag } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface NavItem {
  label: string;
  href: string;
  icon: typeof Home;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#/', icon: Home },
  { label: 'EMI', href: '#/emi', icon: Calculator },
  { label: 'SIP', href: '#/sip', icon: TrendingUp },
  { label: 'Compound Interest', href: '#/compound-interest', icon: Percent },
  { label: 'Currency', href: '#/currency-converter', icon: Coins },
  { label: 'Discount', href: '#/discount', icon: Tag },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { settings } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50">
      <nav className="glass border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand — dynamic logo + name */}
            <a href="#/" className="flex items-center gap-2 group">
              {settings.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt={settings.site_name}
                  className="h-9 w-9 rounded-xl object-contain"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 shadow-gold-glow transition-transform group-hover:scale-105">
                  <LineChart className="h-5 w-5" />
                </span>
              )}
              <span className="font-display text-lg font-bold text-white">
                {settings.site_name}
              </span>
            </a>

            {/* Desktop links + Admin button */}
            <div className="hidden md:flex items-center gap-1">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-100 transition-all duration-300 hover:bg-white/10 hover:text-gold-300 hover:shadow-gold-glow"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Admin button — professional, top-right */}
              <a
                href="#/admin"
                className="ml-2 flex items-center gap-1.5 rounded-lg border border-gold-400/20 bg-gold-400/10 px-3 py-2 text-sm font-semibold text-gold-300 backdrop-blur-sm transition-all duration-300 hover:bg-gold-400/20 hover:text-gold-200 hover:shadow-gold-glow hover:border-gold-400/40"
                aria-label="Admin Dashboard"
                title="Admin Dashboard"
              >
                <Settings className="h-4 w-4" />
                Admin
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 bg-navy-950/80 backdrop-blur-2xl">
            <ul className="mx-auto max-w-7xl px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-100 hover:bg-white/10 hover:text-gold-300 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
              {/* Admin link in mobile menu */}
              <li>
                <a
                  href="#/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-gold-300 hover:bg-gold-400/10 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Admin Dashboard
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
