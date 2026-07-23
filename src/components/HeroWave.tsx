import { useEffect, useRef } from 'react'

const TAU = Math.PI * 2
const TABLE_SIZE = 1024

export default function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sinTable = new Float32Array(TABLE_SIZE)
    const cosTable = new Float32Array(TABLE_SIZE)

    for (let index = 0; index < TABLE_SIZE; index += 1) {
      const angle = (index / TABLE_SIZE) * TAU
      sinTable[index] = Math.sin(angle)
      cosTable[index] = Math.cos(angle)
    }

    const fastSin = (value: number) => {
      const index = Math.floor(((value % TAU + TAU) % TAU) / TAU * TABLE_SIZE) & (TABLE_SIZE - 1)
      return sinTable[index]
    }

    const fastCos = (value: number) => {
      const index = Math.floor(((value % TAU + TAU) % TAU) / TAU * TABLE_SIZE) & (TABLE_SIZE - 1)
      return cosTable[index]
    }

    let width = 0
    let height = 0
    let pixels: ImageData | null = null
    let data: Uint8ClampedArray | null = null
    let frame = 0
    let start = performance.now()
    let visible = true

    const resize = () => {
      const scale = window.innerWidth < 768 ? 6 : 10
      width = Math.max(1, Math.floor(window.innerWidth / scale))
      height = Math.max(1, Math.floor(window.innerHeight / scale))
      canvas.width = width
      canvas.height = height
      pixels = context.createImageData(width, height)
      data = pixels.data
      start = performance.now()
    }

    const draw = (now: number) => {
      frame = 0
      if (!visible || document.hidden || !pixels || !data) return

      const time = (now - start) * 0.001

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const ux = (2 * x - width) / height
          const uy = (2 * y - height) / height
          let a = 0
          let d = 0

          for (let layer = 0; layer < 3; layer += 1) {
            a += fastCos(layer - d + time * 0.5 - a * ux)
            d += fastSin(layer * uy + a)
          }

          const wave = (fastSin(a) + fastCos(d)) * 0.5
          const glow = Math.max(0, Math.min(1, 0.5 + wave * 0.5))
          const filament = Math.pow(Math.max(0, 0.5 + 0.5 * fastSin(a * 1.7 + d * 1.1 + time * 0.35)), 3)
          const ridge = Math.pow(Math.max(0, 0.5 + 0.5 * fastCos(a * 0.9 - d * 1.8 - time * 0.22)), 4)
          const light = Math.min(1, 0.14 + glow * 0.28 + filament * 0.52 + ridge * 0.24)
          const distance = Math.hypot(ux * 0.72, uy * 0.88)
          const vignette = Math.max(0, Math.min(1, 1 - distance))
          const pulse = 0.78 + 0.22 * fastSin(time * 0.65 + ux * 2)
          const intensity = (0.28 + vignette * 0.72) * pulse
          const index = (y * width + x) * 4

          data[index] = Math.round((2 + light * 28) * intensity)
          data[index + 1] = Math.round((16 + light * 184) * intensity)
          data[index + 2] = Math.round((25 + light * 118) * intensity)
          data[index + 3] = Math.round((26 + light * 214) * intensity)
        }
      }

      context.putImageData(pixels, 0, 0)
      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }

    const resume = () => {
      if (!document.hidden && visible && !frame) frame = requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) resume()
    }, { threshold: 0 })

    resize()
    observer.observe(canvas)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', resume)

    if (reducedMotion) draw(performance.now())
    else frame = requestAnimationFrame(draw)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', resume)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className="gl-hero-wave" aria-hidden="true" />
}
