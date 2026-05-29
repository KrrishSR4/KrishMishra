import { motion } from "motion/react";
import { Layout, Code2, Server, Sparkles, Gauge, LifeBuoy } from "lucide-react";
import { BrushStroke } from "./BrushStroke";

const services = [
  { Icon: Layout, title: "Web Design & UI", desc: "Pixel-perfect, conversion-focused interfaces designed in Figma and built in code.", tag: "Design" },
  { Icon: Code2, title: "Frontend Engineering", desc: "React, Next.js, Angular & Tailwind — component systems that scale with your team.", tag: "Frontend" },
  { Icon: Server, title: "Backend & APIs", desc: "Node, Express, MongoDB & Postgres. Secure, typed REST and realtime endpoints.", tag: "Backend" },
  { Icon: Sparkles, title: "Animations & Micro-UX", desc: "Framer Motion + GSAP choreography that elevates products from good to memorable.", tag: "Motion" },
  { Icon: Gauge, title: "Performance & SEO", desc: "Edge-deployed apps on Cloudflare & Vercel — fast Core Web Vitals and indexable by default.", tag: "Perf" },
  { Icon: LifeBuoy, title: "Long-term Retainers", desc: "Monthly retainers for shipping features, fixing bugs, and growing your product weekly.", tag: "Care" },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <p className="text-xs sm:text-sm font-semibold text-emerald mb-3 tracking-[0.2em] uppercase">— Services</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            What I do <span className="text-emerald italic font-light">best</span>.
          </h2>
          <div className="relative mt-5 w-fit -rotate-1">
            <BrushStroke
              color="#00A878"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={4}
            />
            <p className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3" style={{ color: "#f5f0e0" }}>
              End-to-end product engineering<br />
              for founders who want a single,<br />
              senior partner — from first sketch<br />
              to shipped feature.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative brut-card p-6 sm:p-7 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-ink text-primary-foreground flex items-center justify-center group-hover:rotate-6 transition-transform" style={{ borderRadius: 6 }}>
                    <s.Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-mono text-muted-foreground">{s.tag}</span>
                </div>
                <h3 className="mt-6 text-xl font-display font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
