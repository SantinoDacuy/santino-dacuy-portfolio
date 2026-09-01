"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Props = {
  text: string;
  className?: string;
};

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*&%";

export default function CipherReveal({ text, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayedText, setDisplayedText] = useState(text);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (isReducedMotion || !isInView) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iterations) return text[index];
            if (char === " ") return " ";
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3; // Controls the speed of decryption
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text, isReducedMotion]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={!isReducedMotion ? { opacity: 0, y: 10 } : {}}
      animate={!isReducedMotion && isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
    </motion.span>
  );
}
