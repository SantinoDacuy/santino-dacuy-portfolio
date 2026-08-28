// TODO: completar enlaces reales (email, LinkedIn, GitHub).
export function Contact() {
  return (
    <section id="contacto" className="flex flex-col gap-4 px-6 py-24 sm:px-16">
      <h2 className="text-2xl font-semibold tracking-tight">Contacto</h2>
      <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
        <a href="mailto:" className="underline underline-offset-4">
          Email
        </a>
        <a href="#" className="underline underline-offset-4">
          LinkedIn
        </a>
        <a href="#" className="underline underline-offset-4">
          GitHub
        </a>
      </div>
    </section>
  );
}
