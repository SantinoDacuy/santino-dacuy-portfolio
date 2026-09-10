import { Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '@/components/brand-icons'
import { profile } from '@/lib/content'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Perfil' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#conocimientos', label: 'Stack' },
  { href: '#formacion', label: 'Formación' },
  { href: '#contacto', label: 'Contacto' },
]

const socialLinks = [
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: profile.linkedin,
    external: true,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/SantinoDacuy',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${profile.email}`,
    external: false,
  },
]

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-5 md:px-8">
      {/* Gradient top border */}
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />

      <div className="grid gap-10 py-12 md:grid-cols-3">
        {/* Brand column */}
        <div>
          <a href="#inicio" className="inline-flex items-center gap-2 font-mono text-sm tracking-wider">
            <span className="size-2 rounded-full bg-signal shadow-[0_0_10px] shadow-signal" />
            SD<span className="text-muted-foreground">.sys</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {profile.role} · {profile.location}
          </p>
        </div>

        {/* Navigation column */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Navegación</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social column */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Social</p>
          <ul className="mt-3 space-y-2">
            {socialLinks.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-signal"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {s.label}
                    {s.external && (
                      <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 font-mono text-xs text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.role}
        </p>
        <p className="flex items-center gap-1.5">
          Hecho con <Heart className="size-3 text-signal" aria-hidden="true" /> y Next.js
        </p>
        <p className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-signal" />
          {profile.location}
        </p>
      </div>
    </footer>
  )
}
