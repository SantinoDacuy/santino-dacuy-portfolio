import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function GameTeaser() {
  return (
    <section className="flex flex-col items-center gap-8 px-6 py-32 text-center sm:px-16">
      <Reveal className="flex flex-col items-center gap-8 text-center" width="fit-content">
        <p className="font-display text-xl font-medium text-secondary sm:text-2xl">
          ¿Pensaste que ya me habías conocido?
        </p>

        <Link
          href="/circuito"
          aria-label="Entrar al circuito interactivo"
          className="group relative flex items-center justify-center"
        >
          {/* The orb */}
          <div
            className="orb-glow animate-pulse-orb flex h-[130px] w-[130px] items-center justify-center rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, var(--color-accent-strong), var(--color-accent))",
            }}
          >
            <span className="text-sm font-medium tracking-wider text-primary uppercase opacity-80">
              Entrar
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
