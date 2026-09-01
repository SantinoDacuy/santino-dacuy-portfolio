"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const CircuitScene = dynamic(
  () => import("@/components/circuit/CircuitScene"),
  { ssr: false }
);

export default function Circuito() {
  return (
    <main className="relative h-screen w-screen bg-background">
      {/* Back to home button — HTML overlay on top of canvas */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 rounded-full border border-border-default bg-surface px-4 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        ← Volver
      </Link>

      {/* Controls hint */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-border-default bg-surface/80 px-4 py-2 text-xs text-secondary backdrop-blur-sm">
        WASD o flechas para moverte
      </div>

      <CircuitScene />
    </main>
  );
}
