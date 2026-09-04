import { Database, ShieldCheck, Users } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/effects/tilt-card'
import { about } from '@/lib/content'

const icons = [Users, ShieldCheck, Database]

export function About() {
  return (
    <section id="sobre-mi" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader index="01" label="Perfil" title="Sistemas, datos y arquitectura: una base sólida para construir." />

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="space-y-5 text-pretty text-muted-foreground lg:col-span-3 md:text-lg">
          {about.text.map((p, i) => (
            <p key={i} className="reveal" data-reveal-group="about-text">
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          {about.highlights.map((h, i) => {
            const Icon = icons[i]
            return (
              <div key={h.kicker} className="reveal" data-reveal-group="about-cards">
                <TiltCard className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{h.kicker}</p>
                      <p className="mt-2 text-3xl font-medium tracking-tight">
                        {h.value}{' '}
                        <span className="text-sm font-normal text-muted-foreground">{h.label}</span>
                      </p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-signal/20 bg-signal/10 text-signal">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{h.text}</p>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
