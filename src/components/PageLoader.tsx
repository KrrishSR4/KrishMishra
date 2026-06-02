import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Loader2, Terminal } from "lucide-react";

const BG = "#f5f0e0";
const INK = "#14201a";
const ORANGE = "#e85d3a";
const CREAM = "#f5f0e0";
const MIN_MS = 2200;
const EXIT_DELAY_MS = 320;

const stack = ["React", "TypeScript", "Next.js", "Node", "Tailwind", "Motion"];

const tasks = [
  { label: "Initializing design system", ms: "120ms", at: 18 },
  { label: "Loading components", ms: "210ms", at: 38 },
  { label: "Compiling experience", ms: "180ms", at: 58 },
  { label: "Preparing showcase", ms: "145ms", at: 78 },
  { label: "Launching portfolio", ms: null, at: 100 },
];

type PageLoaderProps = {
  onComplete: () => void;
};

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = Date.now();
    const timers: number[] = [];
    let ready = false;

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    };

    schedule(() => setProgress(18), 180);
    schedule(() => setProgress(38), 420);
    schedule(() => setProgress(49), 680);
    schedule(() => setProgress(70), 1750);

    const finish = () => {
      if (!ready) return;
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      schedule(() => {
        setProgress(100);
        schedule(() => setExiting(true), EXIT_DELAY_MS);
      }, wait);
    };

    const done = () => {
      ready = true;
      finish();
    };

    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", done);
    };
  }, []);

  const handleExitEnd = () => {
    document.body.style.overflow = "";
    onComplete();
  };

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence onExitComplete={handleExitEnd}>
      {!exiting && (
        <motion.div
          key="loader"
          className="page-loader"
          style={{ backgroundColor: BG }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="page-loader__grid" aria-hidden />

          <motion.div
            className="page-loader__shell"
            style={{ boxShadow: `10px 10px 0 0 ${ORANGE}` }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="page-loader__title-wrap">
              <motion.div
                className="page-loader__title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <span style={{ color: INK }}>Krish </span>
                <span style={{ color: ORANGE }}>Mishra</span>
              </motion.div>
            </div>
            <p className="page-loader__tagline font-mono uppercase">
              Full-stack dev &amp; UI engineer
            </p>

            {/* stack */}
            <div className="page-loader__stack">
              <span className="page-loader__stack-label font-mono uppercase">Stack</span>
              <div className="page-loader__chips">
                {stack.map((t, i) => (
                  <motion.span
                    key={t}
                    className="page-loader__chip font-mono uppercase"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* terminal — middle */}
            <div
              className="page-loader__terminal"
              style={{ backgroundColor: INK, color: CREAM, borderColor: INK }}
            >
              <div className="page-loader__prompt font-mono">
                <span style={{ color: ORANGE }}>{">"}</span> npm run portfolio
              </div>
              <div className="page-loader__divider" aria-hidden />

              <ul className="page-loader__tasks font-mono">
                {tasks.map((task, i) => {
                  const done = pct >= task.at;
                  const active = !done && (i === 0 || pct >= tasks[i - 1]!.at);

                  return (
                    <li key={task.label} className="page-loader__task">
                      <span className="page-loader__task-icon">
                        {done ? (
                          <Check
                            className="w-3.5 h-3.5"
                            style={{ color: "#4ade80" }}
                            strokeWidth={3}
                          />
                        ) : active ? (
                          <Loader2
                            className="w-3.5 h-3.5 animate-spin"
                            style={{ color: ORANGE }}
                          />
                        ) : (
                          <span className="page-loader__task-pending" />
                        )}
                      </span>
                      <span className={done || active ? "opacity-100" : "opacity-35"}>
                        {task.label}
                        {active && !done && "…"}
                      </span>
                      {task.ms && (
                        <span className="page-loader__task-ms opacity-40">{task.ms}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* loading bar — bottom */}
            <div className="page-loader__footer">
              <div className="page-loader__bar-row">
                <div className="page-loader__bar-track">
                  <motion.div
                    className="page-loader__bar-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </div>
                <span className="page-loader__pct font-mono tabular-nums">{pct}%</span>
              </div>
              <p className="page-loader__footer-text font-mono uppercase">
                <Terminal
                  className="w-3.5 h-3.5 inline-block mr-1.5 -mt-px"
                  style={{ color: ORANGE }}
                />
                Building something awesome…
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
