/**
 * Slider
 * -------
 * Premium reusable range slider with gold glow thumb, gradient track,
 * and a glassmorphic value badge. Large, mobile-friendly, with error
 * handling. Designed for the high-tech dark navy theme.
 */

import { type ReactNode } from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue: (v: number) => string;
  icon?: ReactNode;
  error?: string;
}

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
  icon,
  error,
}: SliderProps) {
  // Compute fill percentage for the gradient track
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-navy-100">
          {icon}
          {label}
        </label>
        <span className="rounded-lg border border-gold-400/20 bg-gold-400/10 px-3 py-1 text-sm font-bold text-gold-300 backdrop-blur-sm">
          {formatValue(value)}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #ecb73c 0%, #d99e21 ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
        className="mt-3 w-full h-2.5 cursor-pointer appearance-none rounded-full shadow-inner
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6
                   [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-gold-300 [&::-webkit-slider-thumb]:to-gold-500
                   [&::-webkit-slider-thumb]:shadow-gold-glow [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125
                   [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20
                   [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6
                   [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold-400
                   [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20
                   [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-gold-glow"
      />

      <div className="mt-1.5 flex justify-between text-xs text-navy-300/60">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
