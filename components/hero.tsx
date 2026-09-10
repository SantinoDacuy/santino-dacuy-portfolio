'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, Download, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '@/components/brand-icons'
import { Magnetic } from '@/components/effects/magnetic'
import { TiltCard } from '@/components/effects/tilt-card'
import { WaveVisualizer } from '@/components/effects/WaveVisualizer'
import { profile } from '@/lib/content'

export function Hero() {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    // Si ya vio el preloader antes en la sesión, activa inmediatamente
    if (typeof window !== 'undefined' && sessionStorage.getItem('sd_portfolio_loaded') === 'true') {
      setHasEntered(true)
    }

    const handlePreloaderComplete = () => {
      setHasEntered(true)
    }

    window.addEventListener('sd-preloader-complete', handlePreloaderComplete)
    return () => window.removeEventListener('sd-preloader-complete', handlePreloaderComplete)
  }, [])

  return (
    <section
      id="inicio"
      style={{ perspective: '1200px' }}
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      <WaveVisualizer className="opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div
        className={`relative mx-auto w-full max-w-6xl px-5 pb-24 md:px-8 transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hasEntered
            ? 'scale-100 rotate-x-0 opacity-100 translate-y-0 blur-0'
            : 'scale-95 -rotate-x-6 opacity-0 translate-y-8 blur-sm'
        }`}
      >
        <div className="max-w-2xl lg:max-w-3xl relative z-10">
          <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-xs text-signal">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            disponible para mi primera oportunidad profesional
          </p>

          <h1 className="reveal text-balance text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Santino <span className="glow-text text-signal">Dacuy</span>
          </h1>

          <p className="reveal mt-6 text-lg font-medium text-foreground md:text-2xl">{profile.role}</p>
          <p className="reveal mt-1 font-mono text-xs text-muted-foreground md:text-sm">{profile.status}</p>

          <p className="reveal mt-6 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            {profile.tagline}
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-signal-foreground transition hover:brightness-110"
              >
                <Download className="size-4" aria-hidden="true" />
                Descargar CV (PDF)
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#proyectos"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
              >
                Ver proyectos
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Hero Miniatura Badge/Avatar with refined levitation */}
        <div className="absolute right-0 md:-right-6 lg:-right-10 xl:-right-6 top-[38%] -translate-y-1/2 hidden md:block w-[240px] lg:w-[300px] xl:w-[340px] aspect-square group cursor-pointer z-0">
          <div className="relative size-full animate-float transition-all duration-700 ease-out group-hover:scale-105">
            {/* Ambient background halo */}
            <div className="absolute inset-4 rounded-full bg-signal/15 blur-3xl transition-all duration-700 group-hover:bg-signal/25 group-hover:blur-3xl" />
            <Image
              src="/miniatura.png"
              alt="Santino Dacuy"
              fill
              priority
              sizes="(max-width: 1024px) 240px, (max-width: 1280px) 300px, 340px"
              className="object-contain drop-shadow-[0_10px_35px_rgba(var(--signal),0.35)] transition-all duration-700 ease-out group-hover:-translate-y-2"
            />
          </div>
        </div>

        {/* Hero Contacts */}
        <ul className="reveal mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground md:text-sm" data-reveal-group="hero-contacts">
          <li>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-signal">
              <Mail className="size-3.5" aria-hidden="true" />
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-signal">
              <Phone className="size-3.5" aria-hidden="true" />
              {profile.phone}
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-signal"
            >
              <LinkedinIcon className="size-3.5" />
              {profile.linkedinLabel}
            </a>
          </li>
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-signal"
            >
              <GithubIcon className="size-3.5" />
              {profile.githubLabel}
            </a>
          </li>
          <li className="inline-flex items-center gap-2">
            <MapPin className="size-3.5" aria-hidden="true" />
            {profile.location}
          </li>
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
