import { useEffect, useRef } from 'react'

export default function GreenLabzLaser() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Laser particle structure
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      life: number
      maxLife: number
    }> = []

    let laserX = 0
    let speed = 2.8

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Move beam head across width
      laserX += speed
      if (laserX > width + 100) {
        laserX = -100
      }

      const beamY = height * 0.72 // Near the bottom line of text

      // Spawn fresh GreenLabz emerald sparks at the laser tip
      if (laserX >= 0 && laserX <= width) {
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: laserX + (Math.random() - 0.5) * 20,
            y: beamY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.8) * 2.2, // Float upward
            size: Math.random() * 2.5 + 1,
            alpha: 1,
            life: 0,
            maxLife: Math.random() * 45 + 25,
          })
        }
      }

      // Draw horizontal laser beam line
      if (laserX > 0) {
        const beamGradient = ctx.createLinearGradient(
          Math.max(0, laserX - 220),
          beamY,
          laserX,
          beamY
        )
        beamGradient.addColorStop(0, 'rgba(0, 255, 136, 0)')
        beamGradient.addColorStop(0.7, 'rgba(0, 255, 136, 0.4)')
        beamGradient.addColorStop(0.95, 'rgba(0, 255, 136, 0.95)')
        beamGradient.addColorStop(1, '#ffffff')

        ctx.save()
        ctx.shadowColor = '#00ff88'
        ctx.shadowBlur = 18
        ctx.strokeStyle = beamGradient
        ctx.lineWidth = 3.5
        ctx.beginPath()
        ctx.moveTo(Math.max(0, laserX - 220), beamY)
        ctx.lineTo(laserX, beamY)
        ctx.stroke()

        // Core white-hot center line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(Math.max(0, laserX - 100), beamY)
        ctx.lineTo(laserX, beamY)
        ctx.stroke()
        ctx.restore()
      }

      // Render & update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.alpha = 1 - p.life / p.maxLife

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha * 0.95})`
        ctx.shadowColor = '#00ff88'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="greenlabz-laser-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4,
      }}
    />
  )
}
