/**
 * Footer
 * ------
 * Clean footer with dynamic brand info, quick links to the 4 tools,
 * and mandatory legal links: Privacy Policy, Terms of Service,
 * Disclaimer, and Contact Us. Brand name and logo loaded from site settings.
 */

import { Mail, Shield, FileText, LineChart, AlertTriangle, Info } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

const TOOL_LINKS = [
  { label: 'EMI Calculator', href: '#/emi' },
  { label: 'SIP Calculator', href: '#/sip' },
  { label: 'Compound Interest', href: '#/compound-interest' },
  { label: 'Currency Converter', href: '#/currency-converter' },
  { label: 'Discount Calculator', href: '#/discount' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '#/about-us', icon: Info },
  { label: 'Contact Us', href: '#/contact-us', icon: Mail },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#/privacy-policy', icon: Shield },
  { label: 'Terms of Service', href: '#/terms-of-service', icon: FileText },
  { label: 'Disclaimer', href: '#/disclaimer', icon: AlertTriangle },
];

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="mt-20 border-t border-white/10 bg-navy-950/80 backdrop-blur-xl text-navy-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              {settings.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt={settings.site_name}
                  className="h-9 w-9 rounded-xl object-contain bg-white/10 p-1"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600">
                  <LineChart className="h-5 w-5 text-navy-900" />
                </span>
              )}
              <span className="font-display text-lg font-bold text-white">
                {settings.site_name}
              </span>
            </div>
            <p className="mt-4 text-sm text-navy-300 max-w-xs">
              Free, accurate financial calculators and live currency rates to help
              you plan loans, investments, and exchanges with confidence.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
              Calculators
            </h3>
            <ul className="mt-4 space-y-2">
              {TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gold-400">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-navy-200 transition-colors hover:text-gold-300"
                  >
                    <link.icon className="h-4 w-4 text-navy-300/60" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-navy-300 transition-colors hover:text-white"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} {settings.site_name}. All rights reserved.
          </p>
          <p className="text-xs text-navy-400">
            Calculators are for informational purposes only and do not constitute
            financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
