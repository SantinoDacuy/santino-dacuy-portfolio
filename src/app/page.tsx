import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { GameTeaser } from "@/components/sections/GameTeaser";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col">
      <Hero />
      <About />
      <Projects />
      <GameTeaser />
      <Contact />
    </main>
  );
}
