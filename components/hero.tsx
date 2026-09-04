import Image from 'next/image'
import { ArrowDown, Download, Mail, MapPin, Phone } from 'lucide-react'
import { LinkedinIcon } from '@/components/brand-icons'
import { Magnetic } from '@/components/effects/magnetic'
import { WaveVisualizer } from '@/components/effects/WaveVisualizer'
import { profile } from '@/lib/content'

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-svh items-center overflow-hidden pt-24">
      <WaveVisualizer className="opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 md:px-8">
        <div className="max-w-3xl relative z-10">
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

        <div className="absolute right-0 md:-right-10 lg:-right-20 xl:-right-10 top-[40%] -translate-y-1/2 hidden md:block w-[250px] lg:w-[320px] xl:w-[380px] aspect-square group cursor-pointer z-0 transition-transform duration-1000 ease-out hover:-translate-y-[60%]">
          <div className="size-full animate-[spin_20s_linear_infinite] group-hover:animate-none group-hover:rotate-0 transition-all duration-1000 ease-out">
            <Image 
              src="/miniatura.png" 
              alt="Santino Dacuy" 
              fill 
              priority 
              className="object-contain drop-shadow-[0_0_40px_rgba(var(--signal),0.3)] animate-[bounce_4s_ease-in-out_infinite] group-hover:animate-none group-hover:translate-y-0 transition-all duration-1000 ease-out" 
            />
          </div>
        </div>

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
