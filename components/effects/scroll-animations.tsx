'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Registers GSAP ScrollTrigger and animates every `.reveal` element
 * into view. Elements sharing a `data-reveal-group` stagger together.
 */
export function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set('.reveal', { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // grouped staggers
      const groups = new Map<string, Element[]>()
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        const g = el.dataset.revealGroup
        if (g) {
          if (!groups.has(g)) groups.set(g, [])
          groups.get(g)!.push(el)
        } else {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        }
      })
      groups.forEach((els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: els[0], start: 'top 85%', once: true },
        })
      })

      // section labels: draw the thin line
      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        )
      })

      // counters
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const decimals = Number(el.dataset.decimals ?? 0)
        const suffix = el.dataset.suffix ?? ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = obj.v.toLocaleString('es-AR', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) + suffix
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
