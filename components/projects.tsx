'use client'

import { useState } from 'react'
import { ArrowUpRight, FileText, Layers, Network } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/effects/tilt-card'
import { Magnetic } from '@/components/effects/magnetic'
import { ArchitectureModal } from '@/components/effects/architecture-modal'
import { projects, type Project, type ProjectCategory } from '@/lib/content'

const categories: { id: ProjectCategory; label: string; count: number }[] = [
  { id: 'todos', label: 'Todos', count: projects.length },
  { id: 'fullstack', label: 'Full-Stack', count: projects.filter((p) => p.category === 'fullstack').length },
  { id: 'data', label: 'Datos & BI', count: projects.filter((p) => p.category === 'data').length },
  { id: 'backend-ia', label: 'Backend & IA', count: projects.filter((p) => p.category === 'backend-ia').length },
]

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

function ProjectCard({
  project,
  featured,
  onOpenArch,
}: {
  project: Project
  featured?: boolean
  onOpenArch: (id: string, title: string) => void
}) {
  return (
    <TiltCard max={featured ? 4 : 7} className="glass h-full rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-signal font-semibold">{project.index}</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">{project.kind}</span>
            {project.badge && (
              <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-[11px] text-signal">
                {project.badge}
              </span>
            )}
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
      </div>

      <div className="mt-6 pt-4 border-t border-white/[0.04]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-signal underline-offset-4 hover:underline"
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
                className="inline-flex items-center gap-1.5 font-mono text-xs text-signal underline-offset-4 hover:underline"
              >
                <FileText className="size-3.5" aria-hidden="true" />
                {project.pdf.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Architecture Inspector Button for key projects */}
          {(project.id === 'mate-unico' || project.id === 'retail-vision') && (
            <button
              type="button"
              onClick={() => onOpenArch(project.id, project.title)}
              className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal transition-all duration-200 hover:border-signal/60 hover:bg-signal/20 hover:shadow-[0_0_12px_rgba(var(--signal),0.3)]"
            >
              <Network className="size-3" />
              Arquitectura
            </button>
          )}
        </div>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack tecnológico">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:border-signal/40 hover:bg-signal/10 hover:text-signal hover:shadow-[0_0_12px_rgba(var(--signal),0.2)] cursor-default"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  )
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('todos')
  const [archModal, setArchModal] = useState<{ isOpen: boolean; id: string; title: string }>({
    isOpen: false,
    id: '',
    title: '',
  })

  const handleOpenArch = (id: string, title: string) => {
    setArchModal({ isOpen: true, id, title })
  }

  const filteredProjects = activeCategory === 'todos' 
    ? projects 
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="proyectos" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader
        index="02"
        label="Proyectos"
        title="Proyectos destacados"
        description="Cada proyecto como un caso: contexto, decisiones técnicas y resultados. Del e-commerce en producción al pipeline de datos que reveló lo que las encuestas escondían."
      />

      {/* Category filter tabs */}
      <div className="reveal mb-10 flex flex-wrap items-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground mr-2">
          <Layers className="size-3.5 text-signal" />
          Filtrar:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-signal text-signal-foreground font-medium shadow-[0_0_15px] shadow-signal/30'
                : 'glass text-muted-foreground hover:bg-white/10 hover:text-foreground'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                activeCategory === cat.id
                  ? 'bg-black/20 text-signal-foreground'
                  : 'bg-white/5 text-muted-foreground'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filteredProjects.map((p, idx) => {
          const isFeatured = activeCategory === 'todos' && idx < 2
          return (
            <div
              key={p.id}
              className="lg:col-span-1 animate-in fade-in zoom-in-95 duration-300 fill-mode-both"
            >
              <ProjectCard project={p} featured={isFeatured} onOpenArch={handleOpenArch} />
            </div>
          )
        })}
      </div>

      {/* Interactive System Architecture Modal */}
      <ArchitectureModal
        projectId={archModal.id}
        title={archModal.title}
        isOpen={archModal.isOpen}
        onClose={() => setArchModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  )
}
