import { motion } from "motion/react";
import { ArrowUpRight, Eye, Github } from "lucide-react";
import { BrushStroke } from "./BrushStroke";

/* Hero-matching palette */
const BG = "#f5f0e0";
const SURFACE = "#fbf7ea";
const INK = "#14201a";
const ORANGE = "#e85d3a";
const STEEL = "#2d3a45";
const GOLD = "#c9a84c";
const MUTED = "#5a5f5a";
const RUST = "#9b3a1f";
const EMERALD = "#0d7a5f";

const projects = [
  {
    title: "Nimbus Analytics",
    tag: "SaaS Dashboard",
    desc: "Realtime analytics with sub-second queries.",
    year: "2025",
    bg: INK,
    fg: BG,
    accent: GOLD,
    shadowColor: ORANGE,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Loom Commerce",
    tag: "E-commerce",
    desc: "Headless storefront with edge personalization.",
    year: "2025",
    bg: SURFACE,
    fg: INK,
    accent: ORANGE,
    shadowColor: INK,
    span: "md:col-span-2",
  },
  {
    title: "Quill AI",
    tag: "AI Writing",
    desc: "Collaborative editor on streaming LLMs.",
    year: "2024",
    bg: GOLD,
    fg: INK,
    accent: INK,
    shadowColor: INK,
    span: "",
  },
  {
    title: "Pulse Health",
    tag: "Mobile App",
    desc: "Wellness tracker with adaptive nudges.",
    year: "2024",
    bg: SURFACE,
    fg: INK,
    accent: EMERALD,
    shadowColor: INK,
    span: "",
  },
  {
    title: "Atlas Maps",
    tag: "Geo Platform",
    desc: "Interactive map studio for logistics.",
    year: "2024",
    bg: STEEL,
    fg: BG,
    accent: GOLD,
    shadowColor: ORANGE,
    span: "md:col-span-2",
  },
  {
    title: "Cinder CMS",
    tag: "Open Source",
    desc: "Block-based CMS with type-safe content.",
    year: "2023",
    bg: ORANGE,
    fg: INK,
    accent: INK,
    shadowColor: INK,
    span: "md:col-span-2",
  },
];

function Card({ p, i }: { p: (typeof projects)[0]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}
      className={`group relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[300px] p-6 sm:p-7 ${p.span} cursor-pointer transition-all duration-300`}
      style={{
        backgroundColor: p.bg,
        color: p.fg,
        border: `1.5px solid ${INK}`,
        borderRadius: 10,
        boxShadow: `5px 5px 0 0 ${p.shadowColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-3px, -3px)";
        e.currentTarget.style.boxShadow = `9px 9px 0 0 ${p.shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0, 0)";
        e.currentTarget.style.boxShadow = `5px 5px 0 0 ${p.shadowColor}`;
      }}
    >
      {/* top row */}
      <div className="relative flex items-start justify-between">
        <div>
          <div
            className="text-[11px] uppercase tracking-widest opacity-70 mb-1 font-mono"
          >
            {p.tag}
          </div>
          <div className="text-xs opacity-50 font-mono">
            {String(i + 1).padStart(2, "0")} / {p.year}
          </div>
        </div>
        <motion.div
          whileHover={{ rotate: 45 }}
          className="w-10 h-10 flex items-center justify-center transition-colors"
          style={{
            backgroundColor: `${p.fg}15`,
            borderRadius: 4,
          }}
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* bottom content */}
      <div className="relative mt-8">
        <h3
          className="font-display text-2xl sm:text-3xl font-semibold leading-tight"
        >
          {p.title}
        </h3>
        <p className="text-sm opacity-80 mt-2 leading-relaxed max-w-md">
          {p.desc}
        </p>
      </div>

      {/* Hover quick actions */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none group-hover:pointer-events-auto">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition-colors"
          style={{
            backgroundColor: `${p.fg}18`,
            borderRadius: 4,
            backdropFilter: "blur(8px)",
          }}
        >
          <Eye className="w-3.5 h-3.5" />
          View details
        </a>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition-colors"
          style={{
            backgroundColor: `${p.fg}18`,
            borderRadius: 4,
            backdropFilter: "blur(8px)",
          }}
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 overflow-hidden bg-grid-ink"
      style={{ backgroundColor: BG, color: INK }}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p
              className="text-xs sm:text-sm font-semibold mb-3 tracking-[0.2em] uppercase font-mono"
              style={{ color: ORANGE }}
            >
              — Selected Work
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-2xl font-display"
              style={{ color: INK }}
            >
              Crafted for clients who{" "}
              <span
                className="italic font-light relative inline-block"
                style={{
                  backgroundColor: GOLD,
                  padding: "0 0.15em",
                  color: INK,
                }}
              >
                care
              </span>
              .
            </h2>
          </div>
          <div className="relative mt-5 w-fit -rotate-1">
            <BrushStroke
              color="#F7B801"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={6}
            />
            <p className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3" style={{ color: INK }}>
              A glimpse into recent<br />
              collaborations across SaaS,<br />
              commerce, and developer tools.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[minmax(220px,auto)] gap-4 sm:gap-5">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
