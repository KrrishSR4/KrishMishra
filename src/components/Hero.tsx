import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Zap,
  MapPin,
  Terminal,
  Layers,
  Calendar,
  MessageCircle,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const buildStack = [
  { name: "React", role: "UI" },
  { name: "TypeScript", role: "Types" },
  { name: "Next.js", role: "SSR" },
  { name: "Node.js", role: "API" },
  { name: "Tailwind", role: "CSS" },
  { name: "Postgres", role: "Data" },
  { name: "Motion", role: "UX" },
  { name: "Cloudflare", role: "Edge" },
] as const;
import { BrushStroke } from "./BrushStroke";

/* ------------------------------------------------------------- *
 *  HERO — Solid colors, bold, engineer / "boys" feel.            *
 *  No gradients. Hard edges. Industrial accents.                 *
 * ------------------------------------------------------------- */

const BG = "#f5f0e0"; // cream
const SURFACE = "#fbf7ea"; // light cream card
const SURFACE_2 = "#ece5d0"; // deeper cream
const BORDER = "#14201a"; // hard ink border
const SOFT_BORDER = "rgba(20,32,26,0.12)";
const INK = "#14201a"; // near-black
const TEXT = "#14201a";
const MUTED = "#5a5f5a";
const ORANGE = "#e85d3a"; // bold accent
const STEEL = "#2d3a45"; // deep steel blue
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
  const now = useClock();
  // Render time only after the client has set it to avoid hydration mismatches.
  const time = now
    ? now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
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
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 sm:pt-32 bg-grid-ink"
      style={{ backgroundColor: BG, color: TEXT }}
    >
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
            <p
              className="relative text-base sm:text-lg font-bold tracking-tight leading-[1.65] z-10 px-5 py-3"
              style={{ color: INK }}
            >
              I design and ship premium web products end-to-end —<br />
              polished interfaces, resilient APIs, and
              <br />
              animations that convert.
              <br />
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
            <span style={{ color: GOLD }}>
              {typedCmd}{" "}
              <motion.span
                style={{ color: "white" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ▍
              </motion.span>
            </span>
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
              className="col-span-4 row-span-3 p-5 relative overflow-hidden transition-all duration-300 cursor-default"
              style={{
                backgroundColor: INK,
                color: BG,
                borderRadius: 8,
                borderTop: `2px solid ${ORANGE}`,
                borderLeft: `2px solid ${ORANGE}`,
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
              <div className="relative flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] font-mono opacity-70">
                  <MapPin className="w-3 h-3 inline mr-1.5" />
                  Raipur, In
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
                <span className="w-2 h-2" style={{ backgroundColor: ORANGE }} />
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
              className="col-span-2 row-span-3 p-4 flex flex-col justify-between transition-all duration-300 cursor-default"
              style={{
                backgroundColor: ORANGE,
                color: INK,
                borderRadius: 8,
                boxShadow: `5px 5px 0 0 ${INK}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${INK}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${INK}`;
              }}
            >
              <div className="flex items-center justify-between">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  98
                </span>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-mono opacity-80">
                  Lighthouse
                </div>
                <div className="font-display text-4xl font-bold leading-none mt-1">
                  98<span className="text-lg opacity-70">/100</span>
                </div>
                <div
                  className="mt-3 h-2 w-full overflow-hidden"
                  style={{ backgroundColor: "rgba(20,32,26,0.18)", borderRadius: 2 }}
                >
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

            {/* build stack — what clients actually get */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="col-span-4 row-span-2 p-4 flex flex-col transition-all duration-300 cursor-default"
              style={{
                backgroundColor: STEEL,
                color: BG,
                borderRadius: 8,
                boxShadow: `5px 5px 0 0 ${INK}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${ORANGE}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${INK}`;
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <Layers className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  Build stack
                </span>
              </div>
              <p className="text-[11px] font-mono opacity-80 mt-2 leading-snug">
                Modern tools I ship with — UI, APIs &amp; deploy included.
              </p>
              <div className="mt-3 grid grid-cols-4 gap-1.5 flex-1 content-start">
                {buildStack.map((t) => (
                  <div
                    key={t.name}
                    className="px-1.5 py-1.5 text-center"
                    style={{
                      backgroundColor: "rgba(245,240,224,0.12)",
                      borderRadius: 4,
                      border: "1px solid rgba(245,240,224,0.2)",
                    }}
                  >
                    <div className="text-[10px] font-semibold leading-tight">{t.name}</div>
                    <div className="text-[8px] font-mono uppercase opacity-60 mt-0.5">{t.role}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* typical delivery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="col-span-2 row-span-2 p-4 flex flex-col justify-between transition-all duration-300 cursor-default"
              style={{
                backgroundColor: SURFACE,
                border: `1.5px solid ${INK}`,
                borderRadius: 8,
                color: INK,
                boxShadow: `5px 5px 0 0 ${INK}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${INK}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${INK}`;
              }}
            >
              <Calendar className="w-5 h-5" style={{ color: ORANGE }} />
              <div className="leading-tight">
                <div
                  className="text-[10px] uppercase tracking-wider font-mono"
                  style={{ color: MUTED }}
                >
                  Average Delivery
                </div>
                <div className="font-display text-3xl font-bold leading-none mt-1">
                  1–3<span className="text-lg font-semibold"> weeks</span>
                </div>
                <div className="text-[10px] font-mono mt-2" style={{ color: MUTED }}>
                  Landing · SaaS · product sites
                </div>
              </div>
            </motion.div>

            {/* reply time */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="col-span-2 row-span-1 px-3.5 py-3 flex items-center gap-2.5 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: SURFACE_2,
                border: `1.5px solid ${INK}`,
                borderRadius: 8,
                color: INK,
                boxShadow: `5px 5px 0 0 ${INK}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${INK}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${INK}`;
              }}
            >
              <MessageCircle className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />
              <div className="leading-tight min-w-0">
                <div
                  className="text-[10px] uppercase tracking-wider font-mono"
                  style={{ color: MUTED }}
                >
                  Quick Replies
                </div>
                <div className="text-[11px] font-semibold">Within 24h</div>
              </div>
            </motion.div>

            {/* shipped */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="col-span-2 row-span-1 px-3.5 py-3 flex items-center gap-2.5 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: GOLD,
                color: INK,
                borderRadius: 8,
                border: `1.5px solid ${INK}`,
                boxShadow: `5px 5px 0 0 ${INK}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${INK}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${INK}`;
              }}
            >
              <Rocket className="w-4 h-4 shrink-0" />
              <div className="leading-tight min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-mono opacity-80">
                  Delivered
                </div>
                <div className="text-[11px] font-bold">23+ projects shipped</div>
              </div>
            </motion.div>

            {/* ownership */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.56 }}
              className="col-span-2 row-span-1 px-3.5 py-3 flex items-center gap-2.5 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: INK,
                color: BG,
                borderRadius: 8,
                borderTop: `2px solid ${ORANGE}`,
                borderLeft: `2px solid ${ORANGE}`,
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
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />
              <div className="leading-tight min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-mono opacity-60">
                  Deliverables
                </div>
                <div className="text-[11px] font-semibold">
                  100% Yours <span style={{ color: "#e63946" }}>♥</span>
                </div>
              </div>
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
            <div className="relative flex items-center justify-between text-[10px] uppercase tracking-widest font-mono opacity-70">
              <span>
                <MapPin className="w-3 h-3 inline mr-1" />
                Raipur, In
              </span>
              <span>IST</span>
            </div>
            <div className="relative mt-2 font-display text-3xl font-bold tabular-nums">{time}</div>
          </div>
          {[
            {
              Icon: Layers,
              label: "Build stack",
              value: "React · TypeScript · Next.js · Node",
              bg: STEEL,
              fg: BG,
              span: "col-span-4",
              hover: ORANGE,
            },
            {
              Icon: Zap,
              label: "Lighthouse",
              value: "98 / 100",
              bg: ORANGE,
              fg: INK,
              span: "col-span-2",
              hover: INK,
            },
            {
              Icon: Calendar,
              label: "Delivery",
              value: "1–3 weeks",
              bg: SURFACE,
              fg: INK,
              border: true,
              span: "col-span-2",
              hover: INK,
            },
            {
              Icon: MessageCircle,
              label: "Replies",
              value: "Within 24h",
              bg: SURFACE_2,
              fg: INK,
              border: true,
              span: "col-span-2",
              hover: INK,
            },
            {
              Icon: Rocket,
              label: "Delivered",
              value: "23+ projects shipped",
              bg: GOLD,
              fg: INK,
              span: "col-span-2",
              hover: INK,
            },
            {
              Icon: ShieldCheck,
              label: "Deliverables",
              value: "100% Yours",
              bg: INK,
              fg: BG,
              span: "col-span-2",
              hover: INK,
            },
          ].map(({ Icon, label, value, bg, fg, border, span, hover }, i) => (
            <motion.div
              key={i}
              className={`${span} min-h-16 px-3 py-3 flex items-center gap-2.5 transition-all duration-300 cursor-default`}
              style={{
                backgroundColor: bg,
                color: fg,
                border: border ? `1.5px solid ${INK}` : "none",
                borderRadius: 8,
                boxShadow: `5px 5px 0 0 ${INK}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `9px 9px 0 0 ${hover}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `5px 5px 0 0 ${INK}`;
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              <div className="leading-tight min-w-0">
                <div className="text-[9px] uppercase tracking-wider font-mono opacity-70">
                  {label}
                </div>
                <div className="text-[11px] font-semibold leading-tight">{value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
