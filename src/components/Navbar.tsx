import { motion } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

/* Hero-matching palette */
const BG = "#f5f0e0";
const SURFACE = "#fbf7ea";
const INK = "#14201a";
const ORANGE = "#e85d3a";
const GOLD = "#c9a84c";
const MUTED = "#5a5f5a";

const links = [
  { href: "#hero", id: "hero", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Stack" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#process", id: "process", label: "Process" },
  { href: "#projects", id: "projects", label: "Work" },
  { href: "#faq", id: "faq", label: "FAQ" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((l) => l.id));

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1040px)]"
    >
      <nav
        className="pl-5 pr-2 py-2 flex items-center justify-between"
        style={{
          backgroundColor: `${SURFACE}e0`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1.5px solid ${INK}`,
          borderRadius: 6,
          boxShadow: `3px 3px 0 0 ${INK}`,
        }}
      >
        <a href="#hero" className="nav-brand">
          <span className="nav-brand-krish">Krish</span>
          <span className="nav-brand-mishra"> Mishra</span>
        </a>

        <ul className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative px-3 py-2 transition-colors"
                  style={{
                    color: isActive ? INK : MUTED,
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = MUTED;
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0"
                      style={{
                        backgroundColor: `${INK}10`,
                        borderRadius: 4,
                        border: `1px solid ${INK}20`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="brut-cta hidden sm:inline-flex text-xs font-semibold px-4 py-2.5"
          >
            Let's Build →
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Menu"
            style={{
              backgroundColor: INK,
              color: BG,
              borderRadius: 4,
            }}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="lg:hidden overflow-hidden mt-2"
      >
        <ul
          className="p-2 flex flex-col"
          style={{
            backgroundColor: SURFACE,
            border: `1.5px solid ${INK}`,
            borderRadius: 8,
            boxShadow: `4px 4px 0 0 ${INK}`,
          }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3 text-sm font-medium transition-colors"
                style={{
                  color: active === l.id ? INK : MUTED,
                  backgroundColor: active === l.id ? `${INK}08` : "transparent",
                  borderRadius: 6,
                  fontWeight: active === l.id ? 700 : 500,
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="brut-cta block px-5 py-3 text-sm font-semibold text-center mt-1"
            >
              Let's Build →
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
