'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const container = containerRef.current
    const isMobile = window.innerWidth < 768
    let isPageVisible = !document.hidden
    let isPreloaderDone =
      typeof window !== 'undefined' && sessionStorage.getItem('sd_portfolio_loaded') === 'true'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 8

    // Antialias solo en desktop para no consumir ancho de banda de GPU móvil
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    // 1. Campo base de estrellas sutiles adaptado al dispositivo
    const count = isMobile ? 220 : 600
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorCyan = new THREE.Color('#22d3ee')
    const colorViolet = new THREE.Color('#8b5cf6')

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * (isMobile ? 16 : 22)
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = -Math.random() * 8

      const col = Math.random() > 0.5 ? colorCyan : colorViolet
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // 2. Orbes luminosos sutiles con textura circular
    const orbCount = isMobile ? 10 : 26
    const orbGeo = new THREE.BufferGeometry()
    const orbPositions = new Float32Array(orbCount * 3)
    const orbColors = new Float32Array(orbCount * 3)

    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.25, 'rgba(34, 211, 238, 0.8)')
      grad.addColorStop(0.6, 'rgba(139, 92, 246, 0.25)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 32, 32)
    }
    const orbTexture = new THREE.CanvasTexture(canvas)

    for (let i = 0; i < orbCount; i++) {
      orbPositions[i * 3] = (Math.random() - 0.5) * (isMobile ? 18 : 24)
      orbPositions[i * 3 + 1] = (Math.random() - 0.5) * 16
      orbPositions[i * 3 + 2] = -3 - Math.random() * 6

      const col = Math.random() > 0.45 ? colorCyan : colorViolet
      orbColors[i * 3] = col.r
      orbColors[i * 3 + 1] = col.g
      orbColors[i * 3 + 2] = col.b
    }

    orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPositions, 3))
    orbGeo.setAttribute('color', new THREE.BufferAttribute(orbColors, 3))

    const orbMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.32 : 0.26,
      map: orbTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const orbs = new THREE.Points(orbGeo, orbMaterial)
    scene.add(orbs)

    const mouse = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', resize, { passive: true })

    const handleVisibility = () => {
      isPageVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    let preloaderTimeout: NodeJS.Timeout | null = null
    const handlePreloaderComplete = () => {
      preloaderTimeout = setTimeout(() => {
        isPreloaderDone = true
      }, 250)
    }
    window.addEventListener('sd-preloader-complete', handlePreloaderComplete)

    const clock = new THREE.Clock()
    let raf = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)

      // No renderizar si la pestaña está oculta o si el preloader aún cubre toda la pantalla
      if (!isPageVisible || !isPreloaderDone) return

      const t = clock.getElapsedTime()

      // Rotación suave del campo base
      points.rotation.y = t * 0.015
      points.rotation.x = Math.sin(t * 0.04) * 0.03

      // Orbes luminosos respirando
      orbs.rotation.y = t * 0.012
      orbs.rotation.x = Math.cos(t * 0.03) * 0.02
      orbMaterial.opacity = 0.65 + Math.sin(t * 1.8) * 0.15

      // Parallax solo si hay cursor de mouse
      if (!isMobile) {
        points.position.x += (mouse.x * 0.35 - points.position.x) * 0.02
        points.position.y += (-mouse.y * 0.35 - points.position.y) * 0.02

        orbs.position.x += (mouse.x * 0.5 - orbs.position.x) * 0.015
        orbs.position.y += (-mouse.y * 0.5 - orbs.position.y) * 0.015

        camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.025
        camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.025
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (preloaderTimeout) clearTimeout(preloaderTimeout)
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('sd-preloader-complete', handlePreloaderComplete)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      orbGeo.dispose()
      orbMaterial.dispose()
      orbTexture.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
}
