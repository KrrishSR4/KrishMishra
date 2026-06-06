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
  { q: "What's your typical project timeline?", a: "Most websites take 1–3 weeks, while larger web applications can take 4–8 weeks depending on features, feedback cycles and project scope." },
  { q: "Do you work solo or with a team?", a: "I primarily work independently and handle design, development and deployment. For specialized requirements, I can collaborate with trusted professionals when needed." },
  { q: "How do you price projects?", a: "Pricing depends on the project scope, complexity and timeline. After understanding your requirements, I provide a clear fixed-price or milestone-based proposal." },
  { q: "Will I own the code and assets?", a: "Yes. Once the project is completed and payment is settled, you receive full ownership of the code, assets and project deliverables." },
  { q: "Do you offer post-launch support?", a: "Yes. I provide post-launch support for bug fixes, updates and improvements to ensure everything runs smoothly after launch." },
  { q: "What technologies do you work with?", a: "I work primarily with React, Next.js, TypeScript, Node.js, Tailwind CSS and modern web technologies to build fast and reliable digital products." },
  { q: "Can you redesign an existing website?", a: "Yes. I can improve the design, performance, user experience and overall functionality of existing websites while preserving important content and features." },
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
