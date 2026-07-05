/**
 * BackgroundDecor
 * ----------------
 * Premium animated background layer with floating, rotating, and
 * fading 3D-style currency symbols ($, ₹, €, £, ¥) and calculator
 * signs (+, −, ×, ÷). Purely decorative — pointer-events-none so
 * it never blocks interaction. Creates a "High-Tech Financial Hub"
 * atmosphere with depth and subtle motion.
 */

import {
  DollarSign, Euro, PoundSterling, JapaneseYen, IndianRupee,
  Plus, Minus, X, Divide, TrendingUp, BarChart3, PieChart,
} from 'lucide-react';

interface FloatItem {
  Icon: typeof DollarSign;
  className: string;
  animation: string;
  strokeWidth?: number;
}

// Currency symbols — larger, more prominent
const CURRENCY_SYMBOLS: FloatItem[] = [
  { Icon: DollarSign, className: 'top-[8%] left-[6%] text-8xl text-gold-400/10', animation: 'animate-float-slow' },
  { Icon: Euro, className: 'top-[15%] right-[8%] text-7xl text-gold-300/8', animation: 'animate-float-slower' },
  { Icon: PoundSterling, className: 'bottom-[20%] left-[10%] text-7xl text-gold-400/8', animation: 'animate-float-slowest' },
  { Icon: JapaneseYen, className: 'bottom-[12%] right-[12%] text-6xl text-gold-300/10', animation: 'animate-float-slow' },
  { Icon: IndianRupee, className: 'top-[40%] left-[3%] text-6xl text-gold-400/8', animation: 'animate-float-slower' },
  { Icon: DollarSign, className: 'top-[60%] right-[5%] text-7xl text-gold-300/6', animation: 'animate-float-slowest' },
];

// Calculator signs — smaller, scattered, different feel
const CALC_SIGNS: FloatItem[] = [
  { Icon: Plus, className: 'top-[20%] left-[20%] text-5xl text-navy-300/15', animation: 'animate-float-slower', strokeWidth: 1.5 },
  { Icon: Minus, className: 'top-[35%] right-[25%] text-5xl text-navy-300/12', animation: 'animate-float-slow', strokeWidth: 1.5 },
  { Icon: X, className: 'bottom-[35%] left-[30%] text-4xl text-navy-300/15', animation: 'animate-float-slowest', strokeWidth: 1.5 },
  { Icon: Divide, className: 'top-[70%] right-[20%] text-5xl text-navy-300/12', animation: 'animate-float-slower', strokeWidth: 1.5 },
  { Icon: Plus, className: 'bottom-[50%] right-[8%] text-4xl text-navy-300/10', animation: 'animate-float-slow', strokeWidth: 1.5 },
  { Icon: Minus, className: 'top-[50%] left-[40%] text-4xl text-navy-300/8', animation: 'animate-float-slowest', strokeWidth: 1.5 },
];

// Chart icons — very subtle, adds financial depth
const CHART_ICONS: FloatItem[] = [
  { Icon: TrendingUp, className: 'top-[25%] left-[50%] text-7xl text-navy-300/6', animation: 'animate-float-slow', strokeWidth: 1 },
  { Icon: BarChart3, className: 'bottom-[30%] right-[40%] text-6xl text-navy-300/5', animation: 'animate-float-slower', strokeWidth: 1 },
  { Icon: PieChart, className: 'top-[55%] left-[15%] text-5xl text-navy-300/5', animation: 'animate-float-slowest', strokeWidth: 1 },
];

export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Deep navy gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

      {/* Radial glow accents — gold and navy */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-navy-500/10 blur-[100px]" />
      <div className="absolute top-1/3 right-1/3 h-[300px] w-[300px] rounded-full bg-gold-400/3 blur-[80px]" />

      {/* Faint graph grid lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ecb73c" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating currency symbols */}
      {CURRENCY_SYMBOLS.map(({ Icon, className, animation }, i) => (
        <div key={`cur-${i}`} className={`absolute ${className} ${animation} drop-shadow-2xl`}>
          <Icon strokeWidth={1.5} />
        </div>
      ))}

      {/* Floating calculator signs */}
      {CALC_SIGNS.map(({ Icon, className, animation, strokeWidth = 2 }, i) => (
        <div key={`calc-${i}`} className={`absolute ${className} ${animation} drop-shadow-lg`}>
          <Icon strokeWidth={strokeWidth} />
        </div>
      ))}

      {/* Floating chart icons */}
      {CHART_ICONS.map(({ Icon, className, animation, strokeWidth = 2 }, i) => (
        <div key={`chart-${i}`} className={`absolute ${className} ${animation} drop-shadow-lg`}>
          <Icon strokeWidth={strokeWidth} />
        </div>
      ))}

      {/* Decorative ascending line graph — subtle gold */}
      <svg
        className="absolute bottom-0 left-0 w-full h-48 opacity-[0.08]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ecb73c" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#f0c75e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ecb73c" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <polyline
          points="0,180 200,140 400,160 600,90 800,110 1000,50 1200,70"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="3"
        />
        <polyline
          points="0,200 200,180 400,190 600,150 800,160 1000,120 1200,130"
          fill="none"
          stroke="#3a527d"
          strokeWidth="2"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
