import SkillsGraph from "@/components/ui/SkillsGraph";
import CipherReveal from "@/components/ui/CipherReveal";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section
      id="sobre-mi"
      className="px-6 py-24 sm:px-16"
    >
      <Reveal>
        <h2 className="mb-12 font-display text-3xl font-semibold text-primary">
          <CipherReveal text="Sobre mí" />
        </h2>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* Bio — left column */}
          <div className="flex max-w-xl flex-col gap-4 text-secondary md:flex-1">
            <p>
              Analista en Sistemas de Información, cursando la Licenciatura
              en Sistemas de Información en{" "}
              <span className="text-primary font-medium">UADER</span>{" "}
              (Facultad de Ciencia y Tecnología, Concepción del Uruguay,
              Entre Ríos).
            </p>
            <p>
              Mi foco está en{" "}
              <span className="text-primary font-medium">backend</span>,{" "}
              <span className="text-primary font-medium">bases de datos</span> y{" "}
              <span className="text-primary font-medium">
                Business Intelligence
              </span>
              : diseñar la arquitectura que sostiene productos reales, desde
              la base de datos hasta el pipeline de datos.
            </p>
          </div>

          {/* Stack — right column */}
          <div className="md:flex-1">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-secondary">
              Stack
            </h3>
            <SkillsGraph />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
