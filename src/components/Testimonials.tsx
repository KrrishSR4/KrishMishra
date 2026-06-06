import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const items = [
  {
    quote: "Krish shipped our MVP in 5 weeks. The animations alone closed our seed round.",
    name: "Aanya Verma",
    role: "Founder · Lumen Labs",
    color: "#064e3b",
  },
  {
    quote: "Senior judgment, designer-level taste, and dev-velocity. A rare combination.",
    name: "Marcus Hale",
    role: "CTO · Northwind",
    color: "#c9a84c",
  },
  {
    quote: "Our Core Web Vitals went green in a week. Conversion is up 31%.",
    name: "Sofia Marín",
    role: "Head of Growth · Quay",
    color: "#0d7a5f",
  },
  {
    quote: "Reliable, kind, and absurdly fast. He's our default tech partner now.",
    name: "Daniel Okafor",
    role: "Founder · Atlas Maps",
    color: "#1f2937",
  },
  {
    quote: "Best freelancer we've worked with in 6 years. Hire him before he raises rates.",
    name: "Riya Kapoor",
    role: "Product Lead · Pulse",
    color: "#064e3b",
  },
  {
    quote: "The handoff was zero-friction. Documentation, types, tests — everything.",
    name: "Tom Becker",
    role: "Eng Manager · Cinder",
    color: "#c9a84c",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <p className="text-xs sm:text-sm font-semibold text-emerald mb-3 tracking-[0.2em] uppercase">
            — Client Love
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Trusted by founders who <span className="text-emerald italic font-light">ship</span>.
          </h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="break-inside-avoid mb-5 brut-card p-6"
            >
              <Quote className="w-6 h-6 text-gold" />
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-display font-semibold text-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
