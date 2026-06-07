import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Github, LoaderCircle, Mail, MessageCircle, Send } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (res.ok && data.success) {
        form.reset();
        setSent(true);
      } else {
        setError(data.error || `Unable to send your message. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setError(
        error instanceof Error
          ? `Unable to send your message: ${error.message}`
          : "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, layout: { duration: 0.45, ease: "easeInOut" } }}
          className="relative overflow-hidden"
          style={{
            backgroundColor: SURFACE,
            border: `1.5px solid ${INK}`,
            borderRadius: 10,
            boxShadow: `6px 6px 0 0 ${INK}`,
          }}
        >
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="contact-form"
                action="/api/contact"
                method="POST"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                onSubmit={handleSubmit}
                className="p-6 sm:p-10 grid gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { label: "Name", name: "name", type: "text", required: true, placeholder: "Jane Doe" },
                    { label: "Email", name: "email", type: "email", required: true, placeholder: "jane@studio.com" },
                    { label: "WhatsApp no. (optional)", name: "whatsapp", type: "tel", required: false, placeholder: "+91 98765 43210" },
                    { label: "Budget (optional)", name: "budget", type: "text", required: false, placeholder: "Your range" },
                  ].map((field) => (
                    <label key={field.name} className="grid gap-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider font-mono"
                        style={{ color: MUTED }}
                      >
                        {field.label}
                      </span>
                      <input
                        required={field.required}
                        type={field.type}
                        name={field.name}
                        className="px-4 py-3 outline-none transition-all duration-200"
                        placeholder={field.placeholder}
                        disabled={isSubmitting}
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
                  ))}
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
                    name="message"
                    className="px-4 py-3 outline-none transition-all duration-200 resize-none"
                    placeholder="Tell me about your idea, timeline, and goals…"
                    disabled={isSubmitting}
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

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="brut-cta group justify-self-start inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold disabled:cursor-wait disabled:opacity-80"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                    {isSubmitting ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                  <AnimatePresence>
                    {error ? (
                      <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="text-sm font-medium"
                        style={{ color: ORANGE }}
                      >
                        {error}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="min-h-[420px] p-8 sm:p-12 flex items-center justify-center"
              >
                <div className="max-w-md text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -18 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.12 }}
                    className="mx-auto mb-6 w-16 h-16 flex items-center justify-center"
                    style={{
                      backgroundColor: "#dff4e5",
                      border: `2px solid ${INK}`,
                      borderRadius: 999,
                      boxShadow: `4px 4px 0 0 ${INK}`,
                      color: "#17803d",
                    }}
                  >
                    <CheckCircle2 className="w-9 h-9" />
                  </motion.div>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ color: INK }}>
                    Thanks for reaching out.
                  </h3>
                  <p className="text-base sm:text-lg leading-8" style={{ color: MUTED }}>
                    I've received your inquiry and
                    <br />
                    will get back to you shortly
                    <br />
                    to discuss the next steps.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* social links & footer */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            {[
              { Icon: Github, href: "https://github.com/KrrishSR4", label: "GitHub" },
              { Icon: Mail, href: "mailto:krishmishra4444@gmail.com", label: "Email" },
              { Icon: MessageCircle, href: "https://wa.me/919304767761", label: "WhatsApp" },
            ].map(({ Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
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
            © 2026 Krish Mishra — Designing & building for the web.
          </p>
        </div>
      </div>
    </section>
  );
}
