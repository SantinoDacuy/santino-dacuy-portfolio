import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ParallaxGallery } from "@/components/sections/ParallaxGallery";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="flex w-full flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <Hero />
          <About />
        </div>
        <ParallaxGallery />
        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <Projects />
          <Contact />
        </div>
      </main>
    </>
  );
}
