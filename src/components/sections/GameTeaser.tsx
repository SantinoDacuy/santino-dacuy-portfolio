import Link from "next/link";

// TODO: reemplazar por el orbe/portal con glow definido en Figma y la frase final.
// Vive en su propia ruta (/circuito) a propósito: al ser una route separada,
// Next.js la separa en su propio bundle y no pesa en la carga inicial del sitio.
export function GameTeaser() {
  return (
    <section className="flex flex-col items-center gap-4 px-6 py-24 text-center sm:px-16">
      <p className="text-lg text-zinc-500">
        ¿Pensaste que ya me habías conocido?
      </p>
      <Link
        href="/circuito"
        className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        Entrar
      </Link>
    </section>
  );
}
