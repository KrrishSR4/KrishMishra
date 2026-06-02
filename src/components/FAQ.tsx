import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { BrushStroke } from "./BrushStroke";

/* Hero-matching palette */
const BG = "#f5f0e0";
const SURFACE = "#fbf7ea";
const INK = "#14201a";
const ORANGE = "#e85d3a";
const GOLD = "#c9a84c";
const MUTED = "#5a5f5a";

const faqs = [
  { q: "What's your typical project timeline?", a: "Most landing pages ship in 1–2 weeks. Full web apps and SaaS MVPs take 4–8 weeks depending on scope. You'll get a fixed timeline before we start." },
  { q: "Do you work solo or with a team?", a: "I run lead on every project. For bigger builds I bring in a trusted pod — a designer, a backend engineer, and a QA — that I've shipped with for years." },
  { q: "How do you price projects?", a: "Fixed-scope quotes for one-off projects. Monthly retainers from $3.5k for ongoing work. Equity/cash splits possible for vetted seed-stage founders." },
  { q: "Will I own the code?", a: "100%. You get a clean GitHub repo, full documentation, and a one-hour handoff call. No vendor lock-in, no proprietary plugins." },
  { q: "Do you offer post-launch support?", a: "Every project includes 30 days of free post-launch polish. After that, retainers start at $1.5k/mo for maintenance, bug fixes, and small features." },
  { q: "Where are you based & do you travel?", a: "Based in India, working with founders across US, EU and APAC. Async-first with overlapping live hours scheduled weekly. Happy to fly out for kickoffs." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 overflow-hidden bg-grid-ink"
      style={{ backgroundColor: BG, color: INK }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <p
            className="text-xs sm:text-sm font-semibold mb-3 tracking-[0.2em] uppercase font-mono"
            style={{ color: ORANGE }}
          >
            — Frequently asked
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] font-display"
            style={{ color: INK }}
          >
            Answered before you{" "}
            <span
              className="italic font-light relative inline-block"
              style={{ backgroundColor: GOLD, padding: "0 0.15em", color: INK }}
            >
              ask
            </span>
            .
          </h2>
          <div className="relative mt-5 w-fit rotate-1 mb-7">
            <BrushStroke
              color="#FF006E"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={7}
            />
            <p className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3" style={{ color: BG }}>
              Didn't find what you needed?<br />
              Let's clear it up.
            </p>
          </div>
          <a
            href="#contact"
            className="brut-cta mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
          >
            Ask anything →
          </a>
        </motion.div>

        <div className="lg:col-span-7 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: SURFACE,
                  border: `1.5px solid ${INK}`,
                  borderRadius: 10,
                  boxShadow: isOpen ? `5px 5px 0 0 ${ORANGE}` : `3px 3px 0 0 ${INK}`,
                  transform: isOpen ? "translate(-2px, -2px)" : "translate(0, 0)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full px-5 sm:px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span
                    className="font-display font-semibold text-base sm:text-lg"
                    style={{ color: INK }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="shrink-0 w-9 h-9 flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? INK : BG,
                      color: isOpen ? BG : INK,
                      border: `1.5px solid ${INK}`,
                      borderRadius: 4,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-5 sm:px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {f.a}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
