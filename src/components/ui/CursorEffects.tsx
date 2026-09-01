"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

/* ── Detect capabilities ── */
function usePointerCapabilities() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setHasFinePointer(window.matchMedia("(pointer: fine)").matches);
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return { hasFinePointer, prefersReducedMotion };
}

/* ── Custom cursor ── */
function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (target) {
        const isLink = target.tagName === "A";
        setHoverText(isLink ? "Ver" : "Abrir");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (target) setHoverText(null);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [mouseX, mouseY]);

  const isExpanded = hoverText !== null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: isExpanded ? 64 : 10,
        height: isExpanded ? 64 : 10,
        backgroundColor: isExpanded
          ? "rgba(139, 92, 246, 0.15)"
          : "var(--color-accent)",
        border: isExpanded ? "1px solid var(--color-accent)" : "none",
        transition: "width 200ms, height 200ms, background-color 200ms",
      }}
    >
      <AnimatePresence>
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] font-medium text-accent select-none"
          >
            {hoverText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Spotlight ── */
function Spotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-30"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, var(--color-accent-glow), transparent 60%)`,
      }}
      aria-hidden="true"
    />
  );
}

/* ── Main export ── */
export default function CursorEffects() {
  const { hasFinePointer, prefersReducedMotion } = usePointerCapabilities();

  if (!hasFinePointer || prefersReducedMotion) return null;

  return (
    <>
      <CustomCursor />
      <Spotlight />
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
