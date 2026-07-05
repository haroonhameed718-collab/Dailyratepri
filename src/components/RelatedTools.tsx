/**
 * RelatedTools
 * ------------
 * Internal linking section that connects related calculator pages.
 * Helps users discover other tools and improves SEO through internal
 * link structure. Displays as a horizontal row of pill-style links.
 */

import { type LucideIcon, ArrowRight } from 'lucide-react';

interface RelatedTool {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  title?: string;
}

export default function RelatedTools({ tools, title = 'Related Tools' }: RelatedToolsProps) {
  return (
    <section className="mt-8">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-white heading-accent inline-block">
          {title}
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-navy-100 transition-all duration-300 hover:border-gold-400/30 hover:bg-gold-400/10 hover:text-gold-300 hover:shadow-gold-glow hover:-translate-y-0.5"
            >
              <tool.icon className="h-4 w-4" />
              {tool.label}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
