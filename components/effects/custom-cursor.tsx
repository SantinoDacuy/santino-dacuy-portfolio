'use client'

import { useEffect, useRef } from 'react'

/**
 * Minimal geometric cursor: a small dot plus a lagging ring that expands
 * over interactive elements. Only enabled for fine pointers.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    let visible = false

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, [data-magnetic], [role="button"]')
      ring.dataset.active = interactive ? 'true' : 'false'
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 rounded-full bg-signal opacity-0 mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] size-8 rounded-full border border-signal/70 opacity-0 transition-[width,height,background-color,border-color] duration-300 data-[active=true]:size-14 data-[active=true]:border-signal/30 data-[active=true]:bg-signal/10"
      />
    </>
  )
}
