import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inHero, setInHero] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx;
    let ty = my;
    let raf = 0;
    let visible = true;

    const setVisible = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      const op = v ? "1" : "0";
      if (ref.current) ref.current.style.opacity = op;
      if (trailRef.current) trailRef.current.style.opacity = op;
    };

    const isInteractive = (el: Element | null) => {
      if (!el) return false;
      return !!el.closest(
        'a, button, input, textarea, select, label, [role="button"], [data-cursor="off"]',
      );
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Check if hero section is visible in viewport
      const heroSection = document.getElementById("hero");
      let inHeroSection = false;
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isHeroVisible = rect.top < window.innerHeight && rect.bottom > 0;
        inHeroSection =
          isHeroVisible &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
      }
      setInHero(inHeroSection);

      const target = document.elementFromPoint(mx, my);
      setVisible(!isInteractive(target) && inHeroSection);
      if (ref.current) {
        ref.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(inHero);

    const tick = () => {
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[1] h-[520px] w-[520px] rounded-full transition-opacity duration-200"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(45,122,95,0.12) 35%, rgba(255,255,255,0) 70%)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[2] h-40 w-40 rounded-full transition-opacity duration-200"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,200,0.45) 0%, rgba(201,168,76,0.18) 40%, rgba(255,255,255,0) 70%)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
