import dynamic from 'next/dynamic'
import { Preloader } from '@/components/effects/preloader'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'

// Visual client effects loaded dynamically
const ParticleField = dynamic(
  () => import('@/components/effects/ParticleField').then((mod) => mod.ParticleField)
)

const CustomCursor = dynamic(
  () => import('@/components/effects/custom-cursor').then((mod) => mod.CustomCursor)
)

const ScrollAnimations = dynamic(
  () => import('@/components/effects/scroll-animations').then((mod) => mod.ScrollAnimations)
)

// Below-the-fold content sections deferred to reduce initial work
const Projects = dynamic(
  () => import('@/components/projects').then((mod) => mod.Projects)
)

const Skills = dynamic(
  () => import('@/components/skills').then((mod) => mod.Skills)
)

const Formation = dynamic(
  () => import('@/components/formation').then((mod) => mod.Formation)
)

const Contact = dynamic(
  () => import('@/components/contact').then((mod) => mod.Contact)
)

export default function Page() {
  return (
    <>
      <Preloader />
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
