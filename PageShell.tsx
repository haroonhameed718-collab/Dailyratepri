/**
 * PageShell
 * ---------
 * Shared layout wrapper for static content pages (Privacy Policy,
 * Terms of Service, Contact Us). Provides consistent spacing, a
 * glass card container, and a heading.
 */

import { type ReactNode } from 'react';

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="glass rounded-3xl p-8 sm:p-12">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white heading-accent inline-block">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-navy-200 leading-relaxed">{subtitle}</p>
        )}
        <div className="mt-8 prose-content">{children}</div>
      </div>
    </div>
  );
}
