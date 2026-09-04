'use client'

import { useRef, type ReactNode, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Wraps an element so it is gently "pulled" towards the cursor when hovered.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate3d(0,0,0)'
  }

  return (
    <div
      ref={ref}
      data-magnetic
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('inline-block transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
    </div>
  )
}
