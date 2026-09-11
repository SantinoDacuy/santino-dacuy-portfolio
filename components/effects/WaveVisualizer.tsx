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
    let isVisible = true
    let isPageVisible = !document.hidden
    let isPreloaderDone =
      typeof window !== 'undefined' && sessionStorage.getItem('sd_portfolio_loaded') === 'true'

    const mouse = { x: 0.5, y: 0.5 }
    let isMobile = window.innerWidth < 768

    const resize = () => {
      isMobile = window.innerWidth < 768
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mouse.x = e.clientX / window.innerWidth
      mouse.y = e.clientY / window.innerHeight
    }

    // IntersectionObserver para detener los cálculos cuando el Hero no esté visible en scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const handleVisibility = () => {
      isPageVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const handlePreloaderComplete = () => {
      isPreloaderDone = true
    }
    window.addEventListener('sd-preloader-complete', handlePreloaderComplete)

    const draw = () => {
      raf = requestAnimationFrame(draw)

      // Pausar si no está en pantalla, la pestaña está oculta o el preloader aún está activo
      if (!isVisible || !isPageVisible || !isPreloaderDone) return

      ctx.clearRect(0, 0, width, height)
      t += 0.008

      // En móviles reducimos a 2 líneas y paso de 8px para máximo framerate
      const linesCount = isMobile ? 2 : 4
      const step = isMobile ? 8 : 4

      for (let l = 0; l < linesCount; l++) {
        const phase = l * 1.6
        const amp = 16 + l * 8 + mouse.y * 22
        const freq = 0.004 + l * 0.0016 + mouse.x * 0.002
        const baseY = height * (0.45 + l * 0.14)
        
        const rgb = l % 2 === 0 ? '34, 211, 238' : '139, 92, 246' // cyan : violet
        const rawAlpha = 0.22 - l * 0.04 + mouse.x * 0.06
        const alpha = Math.max(0.05, Math.min(0.35, rawAlpha))
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, `rgba(${rgb}, 0)`)
        gradient.addColorStop(0.5, `rgba(${rgb}, ${alpha})`)
        gradient.addColorStop(1, `rgba(${rgb}, 0)`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.2
        ctx.beginPath()

        for (let x = 0; x <= width; x += step) {
          const y = baseY 
            + Math.sin(x * freq + t * (1.2 + l * 0.4) + phase) * amp 
            + Math.sin(x * freq * 2.4 - t * 0.9) * amp * 0.3

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('sd-preloader-complete', handlePreloaderComplete)
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
