import { motion } from "motion/react";
import { Send, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useState } from "react";
import { BrushStroke } from "./BrushStroke";

/* Hero-matching palette */
const BG = "#f5f0e0";
const SURFACE = "#fbf7ea";
const INK = "#14201a";
const ORANGE = "#e85d3a";
const GOLD = "#c9a84c";
const MUTED = "#5a5f5a";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden bg-grid-ink"
      style={{ backgroundColor: BG, color: INK }}
    >
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-14 max-w-2xl mx-auto"
        >
          <p
            className="text-xs sm:text-sm font-semibold mb-3 tracking-[0.2em] uppercase font-mono"
            style={{ color: ORANGE }}
          >
            — Get in touch
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-display"
            style={{ color: INK }}
          >
            Let's build something{" "}
            <span
              className="relative inline-block italic font-light"
              style={{ backgroundColor: GOLD, padding: "0 0.15em", color: INK }}
            >
              memorable
            </span>
            .
          </h2>
          <div className="relative mt-5 w-fit -rotate-1 mx-auto">
            <BrushStroke
              color="#3A86FF"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={8}
            />
            <p
              className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3"
              style={{ color: BG }}
            >
              Need a website,
              <br />
              that actually stands out?
              <br />
              Let's make it happen.
            </p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3000);
          }}
          className="p-6 sm:p-10 grid gap-5"
          style={{
            backgroundColor: SURFACE,
            border: `1.5px solid ${INK}`,
            borderRadius: 10,
            boxShadow: `6px 6px 0 0 ${INK}`,
          }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="grid gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-wider font-mono"
                style={{ color: MUTED }}
              >
                Name
              </span>
              <input
                required
                className="px-4 py-3 outline-none transition-all duration-200"
                placeholder="Jane Doe"
                style={{
                  backgroundColor: BG,
                  border: `1.5px solid ${INK}`,
                  borderRadius: 6,
                  color: INK,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = ORANGE;
                  e.currentTarget.style.boxShadow = `3px 3px 0 0 ${ORANGE}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = INK;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </label>
            <label className="grid gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-wider font-mono"
                style={{ color: MUTED }}
              >
                Email
              </span>
              <input
                required
                type="email"
                className="px-4 py-3 outline-none transition-all duration-200"
                placeholder="jane@studio.com"
                style={{
                  backgroundColor: BG,
                  border: `1.5px solid ${INK}`,
                  borderRadius: 6,
                  color: INK,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = ORANGE;
                  e.currentTarget.style.boxShadow = `3px 3px 0 0 ${ORANGE}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = INK;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider font-mono"
              style={{ color: MUTED }}
            >
              Project details
            </span>
            <textarea
              required
              rows={5}
              className="px-4 py-3 outline-none transition-all duration-200 resize-none"
              placeholder="Tell me about your idea, timeline, and goals…"
              style={{
                backgroundColor: BG,
                border: `1.5px solid ${INK}`,
                borderRadius: 6,
                color: INK,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = ORANGE;
                e.currentTarget.style.boxShadow = `3px 3px 0 0 ${ORANGE}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = INK;
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </label>

          <button
            type="submit"
            className="brut-cta group justify-self-start inline-flex items-center gap-2 px-7 py-3.5 font-semibold"
          >
            {sent ? "Message sent ✓" : "Send message"}
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>

        {/* social links & footer */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            {[
              { Icon: Github, href: "https://github.com/KrrishSR4", label: "GitHub" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Twitter, href: "#", label: "Twitter" },
              { Icon: Mail, href: "mailto:krishmishra4444@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                aria-label={label}
                whileHover={{ y: -3 }}
                className="w-11 h-11 flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: SURFACE,
                  border: `1.5px solid ${INK}`,
                  borderRadius: 6,
                  color: INK,
                  boxShadow: `3px 3px 0 0 ${INK}`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = INK;
                  el.style.color = BG;
                  el.style.boxShadow = `3px 3px 0 0 ${ORANGE}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = SURFACE;
                  el.style.color = INK;
                  el.style.boxShadow = `3px 3px 0 0 ${INK}`;
                }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
          <p className="text-xs sm:text-sm" style={{ color: MUTED }}>
            © {new Date().getFullYear()} Krish Mishra — Crafted with care.
          </p>
        </div>
      </div>
    </section>
  );
}
