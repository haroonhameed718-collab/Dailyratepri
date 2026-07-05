/**
 * AdSlot
 * ------
 * A dedicated, clearly-labeled container reserved for future Google
 * AdSense ad units. Each slot renders a non-intrusive placeholder so
 * the layout is AdSense-ready without disrupting the user experience.
 *
 * AdSense policy compliance notes:
 *  - Ads are clearly separated from content with a visible "Advertisement" label.
 *  - Placeholders do not mimic or obscure navigation or primary content.
 *  - No auto-refresh or deceptive styling is applied.
 */

interface AdSlotProps {
  /** Unique identifier used for the future ad unit, e.g. "AdSense_Top" */
  slotId: string;
  /** Human-readable label shown above the ad space */
  label?: string;
  /** Height of the ad container (Tailwind class), e.g. "h-24", "h-64" */
  className?: string;
}

export default function AdSlot({
  slotId,
  label = 'Advertisement',
  className = 'h-24',
}: AdSlotProps) {
  return (
    <div
      id={slotId}
      data-ad-slot={slotId}
      aria-label={label}
      className={`glass w-full rounded-2xl border-dashed border-white/10 flex flex-col items-center justify-center text-center px-4 ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-navy-300/60">
        {label}
      </span>
      <span className="mt-1 text-xs text-navy-300/40">
        Ad space — reserved for {slotId}
      </span>
    </div>
  );
}
