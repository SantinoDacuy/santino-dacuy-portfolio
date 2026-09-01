"use client";

import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("@/components/ui/Typewriter"), {
  ssr: false,
});

const SQL_LINES = [
  "SELECT skill FROM santino WHERE stack = 'backend';",
  "-- Python, Node.js, PostgreSQL, MongoDB, Redis, Docker",
];

export default function HeroTypewriter() {
  return <Typewriter lines={SQL_LINES} speed={35} />;
}
