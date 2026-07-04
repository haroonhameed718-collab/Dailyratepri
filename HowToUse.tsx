/**
 * HowToUse
 * --------
 * A styled, step-by-step guide section displayed below each calculator.
 * Shows numbered steps with icons to help users understand how to use
 * the tool. Also includes a placeholder area for ~300 words of
 * SEO-friendly descriptive text that can be customized per tool.
 */

import { type LucideIcon } from 'lucide-react';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface HowToUseProps {
  steps: Step[];
  seoTitle?: string;
  seoParagraphs?: string[];
}

export default function HowToUse({
  steps,
  seoTitle = 'About This Tool',
  seoParagraphs = [],
}: HowToUseProps) {
  return (
    <section className="mt-8">
      {/* How to Use — step-by-step guide */}
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-white heading-accent inline-block">
          How to Use This Calculator
        </h2>
        <p className="mt-4 text-sm text-navy-200">
          Follow these simple steps to get accurate results in seconds.
        </p>

        <ol className="mt-6 space-y-5">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 shadow-gold-glow">
                  <step.icon className="h-5 w-5" />
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-gradient-to-b from-gold-400/30 to-transparent" />
                )}
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-white">
                  <span className="text-gold-400">Step {i + 1}:</span> {step.title}
                </h3>
                <p className="mt-1 text-sm text-navy-200 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* SEO content placeholder — ~300 words */}
      {seoParagraphs.length > 0 && (
        <div className="glass mt-6 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-white heading-accent inline-block">
            {seoTitle}
          </h2>
          <div className="mt-4 space-y-4">
            {seoParagraphs.map((p, i) => (
              <p key={i} className="text-sm text-navy-200 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
