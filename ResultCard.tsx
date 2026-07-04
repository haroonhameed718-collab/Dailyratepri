/**
 * ResultCard
 * -----------
 * Premium glass card for displaying a labeled result value with
 * a gold-accented icon and subtle glow on the dark navy theme.
 */

import { type LucideIcon } from 'lucide-react';

interface ResultCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: string;
}

export default function ResultCard({
  label,
  value,
  icon: Icon,
  accent = 'text-gold-400',
}: ResultCardProps) {
  return (
    <div className="glass rounded-2xl p-5 text-center transition-all duration-300 hover:border-gold-400/20 hover:shadow-gold-glow">
      <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy-300">
        {label}
      </p>
      <p className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-white">
        {value}
      </p>
    </div>
  );
}
