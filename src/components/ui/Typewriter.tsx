"use client";

import { useState, useEffect } from "react";

type Props = {
  lines: string[];
  speed?: number;
};

export default function Typewriter({ lines, speed = 40 }: Props) {
  const fullText = lines.join("\n");
  const [displayed, setDisplayed] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(fullText);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayed(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed, prefersReducedMotion]);

  return (
    <div className="mt-6 w-full max-w-lg overflow-hidden rounded-lg border border-border-default bg-surface">
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 border-b border-border-default px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>

      {/* Terminal body */}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-secondary sm:text-sm">
        <code>{displayed}</code>
        <span className="inline-block w-[6px] animate-pulse bg-accent align-middle">
          &nbsp;
        </span>
      </pre>
    </div>
  );
}
