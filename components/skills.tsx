import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/effects/tilt-card'
import { skills } from '@/lib/content'

/** SVG icons for each skill category — styled as monoline glyphs */
const categoryIcons: Record<string, React.ReactNode> = {
  Desarrollo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'Bases de Datos Relacionales': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  'Bases de Datos NoSQL y Distribuidas': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" /><rect x="8" y="14" width="8" height="8" rx="1" /><path d="M6 10v4h2" /><path d="M18 10v8h-2" /><path d="M10 18H6" />
    </svg>
  ),
  'Business Intelligence y Datos': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <rect x="3" y="12" width="4" height="9" rx="0.5" /><rect x="10" y="7" width="4" height="14" rx="0.5" /><rect x="17" y="3" width="4" height="18" rx="0.5" />
    </svg>
  ),
  'Inteligencia Artificial': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" /><path d="M6 10v1a6 6 0 0 0 12 0v-1" /><path d="M12 17v4" /><path d="M8 21h8" />
    </svg>
  ),
  'Redes y Sistemas': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <circle cx="12" cy="12" r="2" /><circle cx="4" cy="6" r="2" /><circle cx="20" cy="6" r="2" /><circle cx="4" cy="18" r="2" /><circle cx="20" cy="18" r="2" /><path d="M6 7.5L10.5 11" /><path d="M18 7.5L13.5 11" /><path d="M6 16.5L10.5 13" /><path d="M18 16.5L13.5 13" />
    </svg>
  ),
  Herramientas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  'Integraciones y APIs de terceros': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
}

export function Skills() {
  return (
    <section id="conocimientos" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader
        index="03"
        label="Stack"
        title="Conocimientos técnicos"
        description="Agrupados por dominio y priorizados: las tecnologías de uso frecuente marcadas como core para facilitar la lectura de reclutadores."
      />

      <div className="reveal mb-6 flex items-center gap-4 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-signal shadow-[0_0_6px] shadow-signal" />
          <span className="text-foreground font-medium">Stack principal (core)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-2.5 bg-muted-foreground/40" />
          <span>Conocimientos complementarios</span>
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <div key={group.category} className="reveal" data-reveal-group="skills">
            <TiltCard max={6} className="glass group/card h-full rounded-2xl p-5 transition-colors hover:border-signal/20 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <p className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</p>
                  <span className="grid size-9 place-items-center rounded-lg border border-signal/20 bg-signal/10 text-signal transition-all group-hover/card:bg-signal/20 group-hover/card:shadow-[0_0_16px] group-hover/card:shadow-signal/20">
                    {categoryIcons[group.category] || (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                    )}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-medium leading-snug">{group.category}</h3>
                
                <ul className="mt-4 space-y-1.5 text-sm">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className={`group/item flex items-center gap-2.5 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-white/[0.04] ${
                        item.core
                          ? 'text-foreground font-medium hover:text-signal'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.core ? (
                        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_6px] shadow-signal transition-transform duration-200 group-hover/item:scale-125" />
                      ) : (
                        <span aria-hidden="true" className="h-px w-2 shrink-0 bg-white/20 transition-all duration-200 group-hover/item:w-3 group-hover/item:bg-signal/60" />
                      )}
                      <span className="text-pretty">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  )
}
