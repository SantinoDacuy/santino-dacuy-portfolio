'use client'

import { useEffect, useRef } from 'react'

/**
 * Subtle full-page radial gradient that follows the cursor,
 * adding depth and a premium feel to the dark background.
 */
export function MouseGradient() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let mx = 0.5
    let my = 0.5
    let cx = 0.5
    let cy = 0.5
    let raf = 0

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mx = e.clientX / window.innerWidth
      my = e.clientY / window.innerHeight
    }

    const loop = () => {
      cx += (mx - cx) * 0.04
      cy += (my - cy) * 0.04
      el.style.background = `radial-gradient(
        600px circle at ${cx * 100}% ${cy * 100}%,
        oklch(0.84 0.14 190 / 0.07),
        transparent 50%
      )`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-80"
    />
  )
}
