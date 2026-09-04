'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function WaveVisualizer({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let t = 0
    let width = 0
    let height = 0
    // Normalized 0 to 1
    const mouse = { x: 0.5, y: 0.5 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      mouse.x = e.clientX / window.innerWidth
      mouse.y = e.clientY / window.innerHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      t += 0.008

      for (let l = 0; l < 4; l++) {
        const phase = l * 1.6
        const amp = 18 + l * 9 + mouse.y * 26
        const freq = 0.004 + l * 0.0016 + mouse.x * 0.002
        const baseY = height * (0.45 + l * 0.14)
        
        const rgb = l % 2 === 0 ? '34, 211, 238' : '139, 92, 246' // cyan : violet
        const rawAlpha = 0.22 - l * 0.04 + mouse.x * 0.06
        const alpha = Math.max(0.05, Math.min(0.4, rawAlpha))
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, `rgba(${rgb}, 0)`)
        gradient.addColorStop(0.5, `rgba(${rgb}, ${alpha})`)
        gradient.addColorStop(1, `rgba(${rgb}, 0)`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.2
        ctx.beginPath()

        for (let x = 0; x <= width; x += 4) {
          const y = baseY 
            + Math.sin(x * freq + t * (1.2 + l * 0.4) + phase) * amp 
            + Math.sin(x * freq * 2.4 - t * 0.9) * amp * 0.3

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      aria-hidden="true" 
      className={cn('pointer-events-none absolute inset-0 size-full opacity-70 z-0', className)} 
    />
  )
}
