const stack = [
  "Python",
  "Node.js / Express",
  "Flask",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
];

// TODO: sumar foto/avatar y bio final una vez definidos.
export function About() {
  return (
    <section id="sobre-mi" className="flex flex-col gap-6 px-6 py-24 sm:px-16">
      <h2 className="text-2xl font-semibold tracking-tight">Sobre mí</h2>
      <p className="max-w-2xl text-zinc-500">
        Analista en Sistemas de Información, cursando Licenciatura en Sistemas
        de Información en UADER. Foco en backend, bases de datos y
        Business Intelligence.
      </p>
      <ul className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
