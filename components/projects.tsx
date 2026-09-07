import { ArrowUpRight, FileText } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/effects/tilt-card'
import { Magnetic } from '@/components/effects/magnetic'
import { projects, type Project } from '@/lib/content'

function Findings({ findings }: { findings: NonNullable<Project['findings']> }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {findings.map((f) => (
        <div
          key={f.label}
          className="rounded-xl border border-warm/25 bg-warm/[0.06] p-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">Hallazgo</p>
          <p className="mt-2 text-xl font-medium tracking-tight text-foreground">
            {f.prefix && <span className="text-warm">{f.prefix}</span>}
            <span data-count={f.count} data-decimals={f.decimals ?? 0} data-suffix={f.suffix ?? ''}>
              0{f.suffix}
            </span>
          </p>
          <p className="font-mono text-xs text-muted-foreground">{f.label}</p>
          <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <TiltCard max={featured ? 4 : 7} className="glass h-full rounded-3xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-signal">{project.index}</span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">{project.kind}</span>
          {project.year && <span className="text-muted-foreground">{project.year}</span>}
        </div>
        <div className="flex items-center gap-2">
          {project.pdf && (
            <Magnetic strength={0.3}>
              <a
                href={project.pdf.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Documentación PDF: ${project.pdf.label}`}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-signal/40 hover:text-signal"
              >
                <FileText className="size-4" />
              </a>
            </Magnetic>
          )}
          {project.link && (
            <Magnetic strength={0.3}>
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repositorio en GitHub: ${project.link.label}`}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-signal/40 hover:text-signal"
              >
                <GithubIcon className="size-4" />
              </a>
            </Magnetic>
          )}
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-medium tracking-tight md:text-3xl">{project.title}</h3>
      <p className="mt-1 text-sm text-signal/90">{project.subtitle}</p>
      <p className="mt-4 text-pretty text-muted-foreground">{project.description}</p>

      <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
        {project.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-signal" />
            <span className="text-pretty">{b}</span>
          </li>
        ))}
      </ul>

      {project.findings && <Findings findings={project.findings} />}

      {project.link && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-signal underline-offset-4 hover:underline"
        >
          github.com/{project.link.label}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      )}

      {!project.link && project.pdf && (
        <a
          href={project.pdf.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-signal underline-offset-4 hover:underline"
        >
          <FileText className="size-3.5" aria-hidden="true" />
          {project.pdf.label}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      )}

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack tecnológico">
        {project.stack.map((s) => (
          <li key={s} className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
            {s}
          </li>
        ))}
      </ul>
    </TiltCard>
  )
}

export function Projects() {
  const [tesis, retail, ...rest] = projects
  return (
    <section id="proyectos" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader
        index="02"
        label="Proyectos"
        title="Proyectos destacados"
        description="Cada proyecto como un caso: contexto, decisiones técnicas y resultados. Del e-commerce en producción al pipeline de datos que reveló lo que las encuestas escondían."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="reveal lg:col-span-1">
          <ProjectCard project={tesis} featured />
        </div>
        <div className="reveal lg:col-span-1">
          <ProjectCard project={retail} featured />
        </div>
        {rest.map((p) => (
          <div key={p.id} className="reveal" data-reveal-group="projects-rest">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
