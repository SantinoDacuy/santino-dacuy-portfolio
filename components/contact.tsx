import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import { LinkedinIcon } from '@/components/brand-icons'
import { Magnetic } from '@/components/effects/magnetic'
import { TiltCard } from '@/components/effects/tilt-card'
import { profile } from '@/lib/content'

const channels = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Teléfono', value: profile.phone, href: profile.phoneHref },
  { icon: LinkedinIcon, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
]

export function Contact() {
  return (
    <section id="contacto" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <div className="reveal">
        <TiltCard max={2} scale={1.005} className="glass overflow-hidden rounded-3xl p-8 md:p-14">
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_70%)]" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-signal">05 / CONTACTO</p>
              <h2 className="mt-5 text-balance text-3xl font-medium tracking-tight md:text-5xl">
                Busco mi primera oportunidad profesional en sistemas.
              </h2>
              <p className="mt-5 max-w-md text-pretty text-muted-foreground md:text-lg">
                Backend, bases de datos y arquitectura. Si tu equipo necesita a alguien con base sólida y ganas de crecer, hablemos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-signal-foreground transition hover:brightness-110"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    Escribime
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={profile.cv}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Descargar CV
                  </a>
                </Magnetic>
              </div>
            </div>

            <ul className="flex flex-col gap-3 self-center">
              {channels.map((c) => {
                const Icon = c.icon
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noopener noreferrer' : undefined}
                      className="group/link flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/[0.02] px-5 py-4 transition hover:border-signal/40 hover:bg-signal/[0.06]"
                    >
                      <span className="flex items-center gap-4">
                        <span className="grid size-10 place-items-center rounded-xl border border-signal/20 bg-signal/10 text-signal">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{c.label}</span>
                          <span className="block text-sm md:text-base">{c.value}</span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-signal" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
              <li className="flex items-center gap-4 px-5 py-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-signal" aria-hidden="true" />
                {profile.location}
              </li>
            </ul>
          </div>
        </TiltCard>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 font-mono text-xs text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.role}
        </p>
        <p className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-signal" />
          {profile.location}
        </p>
      </footer>
    </section>
  )
}
