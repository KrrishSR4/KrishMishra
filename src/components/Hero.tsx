import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Star,
  Code2,
  Zap,
  Coffee,
  MapPin,
  Command,
  CloudSun,
  Terminal,
  Hammer,
  Cpu,
} from "lucide-react";
import { BrushStroke } from "./BrushStroke";

/* ------------------------------------------------------------- *
 *  HERO — Solid colors, bold, engineer / "boys" feel.            *
 *  No gradients. Hard edges. Industrial accents.                 *
 * ------------------------------------------------------------- */

const BG = "#f5f0e0";          // cream
const SURFACE = "#fbf7ea";     // light cream card
const SURFACE_2 = "#ece5d0";   // deeper cream
const BORDER = "#14201a";      // hard ink border
const SOFT_BORDER = "rgba(20,32,26,0.12)";
const INK = "#14201a";         // near-black
const TEXT = "#14201a";
const MUTED = "#5a5f5a";
const ORANGE = "#e85d3a";      // bold accent
const STEEL = "#2d3a45";       // deep steel blue
const RUST = "#9b3a1f";        // rust red
const EMERALD = "#0d7a5f";
const GOLD = "#c9a84c";

function useClock() {
  // Initialize with null to avoid server‑side rendering of a dynamic date.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // Set initial time on mount (client only).
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  return now;
}

export function Hero() {
  /* mouse parallax (subtle) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const px1 = useTransform(sx, (v) => v * 18);
  const py1 = useTransform(sy, (v) => v * 18);
  const px2 = useTransform(sx, (v) => v * -22);
  const py2 = useTransform(sy, (v) => v * -22);

  /* parallax mouse tracking for geometric blocks */
  const heroRef = useRef<HTMLSectionElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const isInHero = e.clientY >= heroRect.top && e.clientY <= heroRect.bottom;
      if (isInHero) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        mx.set((e.clientX / w - 0.5) * 2);
        my.set((e.clientY / h - 0.5) * 2);
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const now = useClock();
  // Render time only after the client has set it to avoid hydration mismatches.
  const time = now
    ? now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "";

  const cmds = ["research", "code", "build", "ship", "deploy", "scale", "monitor"];
  const [cmdIdx, setCmdIdx] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  // Fast typing effect for the displayed command
  useEffect(() => {
    // Reset typed command when command changes
    setTypedCmd("");
    const full = cmds[cmdIdx] ?? "";
    let i = 0;
    const interval = setInterval(() => {
      i++;
      // Slice up to current index for smooth typing
      setTypedCmd(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [cmdIdx]);

  useEffect(() => {
    const i = setInterval(() => setCmdIdx((c) => (c + 1) % cmds.length), 1800);
    return () => clearInterval(i);
  }, [cmds.length]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 sm:pt-32 bg-grid-ink"
      style={{ backgroundColor: BG, color: TEXT }}
    >
      {/* ---------- SOLID BACKGROUND LAYERS (no gradients/blur) ---------- */}

      {/* solid geometric accent blocks */}
      <motion.div
        aria-hidden
        style={{ x: px1, y: py1, backgroundColor: ORANGE }}
        className="absolute -z-10 top-[14%] right-[6%] w-24 h-24 sm:w-36 sm:h-36 rotate-12 hidden sm:block"
      />
      <motion.div
        aria-hidden
        style={{ x: px2, y: py2, backgroundColor: STEEL }}
        className="absolute -z-10 bottom-[10%] left-[4%] w-20 h-20 sm:w-32 sm:h-32 hidden sm:block"
      />
      <div
        aria-hidden
        className="absolute -z-10 top-[40%] right-[42%] w-10 h-10 hidden md:block"
        style={{ backgroundColor: GOLD }}
      />
      <div
        aria-hidden
        className="absolute -z-10 top-[68%] right-[18%] w-6 h-6 rotate-45 hidden md:block"
        style={{ backgroundColor: RUST }}
      />

      {/* hard grid */}




      {/* ---------- MAIN GRID ---------- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* ====== LEFT — copy ====== */}
        <div className="lg:col-span-7 relative">
          {/* status pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider mb-6 sm:mb-8"
            style={{
              backgroundColor: INK,
              color: BG,
              borderRadius: 2,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: ORANGE }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: ORANGE }}
              />
            </span>
            Available · IST {time}
          </motion.div>

          {/* headline — solid color, no gradient text */}
          <h1 className="font-display font-bold tracking-tight leading-[1.02] text-[2.6rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="block"
              style={{ color: INK }}
            >
              Krish Mishra
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
              style={{ color: ORANGE }}
            >
              Full-stack dev &amp;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block"
              style={{ color: INK }}
            >
              <span
                className="relative inline-block"
                style={{
                  backgroundColor: GOLD,
                  padding: "0 0.2em",
                  color: INK,
                }}
              >
                UI engineer
              </span>
              .
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative mt-8 w-fit -rotate-1"
          >
            <BrushStroke
              color="#FF6B35"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={1}
            />
            <p className="relative text-base sm:text-lg font-bold tracking-tight leading-[1.65] z-10 px-5 py-3" style={{ color: INK }}>
              I design and ship premium web products end-to-end —<br />
              polished interfaces, resilient APIs, and<br />
              animations that convert.<br />
              Trusted by founders worldwide.
            </p>
          </motion.div>

          {/* CTAs — solid, hard edges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: INK,
                color: BG,
                borderRadius: 4,
                boxShadow: `4px 4px 0 0 ${ORANGE}`,
              }}
            >
              View selected work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: BG,
                border: `2px solid ${INK}`,
                color: INK,
                borderRadius: 4,
              }}
            >
              Start a project
            </a>
          </motion.div>

          {/* terminal strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 inline-flex items-center gap-2.5 px-3.5 py-2 font-mono text-[12px] sm:text-[13px]"
            style={{
              backgroundColor: INK,
              color: BG,
              borderRadius: 4,
            }}
          >
            <Terminal className="w-3.5 h-3.5" style={{ color: ORANGE }} />
            <span style={{ color: "rgba(245,240,224,0.55)" }}>krish@web:~$</span>
            <span>npx krish-mishra</span>
            <span style={{ color: GOLD }}>{typedCmd} <motion.span style={{ color: "white" }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>▍</motion.span></span>
          </motion.div>

          {/* social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[ORANGE, STEEL, EMERALD, RUST].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 border-2"
                  style={{ backgroundColor: c, borderColor: BG, borderRadius: 4 }}
                />
              ))}
            </div>
            <div className="text-xs sm:text-sm">
              <div className="flex items-center gap-1" style={{ color: GOLD }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-0.5" style={{ color: MUTED }}>
                5.0 from 28+ clients
              </div>
            </div>
          </motion.div>
        </div>

        {/* ====== RIGHT — bento dashboard (desktop) ====== */}
        <div className="lg:col-span-5 hidden lg:block relative">
          <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[540px]">
            {/* big clock card — solid INK */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="col-span-4 row-span-3 p-5 relative overflow-hidden"
              style={{
                backgroundColor: INK,
                color: BG,
                borderRadius: 8,
              }}
            >
              <div
                aria-hidden
                className="absolute top-0 right-0 w-20 h-20"
                style={{ backgroundColor: ORANGE }}
              />
              <div
                aria-hidden
                className="absolute top-0 right-0 w-10 h-10"
                style={{ backgroundColor: GOLD }}
              />
              <div className="relative flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] font-mono opacity-70">
                  <MapPin className="w-3 h-3 inline mr-1.5" />
                  Indore, IN
                </span>
              </div>
              <div className="relative mt-10">
                <div className="font-display text-5xl font-bold tabular-nums leading-none">
                  {time}
                </div>
                <div className="text-xs mt-2 opacity-70 font-mono uppercase tracking-wider">
                  IST · shipping in real time
                </div>
              </div>
              <div className="relative mt-6 flex items-center gap-2">
                <span
                  className="w-2 h-2"
                  style={{ backgroundColor: ORANGE }}
                />
                <span className="text-xs opacity-90 font-mono uppercase tracking-wider">
                  Online · taking briefs
                </span>
              </div>
            </motion.div>

            {/* lighthouse tall — solid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              whileHover={{ y: -4 }}
              className="col-span-2 row-span-3 p-4 flex flex-col justify-between"
              style={{
                backgroundColor: ORANGE,
                color: INK,
                borderRadius: 8,
              }}
            >
              <div className="flex items-center justify-between">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">98</span>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-mono opacity-80">
                  Lighthouse
                </div>
                <div className="font-display text-4xl font-bold leading-none mt-1">
                  98<span className="text-lg opacity-70">/100</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden" style={{ backgroundColor: "rgba(20,32,26,0.18)", borderRadius: 2 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="h-full"
                    style={{ backgroundColor: INK }}
                  />
                </div>
                <div className="mt-2 text-[10px] font-mono uppercase tracking-wider opacity-80">
                  Avg / 12 ships
                </div>
              </div>
            </motion.div>

            {/* weather */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              whileHover={{ y: -4 }}
              className="col-span-2 row-span-2 p-3.5 flex flex-col justify-between"
              style={{
                backgroundColor: SURFACE,
                border: `1.5px solid ${INK}`,
                borderRadius: 8,
              }}
            >
              <CloudSun className="w-5 h-5" style={{ color: STEEL }} />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider font-mono" style={{ color: MUTED }}>
                  Weather
                </div>
                <div className="text-base font-display font-bold" style={{ color: INK }}>
                  28° Clear
                </div>
              </div>
            </motion.div>

            {/* stack */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              whileHover={{ y: -4 }}
              className="col-span-2 row-span-2 p-3.5 flex flex-col justify-between"
              style={{
                backgroundColor: STEEL,
                color: BG,
                borderRadius: 8,
              }}
            >
              <Cpu className="w-5 h-5" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider font-mono opacity-70">
                  Stack
                </div>
                <div className="text-sm font-semibold">
                  React · TS · Node
                </div>
              </div>
            </motion.div>

            {/* coffee */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              whileHover={{ y: -4 }}
              className="col-span-2 row-span-1 px-3.5 py-3 flex items-center gap-2.5"
              style={{
                backgroundColor: SURFACE_2,
                border: `1.5px solid ${INK}`,
                borderRadius: 8,
              }}
            >
              <Coffee className="w-4 h-4" style={{ color: RUST }} />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider font-mono" style={{ color: MUTED }}>
                  Fuel
                </div>
                <div className="text-[11px] font-semibold" style={{ color: INK }}>
                  Chai · 4 cups
                </div>
              </div>
            </motion.div>

            {/* command */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              whileHover={{ y: -4 }}
              className="col-span-4 row-span-1 px-3.5 py-3 flex items-center gap-2.5"
              style={{
                backgroundColor: INK,
                color: BG,
                borderRadius: 8,
              }}
            >
              <div
                className="w-7 h-7 flex items-center justify-center"
                style={{ backgroundColor: ORANGE, color: INK, borderRadius: 4 }}
              >
                <Hammer className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider font-mono opacity-60">
                  Shortcut
                </div>
                <div className="text-[11px] font-semibold">
                  ⌘K · open command palette
                </div>
              </div>
              <kbd
                className="text-[10px] font-mono px-1.5 py-0.5"
                style={{
                  backgroundColor: BG,
                  color: INK,
                  borderRadius: 3,
                }}
              >
                ⌘K
              </kbd>
            </motion.div>
          </div>
        </div>

        {/* ====== MOBILE bento (compact) ====== */}
        <div className="lg:hidden grid grid-cols-4 gap-2.5 mt-4">
          <div
            className="col-span-4 p-4 relative overflow-hidden"
            style={{
              backgroundColor: INK,
              color: BG,
              borderRadius: 8,
            }}
          >
            <div
              aria-hidden
              className="absolute top-0 right-0 w-14 h-14"
              style={{ backgroundColor: ORANGE }}
            />
            <div className="relative flex items-center justify-between text-[10px] uppercase tracking-widest font-mono opacity-70">
              <span><MapPin className="w-3 h-3 inline mr-1" />Indore, IN</span>
              <span>IST</span>
            </div>
            <div className="relative mt-2 font-display text-3xl font-bold tabular-nums">
              {time}
            </div>
          </div>
          {[
            { Icon: Cpu, label: "Stack", value: "React · TS", bg: STEEL, fg: BG },
            { Icon: Zap, label: "Lighthouse", value: "98 / 100", bg: ORANGE, fg: INK },
            { Icon: Coffee, label: "Fuel", value: "Chai", bg: SURFACE, fg: INK, border: true },
            { Icon: CloudSun, label: "Weather", value: "28° Clear", bg: SURFACE_2, fg: INK, border: true },
          ].map(({ Icon, label, value, bg, fg, border }, i) => (
            <div
              key={i}
              className="col-span-2 px-3 py-2.5 flex items-center gap-2"
              style={{
                backgroundColor: bg,
                color: fg,
                border: border ? `1.5px solid ${INK}` : "none",
                borderRadius: 8,
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              <div className="leading-tight min-w-0">
                <div className="text-[9px] uppercase tracking-wider font-mono opacity-70">
                  {label}
                </div>
                <div className="text-[11px] font-semibold truncate">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
