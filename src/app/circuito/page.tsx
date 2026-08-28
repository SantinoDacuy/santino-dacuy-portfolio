// TODO: acá va la escena de React Three Fiber con el circuito interactivo.
// Al vivir en su propia route, Next.js la separa en su propio bundle:
// no se descarga hasta que alguien entra a /circuito.
export default function Circuito() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">El circuito todavía se está construyendo</h1>
      <a href="/" className="text-sm underline underline-offset-4">
        Volver al inicio
      </a>
    </main>
  );
}
