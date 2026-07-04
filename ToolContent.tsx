/**
 * ToolContent
 * -----------
 * Renders the "How this tool helps you" educational content section
 * below each calculator. This content is essential for AdSense
 * approval — it demonstrates value and originality to avoid
 * "Low Value Content" rejection.
 */

interface ToolContentProps {
  title?: string;
  paragraphs: string[];
}

export default function ToolContent({
  title = 'How this tool helps you',
  paragraphs,
}: ToolContentProps) {
  return (
    <section className="mt-12">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-white heading-accent inline-block">
          {title}
        </h2>
        <div className="mt-6 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-navy-200 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
