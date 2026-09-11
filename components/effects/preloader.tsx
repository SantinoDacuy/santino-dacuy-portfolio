'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  ShieldCheck,
  Terminal,
  Cpu,
  MapPin,
  Fingerprint,
  CheckCircle2,
  Lock,
  Unlock,
  FastForward,
} from 'lucide-react'

const bootLogs = [
  { text: 'Iniciando runtime de arquitectura y sistemas...', status: 'OK' },
  { text: 'Conectando con PostgreSQL & Data Warehouse...', status: 'OK' },
  { text: 'Verificando modelos dimensionales & pipelines ETL...', status: 'READY' },
  { text: 'Autenticando credenciales de visitante...', status: 'VERIFIED' },
  { text: 'Cargando perfil profesional de Santino Dacuy...', status: 'DONE' },
  { text: 'Control biométrico listo. Requiere confirmación.', status: 'STANDBY' },
]

export function Preloader() {
  const [logIndex, setLogIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const [isWaitingAuth, setIsWaitingAuth] = useState(false)
  const [isGranted, setIsGranted] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('sd_portfolio_loaded')
    if (hasSeen === 'true') {
      setShouldRender(false)
      window.dispatchEvent(new CustomEvent('sd-preloader-complete'))
      return
    }

    document.body.style.overflow = 'hidden'

    // Secuencia de inicialización ágil y dinámica: ~2.2 segundos
    const totalDuration = 2200
    const intervalMs = 40
    const totalTicks = totalDuration / intervalMs
    let currentTick = 0

    timerRef.current = setInterval(() => {
      currentTick += 1
      const rawProgress = (currentTick / totalTicks) * 100

      // Progresión orgánica con micro-pausas realistas
      let adjustedProgress = rawProgress
      if (rawProgress > 35 && rawProgress < 50) {
        adjustedProgress = 35 + (rawProgress - 35) * 0.5
      } else if (rawProgress > 70 && rawProgress < 85) {
        adjustedProgress = 52 + (rawProgress - 70) * 0.6
      }

      setProgress(() => {
        const next = Math.min(100, adjustedProgress)

        if (next >= 100 || currentTick >= totalTicks) {
          if (timerRef.current) clearInterval(timerRef.current)
          setIsWaitingAuth(true)
          setLogIndex(5)
          return 100
        }

        if (next > 82) setLogIndex(5)
        else if (next > 64) setLogIndex(4)
        else if (next > 45) setLogIndex(3)
        else if (next > 28) setLogIndex(2)
        else if (next > 12) setLogIndex(1)

        return next
      })
    }, intervalMs)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      document.body.style.overflow = ''
    }
  }, [])

  // Acción interactiva del usuario para autenticar y acceder
  const handleAuthorize = () => {
    if (isScanning || isGranted) return

    setIsScanning(true)

    // Respuesta biométrica rápida y táctil (~240ms)
    setTimeout(() => {
      setIsScanning(false)
      setIsGranted(true)

      // Confirmación y transición fluida (< 600ms totales)
      setTimeout(() => {
        setIsFinished(true)
        sessionStorage.setItem('sd_portfolio_loaded', 'true')
        window.dispatchEvent(new CustomEvent('sd-preloader-complete'))
        document.body.style.overflow = ''

        setTimeout(() => {
          setShouldRender(false)
        }, 400)
      }, 260)
    }, 240)
  }

  // Opción instantánea para omitir/saltear en cualquier momento
  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsFinished(true)
    sessionStorage.setItem('sd_portfolio_loaded', 'true')
    window.dispatchEvent(new CustomEvent('sd-preloader-complete'))
    document.body.style.overflow = ''

    setTimeout(() => {
      setShouldRender(false)
    }, 250)
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 select-none transition-opacity duration-500 ease-out transform-gpu ${
        isFinished
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 bg-background/98 backdrop-blur-xl pointer-events-auto'
      }`}
    >
      {/* Botón flotante para SALTEAR siempre visible y accesible (mínimo 44px de área táctil) */}
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Saltear pantalla de bienvenida"
        className="absolute top-3 right-3 sm:top-5 sm:right-6 z-30 inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-signal/50 hover:bg-signal/15 hover:text-signal active:scale-95 cursor-pointer backdrop-blur-md shadow-lg"
      >
        <span>Saltear</span>
        <FastForward className="size-3.5 text-signal" />
      </button>

      {/* Dynamic ambient backgrounds */}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${
          isFinished ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[580px] h-[280px] sm:h-[580px] rounded-full bg-signal/15 blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[220px] sm:w-[420px] h-[220px] sm:h-[420px] rounded-full bg-violet-600/15 blur-[100px]" />

        {/* Concentric Cyber Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[700px] h-[300px] sm:h-[700px] rounded-full border border-signal/[0.08] animate-[spin_80s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] rounded-full border border-dashed border-signal/[0.12] animate-[spin_60s_linear_infinite_reverse]" />

        {/* Precision Grid */}
        <div className="grid-lines absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]" />

        {/* Top HUD Telemetry badges */}
        <div className="absolute top-3.5 left-3 sm:top-5 sm:left-6 font-mono text-[9px] sm:text-[10px] text-signal/70 flex items-center gap-1.5">
          <span className="size-1.5 bg-signal rounded-full animate-ping" />
          <span>SD-SYSTEM // ONLINE</span>
        </div>
      </div>

      {/* Main Glass Center Card: acelerado por hardware, sin transformaciones 3D pesadas */}
      <div
        className={`relative w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[92svh] flex flex-col justify-between overflow-y-auto sm:overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 glass p-4 sm:p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)] z-10 transition-all duration-400 ease-out transform-gpu ${
          isFinished
            ? 'scale-[0.97] -translate-y-2 opacity-0'
            : 'scale-100 translate-y-0 opacity-100'
        }`}
      >
        {/* Holographic cyber scan line */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-signal/[0.04] to-transparent animate-pulse" />

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-12 items-center w-full">
          
          {/* Mobile compact header */}
          <div className="flex sm:hidden items-center gap-3 pb-2.5 border-b border-white/10 w-full min-w-0">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-signal/40 shadow-[0_0_12px_rgba(var(--signal),0.3)]">
              <Image
                src="/SANyLEGO.jpeg"
                alt="Santino Dacuy"
                fill
                priority
                sizes="48px"
                className="object-cover object-center"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[9px] text-signal mb-0.5">
                <span className="size-1 rounded-full bg-signal animate-ping" />
                <span>SD-SYSTEM // BOOT</span>
              </div>
              <h1 className="text-base font-semibold tracking-tight text-foreground truncate">
                Santino <span className="text-signal glow-text">Dacuy</span>
              </h1>
              <p className="font-mono text-[10px] text-muted-foreground truncate">
                Analista en Sistemas · UADER
              </p>
            </div>
          </div>

          {/* Desktop Left Column: Photo Card with Glowing Aura */}
          <div className="hidden sm:flex sm:col-span-5 flex-col items-center">
            <div className="group relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
              <div className="absolute -inset-2 rounded-2xl bg-signal/25 blur-xl -z-10" />
              <Image
                src="/SANyLEGO.jpeg"
                alt="Santino Dacuy"
                fill
                priority
                sizes="(max-width: 768px) 160px, 200px"
                className="object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-signal/40 bg-signal/20 px-2 py-0.5 font-mono text-[9px] text-signal backdrop-blur-md">
                {isGranted ? (
                  <>
                    <CheckCircle2 className="size-3 text-emerald-400" />
                    <span className="text-emerald-300">AUTORIZADO</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-3" />
                    VERIFICADO
                  </>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="font-mono text-xs font-semibold text-foreground flex items-center gap-1">
                  <Sparkles className="size-3 text-signal" />
                  Santino Dacuy
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">Analista en Sistemas</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground/80">
                <MapPin className="size-3 text-signal" />
                UADER · FCyT
              </span>
              <span className="size-1 rounded-full bg-white/20" />
              <span className="font-mono text-[10px] text-signal/80 flex items-center gap-1">
                <Cpu className="size-2.5" />
                x86_64
              </span>
            </div>
          </div>

          {/* Right Column: Console & Action Terminal */}
          <div className="sm:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4 w-full min-w-0">
            {/* Desktop Title Header */}
            <div className="hidden sm:block">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal">
                <span className="size-1.5 rounded-full bg-signal shadow-[0_0_8px] shadow-signal animate-ping" />
                <span>SD-SYSTEM // BOOT SEQUENCE</span>
              </div>

              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Santino <span className="text-signal glow-text">Dacuy</span>
              </h1>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Backend · Bases de Datos · Arquitectura
              </p>
            </div>

            {/* Real-time Terminal Log Window */}
            <div className="h-[140px] sm:h-[160px] rounded-xl border border-white/5 bg-black/75 p-2.5 sm:p-3 font-mono text-[10px] sm:text-[11px] flex flex-col justify-between shadow-inner backdrop-blur-md overflow-hidden w-full min-w-0">
              <div className="flex items-center justify-between gap-2 text-[9px] sm:text-[10px] text-muted-foreground/60 border-b border-white/5 pb-1.5 shrink-0 min-w-0">
                <span className="flex items-center gap-1.5 truncate min-w-0">
                  <Terminal className="size-3 text-signal shrink-0" />
                  <span className="truncate">consola_inicializacion.sh</span>
                </span>
                <span className="text-signal/90 font-semibold tracking-wider text-[9px] sm:text-[10px] shrink-0 whitespace-nowrap pl-1">
                  {isGranted ? 'STATUS: GRANTED' : isWaitingAuth ? 'STATUS: READY' : 'STATUS: BOOTING'}
                </span>
              </div>

              <div className="space-y-1 flex-1 flex flex-col justify-start overflow-hidden pt-1 min-w-0">
                {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] animate-in fade-in slide-in-from-left-2 duration-200 min-w-0">
                    <span className="text-muted-foreground truncate min-w-0 flex-1" title={log.text}>
                      <span className="text-signal mr-1 shrink-0">›</span>
                      {log.text}
                    </span>
                    <span className="shrink-0 text-[9px] sm:text-[10px] font-semibold text-signal whitespace-nowrap">
                      [{log.status}]
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual Progress Bar */}
            <div className="w-full min-w-0">
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-muted-foreground mb-1 min-w-0">
                <span className="truncate min-w-0 flex-1">
                  {isGranted
                    ? 'Acceso concedido. Abriendo...'
                    : isWaitingAuth
                    ? 'Autenticación biométrica lista'
                    : 'Cargando infraestructura...'}
                </span>
                <span className="text-signal font-semibold text-xs shrink-0 whitespace-nowrap">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="relative h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-white/[0.06] p-[1px] border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-75 ease-out ${
                    isGranted
                      ? 'bg-gradient-to-r from-emerald-400 to-signal shadow-[0_0_20px_rgba(52,211,153,0.9)]'
                      : 'bg-gradient-to-r from-signal via-cyan-400 to-violet-500 shadow-[0_0_15px_rgba(var(--signal),0.9)]'
                  }`}
                  style={{ width: `${Math.round(progress)}%` }}
                />
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-0.5 flex flex-col items-center gap-2 w-full min-w-0">
              {isGranted ? (
                <div className="w-full flex items-center justify-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/20 py-2.5 sm:py-3 text-emerald-300 font-mono text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(16,185,129,0.45)] animate-in zoom-in-95 duration-150">
                  <CheckCircle2 className="size-4 text-emerald-400 animate-bounce shrink-0" />
                  <span className="truncate">✓ ACCESO ACEPTADO · BIENVENIDO</span>
                </div>
              ) : isWaitingAuth ? (
                <div className="w-full space-y-2">
                  <button
                    type="button"
                    onClick={handleAuthorize}
                    disabled={isScanning}
                    className="w-full group relative inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-signal px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-semibold text-signal-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_35px_rgba(var(--signal),0.75)] active:scale-[0.98] cursor-pointer animate-in zoom-in-95"
                  >
                    {isScanning ? (
                      <>
                        <div className="size-4 rounded-full border-2 border-signal-foreground border-t-transparent animate-spin shrink-0" />
                        <span>Verificando biométrica...</span>
                      </>
                    ) : (
                      <>
                        <Fingerprint className="size-4 sm:size-5 transition-transform duration-200 group-hover:scale-110 shrink-0" />
                        <span>[ Desbloquear Acceso ]</span>
                        <Unlock className="size-4 transition-transform duration-200 group-hover:rotate-12 shrink-0" />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between px-1 text-[10px] font-mono text-muted-foreground/70">
                    <span>* Toque para ingresar</span>
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="text-signal/90 hover:underline cursor-pointer min-h-[32px] inline-flex items-center"
                    >
                      Omitir y ver sitio →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between gap-3 text-[10px] sm:text-[11px] min-w-0">
                  <span className="font-mono text-muted-foreground/60 flex items-center gap-1.5 truncate min-w-0">
                    <Lock className="size-3 text-signal/70 animate-pulse shrink-0" />
                    <span className="truncate">Sincronizando protocolos...</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="font-mono text-signal/80 transition-colors hover:text-signal cursor-pointer shrink-0 whitespace-nowrap min-h-[36px] inline-flex items-center px-2"
                  >
                    [ Saltear ]
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Footer credits */}
      <div
        className={`absolute bottom-2 sm:bottom-4 font-mono text-[9px] sm:text-[10px] text-muted-foreground/40 tracking-widest uppercase text-center px-2 transition-opacity duration-500 ${
          isFinished ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Santino Dacuy · Sistema de Portafolio · {new Date().getFullYear()}
      </div>
    </div>
  )
}
