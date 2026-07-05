/**
 * FAQ
 * ---
 * Clean, card-based FAQ section with collapsible answers. Uses semantic
 * <details>/<summary> tags for accessibility and SEO (Google can parse
 * these for featured snippets). Each question is an H3 for structure.
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Frequently Asked Questions' }: FAQProps) {
  return (
    <section className="mt-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-white heading-accent inline-block">
          {title}
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <details
            key={i}
            className="group glass rounded-2xl p-5 transition-all duration-300 hover:border-gold-400/20 hover:shadow-gold-glow [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-3 list-none">
              <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                {item.question}
              </h3>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gold-400/10 border border-gold-400/20 text-gold-400 transition-transform duration-300 group-open:rotate-45">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-sm text-navy-200 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
