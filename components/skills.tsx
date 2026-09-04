import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/effects/tilt-card'
import { skills } from '@/lib/content'

export function Skills() {
  return (
    <section id="conocimientos" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader
        index="03"
        label="Stack"
        title="Conocimientos técnicos"
        description="Agrupados por dominio: del código a la base de datos, del dato al análisis."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <div key={group.category} className="reveal" data-reveal-group="skills">
            <TiltCard max={6} className="glass h-full rounded-2xl p-5">
              <p className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-base font-medium leading-snug">{group.category}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-signal/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  )
}
