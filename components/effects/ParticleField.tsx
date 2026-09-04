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
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const count = 900
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const colorCyan = new THREE.Color('#22d3ee')
    const colorViolet = new THREE.Color('#8b5cf6')

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      const col = Math.random() > 0.5 ? colorCyan : colorViolet
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const mouse = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', resize)

    const clock = new THREE.Clock()
    let raf = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      points.rotation.y = t * 0.02
      points.rotation.x = Math.sin(t * 0.05) * 0.05

      points.position.x += (mouse.x * 0.4 - points.position.x) * 0.02
      points.position.y += (-mouse.y * 0.4 - points.position.y) * 0.02

      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.03
      camera.position.y += (-mouse.y * 0.6 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
}
