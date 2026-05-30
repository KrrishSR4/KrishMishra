import { motion } from "motion/react";
import { Compass, PenTool, Code2, Rocket } from "lucide-react";
import { BrushStroke } from "./BrushStroke";

/* Hero-matching palette */
const BG = "#f5f0e0";
const SURFACE = "#fbf7ea";
const INK = "#14201a";
const ORANGE = "#e85d3a";
const STEEL = "#2d3a45";
const GOLD = "#c9a84c";
const MUTED = "#5a5f5a";

const steps = [
  { Icon: Compass, title: "Discovery", time: "Week 1", desc: "Deep-dive call, audit of goals, audience & competitors. You leave with a clear product brief." },
  { Icon: PenTool, title: "Design", time: "Week 2", desc: "High-fidelity Figma flows, design system tokens, and interactive prototypes — reviewed daily." },
  { Icon: Code2, title: "Build", time: "Week 3–5", desc: "Production-grade code, typed APIs, animations, CMS & auth. Async updates on Loom every 48h." },
  { Icon: Rocket, title: "Launch & care", time: "Ongoing", desc: "Edge deploy, analytics, SEO, and a 30-day post-launch retainer for polish and growth." },
];

const cardAccents = [ORANGE, STEEL, GOLD, ORANGE];

export function Process() {
  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 overflow-hidden bg-grid-ink"
      style={{ backgroundColor: BG, color: INK }}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <p
            className="text-xs sm:text-sm font-semibold mb-3 tracking-[0.2em] uppercase font-mono"
            style={{ color: ORANGE }}
          >
            — How we'll work
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] font-display"
            style={{ color: INK }}
          >
            A simple,{" "}
            <span
              className="italic font-light relative inline-block"
              style={{ backgroundColor: GOLD, padding: "0 0.15em", color: INK }}
            >
              predictable
            </span>{" "}
            process.
          </h2>
          <div className="relative mt-5 w-fit rotate-1">
            <BrushStroke
              color="#8338EC"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={5}
            />
            <p className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3" style={{ color: BG }}>
              No surprise invoices,<br />
              no slow Mondays.<br />
              Fixed weekly rhythm so you always<br />
              know where the project stands.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative p-6 sm:p-7 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: SURFACE,
                border: `1.5px solid ${INK}`,
                borderRadius: 10,
                boxShadow: `5px 5px 0 0 ${INK}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${cardAccents[i]}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${INK}`;
              }}
            >
              <div
                className="absolute top-5 right-5 text-5xl font-display font-bold"
                style={{ color: ORANGE, opacity: 0.25 }}
              >
                0{i + 1}
              </div>
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  backgroundColor: INK,
                  color: BG,
                  borderRadius: 6,
                }}
              >
                <s.Icon className="w-5 h-5" />
              </div>
              <div
                className="mt-5 text-[11px] tracking-widest uppercase font-mono font-semibold"
                style={{ color: ORANGE }}
              >
                {s.time}
              </div>
              <h3
                className="mt-1 text-xl font-display font-semibold"
                style={{ color: INK }}
              >
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
