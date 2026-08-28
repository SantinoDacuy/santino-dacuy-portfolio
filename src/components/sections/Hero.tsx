// TODO: reemplazar por el diseño final definido en Figma (paleta oscura/morada, avatar, CTA).
export function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-[70vh] flex-col items-start justify-center gap-4 px-6 sm:px-16"
    >
      <p className="text-sm text-zinc-500">Santino</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Software Engineer
      </h1>
      <p className="max-w-xl text-lg text-zinc-500">
        Backend, bases de datos y BI. Construyo sistemas prolijos de punta a punta.
      </p>
      <a
        href="#proyectos"
        className="mt-4 rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        Ver proyectos
      </a>
    </section>
  );
}
