import { Layout, Code2, Server, Sparkles, Gauge, LifeBuoy } from "lucide-react";
import { motion } from "motion/react";
import { BrushStroke } from "./BrushStroke";

const ORANGE = "#e85d3a";
const INK = "#14201a";

const services = [
  {
    Icon: Layout,
    title: "Web Design & UI",
    desc: "Pixel-perfect, conversion-focused interfaces designed in Figma and built in code.",
    tag: "Design",
  },
  {
    Icon: Code2,
    title: "Frontend Development",
    desc: "Modern, responsive interfaces built with React, Next.js and industry-leading tools.",
    tag: "Frontend",
  },
  {
    Icon: Server,
    title: "Backend Development",
    desc: "Secure, scalable systems that power websites, apps and business workflows.",
    tag: "Backend",
  },
  {
    Icon: Sparkles,
    title: "Animations & Interactions",
    desc: "Smooth animations and thoughtful details that make products feel alive.",
    tag: "Motion",
  },
  {
    Icon: Gauge,
    title: "Performance & SEO",
    desc: "Fast-loading websites optimized for visibility, traffic and conversions.",
    tag: "Perf",
  },
  {
    Icon: LifeBuoy,
    title: "Ongoing Support",
    desc: "Regular updates, fixes and improvements to keep your website running smoothly.",
    tag: "Care",
  },
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
          <p className="text-xs sm:text-sm font-semibold text-emerald mb-3 tracking-[0.2em] uppercase">
            — Services
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            What I do <span className="text-emerald italic font-light">best</span>.
          </h2>
          <div className="relative mt-5 w-fit -rotate-1">
            <BrushStroke
              color="#00A878"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={4}
            />
            <p
              className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3"
              style={{ color: "#f5f0e0" }}
            >
              Building modern websites,
              <br />
              web applications and digital
              <br />
              experiences that help businesses
              <br />
              stand out online.
              <br />
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
              style={{
                backgroundColor: "#f5f0e0",
                border: `2px solid ${INK}`,
                borderRadius: 8,
                color: INK,
                boxShadow: `5px 5px 0 0 ${ORANGE}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${ORANGE}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${ORANGE}`;
              }}
            >
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 bg-ink text-primary-foreground flex items-center justify-center group-hover:rotate-6 transition-transform"
                    style={{ borderRadius: 6 }}
                  >
                    <s.Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-mono text-muted-foreground">
                    {s.tag}
                  </span>
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
