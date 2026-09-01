"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed bottom-0 left-0 top-0 z-50 hidden w-[2px] bg-border-default md:block">
      <motion.div
        className="w-full h-full origin-top bg-accent"
        style={{ scaleY }}
        aria-hidden="true"
      />
    </div>
  );
}
