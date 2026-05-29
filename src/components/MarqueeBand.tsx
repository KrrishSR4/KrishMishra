import { Star } from "lucide-react";

const words = ["Web Design", "Frontend", "UI Engineering", "Full-stack", "Motion", "Performance", "SEO", "Edge Deploy"];

export function MarqueeBand() {
  return (
    <section aria-hidden className="relative py-6 sm:py-8 bg-ink text-background overflow-hidden border-y border-ink">
      <style>{`
        @keyframes band-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex gap-10 w-max" style={{ animation: "band-marquee 32s linear infinite" }}>
        {[...words, ...words, ...words].map((w, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-2xl sm:text-4xl font-semibold tracking-tight whitespace-nowrap">{w}</span>
            <Star className="w-5 h-5 text-gold fill-current" />
          </div>
        ))}
      </div>
    </section>
  );
}
