'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cloud, GraduationCap, Languages as LanguagesIcon } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/effects/tilt-card'
import { complementary, education, languages } from '@/lib/content'

type Item = {
  icon: typeof GraduationCap
  kicker: string
  title: string
  org: string
  period: string
  detail: string
  status: string
}

const items: Item[] = [
  ...education.map((e) => ({ icon: GraduationCap, kicker: 'Formación académica', ...e })),
  ...complementary.map((c) => ({ icon: Cloud, kicker: 'Formación complementaria', ...c })),
  ...languages.map((l) => ({
    icon: LanguagesIcon,
    kicker: 'Idiomas',
    title: l.name,
    org: l.level,
    period: '',
    detail: l.detail,
    status: l.level,
  })),
]

/**
 * Pinned horizontal scroll: the section freezes vertically while the
 * timeline moves right-to-left. Falls back to a normal vertical list on
 * small screens and for reduced-motion users.
 */
export function Formation() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const wrap = wrapRef.current
      const track = trackRef.current
      if (!wrap || !track) return
      const distance = () => track.scrollWidth - wrap.clientWidth
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      return () => tween.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="formacion" className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-32">
        <SectionHeader
          index="04"
          label="Formación"
          title="Trayectoria"
          description="Formación académica, complementaria e idiomas, como una línea de tiempo continua."
        />
      </div>

      <div ref={wrapRef} className="relative flex min-h-[70svh] items-center overflow-hidden lg:h-svh">
        {/* baseline */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent lg:block" />

        <div
          ref={trackRef}
          className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pb-24 md:px-8 lg:w-max lg:max-w-none lg:flex-row lg:gap-8 lg:pb-0 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pr-[10vw]"
        >
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="reveal lg:w-[26rem] lg:shrink-0" data-reveal-group="formation">
                <TiltCard className="glass relative rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{item.kicker}</span>
                    <span className="grid size-9 place-items-center rounded-lg border border-signal/20 bg-signal/10 text-signal">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-medium leading-snug">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{item.detail}</p>
                  <div className="mt-5 flex items-center justify-between font-mono text-xs">
                    <span className="rounded-full border border-warm/30 bg-warm/10 px-2.5 py-0.5 text-warm">{item.status}</span>
                    <span className="text-muted-foreground">{item.period || `0${i + 1}`}</span>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
