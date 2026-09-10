'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Magnetic } from '@/components/effects/magnetic'
import { profile } from '@/lib/content'

const links = [
  { href: '#sobre-mi', label: 'Perfil' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#conocimientos', label: 'Stack' },
  { href: '#formacion', label: 'Formación' },
  { href: '#contacto', label: 'Contacto' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  /* Backdrop-blur and scroll progress */
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        setScrollProgress((window.scrollY / maxScroll) * 100)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Active section tracking */
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* Close mobile menu on navigation */
  const handleLinkClick = () => setMobileOpen(false)

  /* Lock scroll when mobile menu open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Scroll Progress Indicator Line (GPU composited transform) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.03] z-50 pointer-events-none">
        <div
          className="h-full w-full bg-gradient-to-r from-signal via-cyan-400 to-violet-500 shadow-[0_0_8px_rgba(var(--signal),0.6)] origin-left will-change-transform"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      <nav
        ref={navRef}
        aria-label="Principal"
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 py-4 transition-all duration-500 md:px-8 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        {/* Logo */}
        <Magnetic strength={0.25}>
          <a
            href="#inicio"
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-500 ${
              scrolled
                ? 'bg-white/[0.06] shadow-lg shadow-black/10 backdrop-blur-xl border border-white/[0.08]'
                : 'glass'
            }`}
          >
            <span className="size-1.5 rounded-full bg-signal shadow-[0_0_10px] shadow-signal" />
            SD<span className="text-muted-foreground">.sys</span>
          </a>
        </Magnetic>

        {/* Desktop nav */}
        <ul
          className={`hidden items-center gap-1 rounded-full p-1 transition-all duration-500 md:flex ${
            scrolled
              ? 'bg-white/[0.06] shadow-lg shadow-black/10 backdrop-blur-xl border border-white/[0.08]'
              : 'glass'
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Magnetic strength={0.3}>
                <a
                  href={l.href}
                  className={`relative block rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-white/5 hover:text-foreground ${
                    active === l.href
                      ? 'text-signal'
                      : 'text-muted-foreground'
                  }`}
                >
                  {l.label}
                  {active === l.href && (
                    <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-signal shadow-[0_0_8px] shadow-signal/50" />
                  )}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Magnetic strength={0.3}>
          <a
            href={profile.cv}
            download
            className={`hidden md:inline-block rounded-full bg-signal px-4 py-1.5 text-sm font-medium text-signal-foreground transition-all duration-500 hover:brightness-110 ${
              scrolled ? 'shadow-lg shadow-signal/20' : ''
            }`}
          >
            Descargar CV
          </a>
        </Magnetic>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          className={`relative z-50 grid size-10 place-items-center rounded-full transition-all duration-300 md:hidden ${
            scrolled || mobileOpen
              ? 'bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]'
              : 'glass'
          }`}
        >
          <span className={`absolute transition-all duration-300 ${mobileOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
            <X className="size-4" />
          </span>
          <span className={`absolute transition-all duration-300 ${mobileOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
            <Menu className="size-4" />
          </span>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div className="relative flex h-full flex-col items-center justify-center gap-2">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleLinkClick}
              className={`group relative rounded-2xl px-8 py-4 text-2xl font-medium tracking-tight transition-all duration-500 hover:bg-white/5 ${
                active === l.href ? 'text-signal' : 'text-foreground'
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              <span className="font-mono text-xs text-signal/60 mr-3">0{i + 1}</span>
              {l.label}
              {active === l.href && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-signal shadow-[0_0_8px] shadow-signal" />
              )}
            </a>
          ))}

          <a
            href={profile.cv}
            download
            onClick={handleLinkClick}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-signal-foreground transition hover:brightness-110"
            style={{
              transitionDelay: mobileOpen ? `${links.length * 60}ms` : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            Descargar CV
          </a>
        </div>
      </div>
    </header>
  )
}
