import { ParticleField } from '@/components/effects/ParticleField'
import { CustomCursor } from '@/components/effects/custom-cursor'
import { ScrollAnimations } from '@/components/effects/scroll-animations'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Formation } from '@/components/formation'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <>
      <ParticleField />
      <CustomCursor />
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Formation />
        <Contact />
      </main>
      <ScrollAnimations />
    </>
  )
}
