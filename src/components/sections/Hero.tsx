import { Reveal } from "@/components/ui/Reveal";
import HeroTypewriter from "./HeroTypewriter";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroParticles from "@/components/circuit/HeroParticles";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[80vh] flex-col-reverse items-center justify-center gap-12 px-6 py-20 sm:px-16 md:flex-row md:gap-16 bg-background overflow-hidden"
    >
      <HeroParticles />
      
      {/* Subtle purple glow behind the content */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Reveal className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left z-10 w-full" width="fit-content">
        {/* Eyebrow */}
        <div className="mb-4 flex flex-col w-full">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Software Engineer
          </span>
          <span className="mt-1 text-base text-secondary">Santino</span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl md:text-6xl w-full">
          No juzgues un sistema{" "}
          <br className="hidden sm:block" />
          <span className="text-accent-strong">por su interfaz.</span>
        </h1>

        {/* Subtitle */}
        <p className="mb-4 max-w-xl text-lg text-secondary w-full">
          Backend, bases de datos y Business Intelligence — construyo lo
          que no se ve, pero sostiene todo.
        </p>

        {/* SQL Terminal */}
        <div className="w-full flex justify-center md:justify-start">
          <HeroTypewriter />
        </div>

        {/* CTA */}
        <div className="mt-10 w-full">
          <MagneticButton>
            <a
              href="#proyectos"
              className="glow inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-medium text-primary transition-all hover:bg-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver proyectos
            </a>
          </MagneticButton>
        </div>
      </Reveal>

      {/* Avatar placeholder */}
      <Reveal width="fit-content" className="z-10 flex-shrink-0">
        {/* TODO: Reemplazar este placeholder por el avatar/foto final */}
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-3 rounded-full opacity-50 blur-xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-surface-alt shadow-lg shadow-accent/20 ring-1 ring-inset ring-white/5">
            <span className="text-sm text-secondary font-medium">Foto</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
