import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

/* Hero-matching palette */
const BG = "#f5f0e0";
const INK = "#14201a";
const ORANGE = "#e85d3a";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollUp}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: hovered ? ORANGE : INK,
            color: BG,
            borderRadius: 4,
            border: `2px solid ${INK}`,
            boxShadow: hovered
              ? `5px 5px 0 0 ${INK}`
              : `3px 3px 0 0 ${ORANGE}`,
            transform: hovered ? "translate(-2px, -2px)" : "translate(0, 0)",
            transition: "all 0.2s ease",
          }}
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
