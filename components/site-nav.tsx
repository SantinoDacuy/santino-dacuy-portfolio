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
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8"
      >
        <Magnetic strength={0.25}>
          <a href="#inicio" className="glass flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs tracking-wider">
            <span className="size-1.5 rounded-full bg-signal shadow-[0_0_10px] shadow-signal" />
            SD<span className="text-muted-foreground">.sys</span>
          </a>
        </Magnetic>

        <ul className="glass hidden items-center gap-1 rounded-full p-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Magnetic strength={0.3}>
                <a
                  href={l.href}
                  className="block rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        <Magnetic strength={0.3}>
          <a
            href={profile.cv}
            download
            className="rounded-full bg-signal px-4 py-1.5 text-sm font-medium text-signal-foreground transition hover:brightness-110"
          >
            Descargar CV
          </a>
        </Magnetic>
      </nav>
    </header>
  )
}
