import Image from 'next/image'
import { Database, ShieldCheck, Users, Sparkles, MapPin } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/effects/tilt-card'
import { about, profile } from '@/lib/content'

const icons = [Users, ShieldCheck, Database]

export function About() {
  return (
    <section id="sobre-mi" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader index="01" label="Perfil" title="Sistemas, datos y arquitectura: una base sólida para construir." />

      {/* Main Grid: Biography text on left, Photo Card on right */}
      <div className="grid gap-10 lg:grid-cols-12 items-center">
        {/* Left: Biography texts */}
        <div className="space-y-5 text-pretty text-muted-foreground lg:col-span-7 md:text-lg">
          {about.text.map((p, i) => (
            <p key={i} className="reveal leading-relaxed" data-reveal-group="about-text">
              {p}
            </p>
          ))}
        </div>

        {/* Right: SANyLEGO Featured Card with high visual aesthetics */}
        <div className="reveal lg:col-span-5 flex justify-center lg:justify-end" data-reveal-group="about-photo">
          <div className="w-full max-w-[340px] sm:max-w-[370px]">
            <TiltCard max={6} className="glass group relative overflow-hidden rounded-3xl p-3 border border-white/15 transition-all duration-500 hover:border-signal/50 hover:shadow-[0_0_40px_rgba(var(--signal),0.25)]">
              {/* Background ambient glow */}
              <div className="absolute -inset-1 rounded-3xl bg-signal/15 blur-2xl transition-all duration-700 group-hover:bg-signal/30 group-hover:blur-3xl -z-10" />

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/40">
                <Image
                  src="/SANyLEGO.jpeg"
                  alt="Santino Dacuy con LEGO"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 370px"
                  className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 filter contrast-[1.03] brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />

                {/* Floating pill badge */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-foreground flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-signal" />
                      Santino Dacuy
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">Analista en Sistemas</p>
                  </div>
                  <span className="rounded-full border border-signal/40 bg-signal/20 px-2.5 py-0.5 font-mono text-[10px] text-signal backdrop-blur-md">
                    UADER
                  </span>
                </div>
              </div>

              <div className="px-3 pt-3 pb-1 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3 text-signal" />
                  {profile.location.split(',')[0]}
                </span>
                <span>Entre Ríos, AR</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Highlights Grid underneath: 3 columns */}
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {about.highlights.map((h, i) => {
          const Icon = icons[i]
          return (
            <div key={h.kicker} className="reveal" data-reveal-group="about-cards">
              <TiltCard className="glass h-full rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{h.kicker}</p>
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-signal/20 bg-signal/10 text-signal">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-4 text-3xl font-medium tracking-tight text-foreground">
                    {h.value}{' '}
                    <span className="text-sm font-normal text-muted-foreground">{h.label}</span>
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{h.text}</p>
              </TiltCard>
            </div>
          )
        })}
      </div>
    </section>
  )
}
