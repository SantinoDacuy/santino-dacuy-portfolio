'use client'

import { useRef, type ReactNode, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** max rotation in degrees */
  max?: number
  /** subtle lift on hover */
  scale?: number
}

/**
 * Card with mouse-dependent 3D tilt and a light "sheen" following the cursor.
 * Pure CSS transforms; no library required.
 */
export function TiltCard({ children, className, max = 7, scale = 1.015 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number>(0)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rx = (0.5 - py) * max * 2
      const ry = (px - 0.5) * max * 2
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, ${scale})`
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    })
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        'group relative preserve-3d will-change-transform transition-transform duration-300 ease-out',
        className,
      )}
      style={{ transform: 'perspective(1000px)' }}
    >
      {/* Outer interactive spotlight border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
        style={{
          background:
            'radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), oklch(0.84 0.14 190 / 0.35), transparent 70%)',
        }}
      />
      {children}
      {/* Inner sheen reflection following cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), oklch(0.84 0.14 190 / 0.12), transparent 45%)',
        }}
      />
    </div>
  )
}
