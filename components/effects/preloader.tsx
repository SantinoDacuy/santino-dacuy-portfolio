'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Layers,
  Database,
  Cpu,
  MapPin,
  Fingerprint,
  CheckCircle2,
  Lock,
  Unlock,
} from 'lucide-react'

const bootLogs = [
  { text: 'Iniciando runtime de arquitectura y sistemas...', status: 'OK' },
  { text: 'Conectando con PostgreSQL & Data Warehouse...', status: 'OK' },
  { text: 'Verificando modelos dimensionales & pipelines ETL...', status: 'READY' },
  { text: 'Autenticando credenciales de visitante...', status: 'VERIFIED' },
  { text: 'Cargando perfil profesional de Santino Dacuy...', status: 'DONE' },
  { text: 'Control de acceso biométrico listo. Requiere confirmación.', status: 'STANDBY' },
]

export function Preloader() {
  const [logIndex, setLogIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const [isWaitingAuth, setIsWaitingAuth] = useState(false)
  const [isGranted, setIsGranted] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('sd_portfolio_loaded')
    if (hasSeen === 'true') {
      setShouldRender(false)
      return
    }

    document.body.style.overflow = 'hidden'

    // Duración extendida y disfrutable: ~8.5 segundos con progresión orgánica y realista
    const totalDuration = 8500
    const intervalMs = 50
    const totalTicks = totalDuration / intervalMs
    let currentTick = 0

    const timer = setInterval(() => {
      currentTick += 1
      const rawProgress = (currentTick / totalTicks) * 100

      // Progresión orgánica con pausas de compilación / verificación realistas
      let adjustedProgress = rawProgress
      if (rawProgress > 32 && rawProgress < 46) {
        // Pausa breve en verificación de bases de datos
        adjustedProgress = 32 + (rawProgress - 32) * 0.4
      } else if (rawProgress > 65 && rawProgress < 80) {
        // Pausa breve en carga de pipelines y arquitectura
        adjustedProgress = 48 + (rawProgress - 65) * 0.55
      }

      setProgress((_) => {
        const next = Math.min(100, adjustedProgress)

        if (next >= 100 || currentTick >= totalTicks) {
          clearInterval(timer)
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
      clearInterval(timer)
      document.body.style.overflow = ''
    }
  }, [])

  // Acción interactiva del usuario para autenticar y acceder
  const handleAuthorize = () => {
    if (isScanning || isGranted) return

    setIsScanning(true)

    // Efecto de escaneo biométrico con feedback visual (1s)
    setTimeout(() => {
      setIsScanning(false)
      setIsGranted(true)

      // Mensaje de éxito "ACCESO ACEPTADO" y transición con giro 3D hacia el sitio
      setTimeout(() => {
        setIsFinished(true)
        sessionStorage.setItem('sd_portfolio_loaded', 'true')
        // Notificamos al window para orquestar la entrada cinematográfica del Hero
        window.dispatchEvent(new CustomEvent('sd-preloader-complete'))

        setTimeout(() => {
          document.body.style.overflow = ''
          setShouldRender(false)
        }, 1300)
      }, 1200)
    }, 950)
  }

  // Opción rápida para omitir si tiene prisa
  const handleSkip = () => {
    setIsFinished(true)
    sessionStorage.setItem('sd_portfolio_loaded', 'true')
    window.dispatchEvent(new CustomEvent('sd-preloader-complete'))
    setTimeout(() => {
      document.body.style.overflow = ''
      setShouldRender(false)
    }, 700)
  }

  if (!shouldRender) return null

  return (
    <div
      style={{ perspective: '1400px' }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden transition-all duration-1000 ease-in-out ${
        isFinished
          ? 'bg-transparent backdrop-blur-0 pointer-events-none'
          : 'bg-background/95 backdrop-blur-xl pointer-events-auto'
      }`}
    >
      {/* Dynamic ambient backgrounds and cyber grids for Preloader */}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
          isFinished ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Pulsing Luminous Beacons */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-signal/15 blur-[160px] animate-pulse transition-all duration-1000" />
        <div className="absolute -bottom-20 right-1/4 size-[550px] rounded-full bg-violet-600/15 blur-[180px]" />
        <div className="absolute -top-10 left-10 size-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />

        {/* Concentric Cyber Radar Rings centered behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[850px] rounded-full border border-signal/[0.08] pointer-events-none animate-[spin_80s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full border border-dashed border-signal/[0.12] pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] rounded-full border border-white/[0.05] pointer-events-none" />

        {/* High-tech Precision Grid & Telemetry Crosshairs */}
        <div className="grid-lines absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]" />

        {/* Corner Telemetry HUD brackets */}
        <div className="absolute top-8 left-8 hidden sm:flex flex-col gap-1 font-mono text-[10px] text-signal/40 tracking-wider">
          <span className="flex items-center gap-1.5"><span className="size-1 bg-signal/60 rounded-full animate-ping" />SYSTEM // CORE_ONLINE</span>
          <span>LAT: -31.73197 | LON: -60.5238</span>
        </div>
        <div className="absolute top-8 right-8 hidden sm:flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground/40 tracking-wider">
          <span>PORTFOLIO_OS // BUILD 2026.09</span>
          <span>INITIALIZATION_STATION</span>
        </div>
      </div>

      {/* Main Glass Experience Center with Cinematic 3D Spin & Depth Zoom Exit */}
      <div
        className={`relative mx-auto w-full max-w-lg sm:max-w-2xl max-h-[90svh] overflow-y-auto sm:overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 glass p-5 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 transition-all duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFinished
            ? 'scale-50 rotate-y-[65deg] -rotate-x-12 translate-y-16 blur-md opacity-0'
            : 'scale-100 rotate-y-0 rotate-x-0 translate-y-0 blur-0 opacity-100'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Subtle holographic cyber scan line animation across the card */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-signal/[0.04] to-transparent animate-pulse" />

        <div className="grid gap-5 sm:gap-8 sm:grid-cols-12 items-center">
          
          {/* Mobile compact header (visible only on small phones) */}
          <div className="flex sm:hidden items-center gap-3.5 pb-2 border-b border-white/10">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-signal/40 shadow-md">
              <Image
                src="/SANyLEGO.jpeg"
                alt="Santino Dacuy"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[9px] text-signal mb-1">
                <span className="size-1 rounded-full bg-signal animate-ping" />
                <span>SD-SYSTEM // BOOT</span>
              </div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground truncate">
                Santino <span className="text-signal glow-text">Dacuy</span>
              </h1>
              <p className="font-mono text-[10px] text-muted-foreground truncate">
                Analista en Sistemas · UADER
              </p>
            </div>
          </div>

          {/* Desktop Left Column: Photo Card with Glowing Aura (Hidden on small mobile to give room) */}
          <div className="hidden sm:flex sm:col-span-5 flex-col items-center">
            <div className="group relative aspect-[3/4] w-full max-w-[210px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
              {/* Pulsing halo behind photo */}
              <div className="absolute -inset-2 rounded-2xl bg-signal/25 blur-xl -z-10" />
              
              <Image
                src="/SANyLEGO.jpeg"
                alt="Santino Dacuy"
                fill
                priority
                className="object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

              {/* Status badge inside photo */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-signal/40 bg-signal/20 px-2 py-0.5 font-mono text-[9px] text-signal backdrop-blur-md shadow-[0_0_10px_rgba(var(--signal),0.3)]">
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

              {/* Monogram tag inside photo */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="font-mono text-xs font-semibold text-foreground flex items-center gap-1">
                  <Sparkles className="size-3 text-signal" />
                  Santino Dacuy
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">Analista en Sistemas</p>
              </div>
            </div>

            {/* University Tag & Latency Info */}
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

          {/* Right Column (Full width on mobile): Interactive System Console */}
          <div className="sm:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
            {/* Desktop Title Header */}
            <div className="hidden sm:block">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal">
                <span className="size-1.5 rounded-full bg-signal shadow-[0_0_8px] shadow-signal animate-ping" />
                <span>SD-SYSTEM // BOOT SEQUENCE</span>
              </div>

              <h1 className="mt-2.5 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-pretty">
                Santino <span className="text-signal glow-text">Dacuy</span>
              </h1>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Backend · Bases de Datos · Arquitectura
              </p>
            </div>

            {/* Real-time Terminal Log Window - Fixed height & responsive */}
            <div className="h-[155px] sm:h-[178px] rounded-xl border border-white/5 bg-black/75 p-3 sm:p-3.5 font-mono text-[11px] flex flex-col justify-between shadow-inner backdrop-blur-md overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 border-b border-white/5 pb-1.5 shrink-0">
                <span className="flex items-center gap-1.5 truncate">
                  <Terminal className="size-3 text-signal shrink-0" />
                  consola_inicializacion.sh
                </span>
                <span className="text-signal/90 font-semibold tracking-wider text-[9px] sm:text-[10px] shrink-0">
                  {isGranted ? 'GRANTED' : isWaitingAuth ? 'WAITING' : 'BOOTING'}
                </span>
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col justify-start overflow-hidden pt-1">
                {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                  <div key={i} className="flex items-center justify-between gap-1.5 text-[10px] sm:text-[11px] animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-muted-foreground truncate">
                      <span className="text-signal mr-1 shrink-0">›</span>
                      {log.text}
                    </span>
                    <span className="shrink-0 text-[9px] sm:text-[10px] font-semibold text-signal">
                      [{log.status}]
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glowing Dual Progress Bar */}
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-muted-foreground mb-1.5">
                <span className="truncate pr-2">
                  {isGranted
                    ? 'Acceso concedido...'
                    : isWaitingAuth
                    ? 'Autenticación requerida'
                    : 'Cargando infraestructura...'}
                </span>
                <span className="text-signal font-semibold text-xs shrink-0">{Math.round(progress)}%</span>
              </div>

              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06] p-[1px] border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-100 ease-out ${
                    isGranted
                      ? 'bg-gradient-to-r from-emerald-400 to-signal shadow-[0_0_20px_rgba(52,211,153,0.9)]'
                      : 'bg-gradient-to-r from-signal via-cyan-400 to-violet-500 shadow-[0_0_15px_rgba(var(--signal),0.9)]'
                  }`}
                  style={{ width: `${Math.round(progress)}%` }}
                />
              </div>
            </div>

            {/* Interactive Action Area */}
            <div className="pt-1 flex flex-col items-center gap-2">
              {isGranted ? (
                /* Éxito: Acceso Aceptado */
                <div className="w-full flex items-center justify-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/20 py-2.5 sm:py-3 text-emerald-300 font-mono text-xs sm:text-sm font-semibold shadow-[0_0_30px_rgba(16,185,129,0.45)] animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="size-4 text-emerald-400 animate-bounce" />
                  <span>✓ ACCESO ACEPTADO · BIENVENIDO</span>
                </div>
              ) : isWaitingAuth ? (
                /* Botón Divertido de Acción Requerida */
                <div className="w-full space-y-1.5">
                  <button
                    type="button"
                    onClick={handleAuthorize}
                    disabled={isScanning}
                    className="w-full group relative inline-flex items-center justify-center gap-2 rounded-full bg-signal px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-semibold text-signal-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_40px_rgba(var(--signal),0.75)] active:scale-98 cursor-pointer animate-in zoom-in-95"
                  >
                    {isScanning ? (
                      <>
                        <div className="size-3.5 sm:size-4 rounded-full border-2 border-signal-foreground border-t-transparent animate-spin" />
                        <span>Verificando biométrica...</span>
                      </>
                    ) : (
                      <>
                        <Fingerprint className="size-4 sm:size-4.5 transition-transform duration-200 group-hover:scale-110" />
                        <span>[ Desbloquear Acceso ]</span>
                        <Unlock className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:rotate-12" />
                      </>
                    )}
                  </button>
                  <p className="font-mono text-[9px] sm:text-[10px] text-center text-muted-foreground/60">
                    * Confirmación de seguridad requerida para entrar
                  </p>
                </div>
              ) : (
                /* Estado durante el arranque inicial */
                <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px]">
                  <span className="font-mono text-muted-foreground/60 flex items-center gap-1.5">
                    <Lock className="size-3 text-signal/70 animate-pulse" />
                    Sincronizando...
                  </span>
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="font-mono text-muted-foreground/60 transition-colors hover:text-signal cursor-pointer"
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
        className={`absolute bottom-3 sm:bottom-6 font-mono text-[9px] sm:text-[10px] text-muted-foreground/40 tracking-widest uppercase text-center px-4 transition-opacity duration-700 ${
          isFinished ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Santino Dacuy · Sistema de Portafolio · {new Date().getFullYear()}
      </div>
    </div>
  )
}
