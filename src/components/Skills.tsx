import { motion } from "motion/react";
import {
  SiReact, SiNextdotjs, SiAngular, SiTailwindcss, SiTypescript,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiRedis, SiFirebase, SiCloudflare,
  SiFramer, SiGreensock, SiFigma, SiGithub, SiDocker, SiPostman,
} from "react-icons/si";
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

const skills = [
  { Icon: SiReact, color: "#61DAFB", name: "React" },
  { Icon: SiNextdotjs, color: INK, name: "Next.js" },
  { Icon: SiAngular, color: "#DD0031", name: "Angular" },
  { Icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind" },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { Icon: SiNodedotjs, color: "#3FAA48", name: "Node.js" },
  { Icon: SiExpress, color: INK, name: "Express" },
  { Icon: SiMongodb, color: "#47A248", name: "MongoDB" },
  { Icon: SiPostgresql, color: "#5A8AC6", name: "Postgres" },
  { Icon: SiRedis, color: "#FF4438", name: "Redis" },
  { Icon: SiFirebase, color: "#FFCA28", name: "Firebase" },
  { Icon: SiCloudflare, color: "#F38020", name: "Cloudflare" },
  { Icon: SiFramer, color: "#a78bfa", name: "Framer Motion" },
  { Icon: SiGreensock, color: "#88CE02", name: "GSAP" },
  { Icon: SiFigma, color: "#F24E1E", name: "Figma" },
  { Icon: SiGithub, color: INK, name: "GitHub" },
  { Icon: SiDocker, color: "#2496ED", name: "Docker" },
  { Icon: SiPostman, color: "#FF6C37", name: "Postman" },
];

function Row({ list, reverse = false, duration = 38 }: { list: typeof skills; reverse?: boolean; duration?: number }) {
  return (
    <div className="group relative overflow-hidden py-3">
      <div
        className="flex gap-5 sm:gap-6 w-max marquee-track"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...list, ...list].map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-300 cursor-pointer group/card"
            style={{
              backgroundColor: SURFACE,
              border: `1.5px solid ${INK}`,
              borderRadius: 8,
              color: s.color,
              boxShadow: `3px 3px 0 0 ${INK}`,
            }}
            title={s.name}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = `6px 6px 0 0 ${ORANGE}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = `3px 3px 0 0 ${INK}`;
            }}
          >
            <s.Icon className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const half = Math.ceil(skills.length / 2);
  const top = skills.slice(0, half);
  const bot = skills.slice(half);

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 overflow-hidden bg-grid-cream"
      style={{ backgroundColor: STEEL, color: SURFACE }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .group:hover .marquee-track { animation-play-state: paused; }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          <p
            className="text-xs sm:text-sm font-semibold mb-3 tracking-[0.2em] uppercase font-mono"
            style={{ color: ORANGE }}
          >
            — The Toolbelt
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-display"
            style={{ color: SURFACE }}
          >
            A modern stack,{" "}
            <span style={{ color: GOLD }} className="italic font-light">
              battle-tested
            </span>
            .
          </h2>
          <div className="relative mt-5 w-fit rotate-1">
            <BrushStroke
              color="#0077B6"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={3}
            />
            <p className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3" style={{ color: "#f5f0e0" }}>
              Crafting digital experiences<br />
              that blend thoughtful design<br />
              with reliable engineering.
            </p>
          </div>
        </motion.div>

        <div className="relative -mx-5 sm:-mx-8">
          {/* edge fades matching STEEL bg */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10"
            style={{ background: `linear-gradient(to right, ${STEEL}, transparent)` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10"
            style={{ background: `linear-gradient(to left, ${STEEL}, transparent)` }}
          />
          <Row list={top} duration={38} />
          <Row list={bot} reverse duration={46} />
        </div>

        {/* stats grid */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { n: "18+", l: "Technologies" },
            { n: "4 years", l: "Production exp." },
            { n: "98", l: "Avg Lighthouse" },
            { n: "24h", l: "Reply time" },
          ].map((s) => (
            <div
              key={s.l}
              className="p-5 transition-all duration-300"
              style={{
                backgroundColor: "rgba(245,240,224,0.06)",
                border: `1.5px solid rgba(245,240,224,0.15)`,
                borderRadius: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${ORANGE}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: GOLD }}>
                {s.n}
              </div>
              <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: "rgba(245,240,224,0.6)" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
