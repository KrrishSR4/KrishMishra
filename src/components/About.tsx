import { motion } from "motion/react";
import { BrushStroke } from "./BrushStroke";

const timeline = [
  {
    year: "2023",
    title: "Started Programming Journey",
    desc: "Built my first websites, explored frontend development, and discovered a passion for creating digital experiences.",
  },
  {
    year: "2024",
    title: "Full Stack Development",
    desc: "Expanded into backend development, databases, and modern web application architecture.",
  },
  {
    year: "2025",
    title: "Portfolio & Personal Brand",
    desc: "Focused on building a strong portfolio, refining design skills, and showcasing real-world projects.",
  },
  {
    year: "2026",
    title: "Freelance Web Developer",
    desc: "Helping businesses and founders build fast, modern, and user-focused web experiences.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-32"
        >
          <p className="text-xs sm:text-sm font-semibold text-emerald mb-3 tracking-[0.2em] uppercase">
            — About Krish
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Freelance Full Stack Developer Portfolio
            <br />
            <span className="text-emerald italic font-light">Turning ideas</span> into shipped
            products.
          </h2>
          <div className="relative mt-7 w-fit -rotate-1">
            <BrushStroke
              color="#0F172A"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.2] sm:scale-125"
              seed={2}
            />
            <p
              className="relative text-sm sm:text-base font-bold tracking-tight leading-[1.65] z-10 px-5 py-3"
              style={{ color: "#f5f0e0" }}
            >
              I build modern websites,
              <br />
              web applications and digital
              <br />
              experiences focused on speed,
              <br />
              usability and business growth.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: "23+", l: "Projects" },
              { n: "15+", l: "Clients" },
              { n: "100%", l: "On-Time Delivery" },
            ].map((s) => (
              <motion.div
                key={s.l}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="bg-card border border-border rounded-2xl p-4 shadow-soft cursor-default"
              >
                <div className="text-2xl sm:text-3xl font-display font-bold text-emerald">
                  {s.n}
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          <ul className="space-y-8 sm:space-y-10">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 6 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 340, damping: 26, delay: i * 0.08 }}
                className="relative pl-10 cursor-default"
              >
                <motion.span
                  whileInView={{ scale: [0, 1.3, 1] }}
                  whileHover={{ scale: 1.25 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.1 }}
                  className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gold border-2 border-background shadow-soft"
                />
                <div className="text-xs font-semibold text-emerald mb-1 tracking-wider">
                  {t.year}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{t.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
