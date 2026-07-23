import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, useGLTF, useTexture } from '@react-three/drei'
import { motion, useReducedMotion } from 'motion/react'
import * as THREE from 'three'

const modelUrl = '/assets/iphone-17-pro-greenlabz.glb'

function PhoneAsset({ isReady, reducedMotion }: { isReady: boolean; reducedMotion: boolean }) {
  const { scene } = useGLTF(modelUrl)
  const screenTexture = useTexture('/assets/phone-screen-meltzer.png')
  const group = useRef<THREE.Group>(null)
  const model = useMemo(() => scene.clone(true), [scene])
  const progress = useRef(0)
  const targetScale = useRef(1)
  const isMobile = useRef(false)

  useEffect(() => {
    const updateViewport = () => {
      isMobile.current = window.matchMedia('(max-width: 1079px)').matches
    }
    updateViewport()
    window.addEventListener('resize', updateViewport, { passive: true })
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.flipY = false
    screenTexture.wrapS = THREE.RepeatWrapping
    screenTexture.repeat.x = -1
    screenTexture.offset.x = 1
    screenTexture.anisotropy = 4
    screenTexture.needsUpdate = true

    model.position.set(0, 0, 0)
    model.rotation.set(0, 0, 0)
    model.scale.set(1, 1, 1)
    model.updateMatrixWorld(true)
    const bounds = new THREE.Box3().setFromObject(model)
    const size = bounds.getSize(new THREE.Vector3())
    const center = bounds.getCenter(new THREE.Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z)
    targetScale.current = 2.15 / maxDimension
    model.scale.setScalar(targetScale.current)
    model.position.copy(center).multiplyScalar(-targetScale.current)

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      object.castShadow = true
      object.receiveShadow = true
      const sourceMaterials = Array.isArray(object.material) ? object.material : [object.material]
      const materials = sourceMaterials.map((material) => material.clone())
      object.material = Array.isArray(object.material) ? materials : materials[0]
      materials.forEach((material) => {
        if (material.name === 'OLED' && material instanceof THREE.MeshStandardMaterial) {
          material.map = screenTexture
          material.emissiveMap = screenTexture
          material.emissive.set('#ffffff')
          material.emissiveIntensity = .35
        }
        material.transparent = true
        material.userData.greenlabzBaseOpacity = material.opacity
        material.needsUpdate = true
      })
    })
  }, [model, screenTexture])

  useFrame((state, delta) => {
    if (!group.current) return
    if (!isReady) {
      progress.current = 0
      group.current.rotation.set(-0.12, 0, 0.075)
      group.current.position.y = 0
      group.current.position.x = 0
      group.current.scale.setScalar(.72)
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => {
          material.opacity = 0
        })
      })
      return
    }
    progress.current = reducedMotion ? 1 : Math.min(progress.current + delta / 5.2, 1)
    const eased = 1 - Math.pow(1 - progress.current, 4)
    const alpha = reducedMotion ? 1 : THREE.MathUtils.smoothstep(progress.current, 0, 0.86)

    group.current.rotation.set(-0.12, eased * Math.PI, 0.075)
    group.current.position.y = isMobile.current ? 0 : Math.sin(state.clock.getElapsedTime() * 0.8) * 0.035
    group.current.position.x = 0
    group.current.scale.setScalar(THREE.MathUtils.lerp(0.72, 1, eased))

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach((material) => {
        material.opacity = (material.userData.greenlabzBaseOpacity ?? 1) * alpha
      })
    })
  })

  return <group ref={group}><primitive object={model} /></group>
}

useGLTF.preload(modelUrl)

export default function IPhoneModel({ isReady, mobileScrollTrigger = true }: { isReady: boolean; mobileScrollTrigger?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const reducedMotion = useReducedMotion() ?? false

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1079px)')
    const updateViewport = () => setIsMobile(media.matches)
    updateViewport()
    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (!isMobile || !mobileScrollTrigger) {
      setHasEntered(true)
      return
    }
    const activateOnScroll = () => {
      if (window.scrollY > 80) {
        setHasEntered(true)
        window.removeEventListener('scroll', activateOnScroll)
      }
    }
    setHasEntered(window.scrollY > 80)
    window.addEventListener('scroll', activateOnScroll, { passive: true })
    return () => window.removeEventListener('scroll', activateOnScroll)
  }, [isMobile, mobileScrollTrigger])

  return (
    <motion.div
      ref={wrapperRef}
      className="iphone-canvas"
      aria-hidden="true"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      animate={{ opacity: isReady ? 1 : 0, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { opacity: { duration: 1.05, ease: [0.22, 1, 0.36, 1] }, y: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.4], fov: 30 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 6]} intensity={3.4} color="#f1f8ed" />
        <directionalLight position={[-4, 1, 2]} intensity={1.1} color="#5f9d76" />
        <pointLight position={[0, -2, 3]} intensity={1} distance={8} color="#84c79b" />
        <PhoneAsset reducedMotion={reducedMotion} isReady={!isMobile || !mobileScrollTrigger || (isReady && hasEntered)} />
        <ContactShadows position={[0, -2.25, 0]} opacity={.34} scale={4.6} blur={2.7} far={4} color="#00150c" />
        <Environment preset="studio" environmentIntensity={.42} />
      </Canvas>
    </motion.div>
  )
}
