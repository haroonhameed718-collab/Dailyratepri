/**
 * ToolDescription
 * ---------------
 * Renders a "What is [Tool Name]" informative section with an H2 heading
 * and ~200 words of SEO-friendly descriptive text. Placed above the
 * HowToUse guide on each calculator page.
 */

interface ToolDescriptionProps {
  title: string;
  description: string;
}

export default function ToolDescription({ title, description }: ToolDescriptionProps) {
  return (
    <section className="mt-8">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-white heading-accent inline-block">
          {title}
        </h2>
        <p className="mt-5 text-navy-200 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
