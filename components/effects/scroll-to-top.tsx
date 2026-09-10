'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(p)
      setVisible(scrollTop > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const r = 18
  const c = 2 * Math.PI * r
  const offset = c - progress * c

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] text-muted-foreground transition-all duration-500 hover:text-signal hover:border-signal/40 hover:bg-signal/[0.06] ${
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 -rotate-90 size-full" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.1"
        />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          className="text-signal"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
        />
      </svg>
      <ArrowUp className="size-4 relative z-10" />
    </button>
  )
}
