import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="proyectos" className="flex flex-col gap-6 px-6 py-24 sm:px-16">
      <h2 className="text-2xl font-semibold tracking-tight">Proyectos</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
          >
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="text-sm text-zinc-500">{project.description}</p>
            <ul className="flex flex-wrap gap-2 text-xs text-zinc-500">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-900">
                  {tech}
                </li>
              ))}
            </ul>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-4"
              >
                Ver en GitHub
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
