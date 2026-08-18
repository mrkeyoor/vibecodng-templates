// Signature hero: a real three.js viewport via @react-three/fiber.
// Floating primitives — faceted icosahedron, accent metal torus knot, and a
// glass triangular prism (the Prism logo mark) — under studio lighting with
// RoomEnvironment reflections (generated on the GPU, no HDR download).
// Slow orbit + pointer parallax; small octahedron shards drift at depth.
// Perf contract: DPR capped at 2; the R3F frameloop is switched to 'never'
// when the hero leaves the viewport (IntersectionObserver) or the document
// hides; prefers-reduced-motion renders a single posed frame (frameloop
// 'never' after first render, no animation hooks run).
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

function StudioEnvironment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

const SHARDS = [
  { pos: [-3.1, 1.7, -1.8], scale: 0.16, speed: 1.3 },
  { pos: [3.3, 1.9, -2.2], scale: 0.13, speed: 1.7 },
  { pos: [-2.6, -1.5, -1.2], scale: 0.11, speed: 2.1 },
  { pos: [2.8, -1.2, -0.8], scale: 0.14, speed: 1.1 },
  { pos: [0.4, 2.3, -2.6], scale: 0.1, speed: 1.9 },
]

function Rig({ pointer, reduced }) {
  const group = useRef(null)
  const ico = useRef(null)
  const knot = useRef(null)
  const prism = useRef(null)
  const shardRefs = useRef([])

  useFrame((state, delta) => {
    if (reduced) return
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const dt = Math.min(delta, 0.05)
    // slow orbit + pointer parallax (lerped, so it eases)
    g.rotation.y += dt * 0.16
    const px = pointer.current.x
    const py = pointer.current.y
    g.rotation.x += ((py * 0.14) - g.rotation.x) * 0.04
    state.camera.position.x += ((px * 0.7) - state.camera.position.x) * 0.04
    state.camera.position.y += ((0.5 - py * 0.5) - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
    // float + tumble
    if (ico.current) {
      ico.current.position.y = 0.4 + Math.sin(t * 0.8) * 0.18
      ico.current.rotation.x = t * 0.21
      ico.current.rotation.z = t * 0.13
    }
    if (knot.current) {
      knot.current.position.y = 0.55 + Math.sin(t * 0.7 + 2.1) * 0.16
      knot.current.rotation.y = t * 0.3
    }
    if (prism.current) {
      prism.current.position.y = -0.1 + Math.sin(t * 0.9 + 4.2) * 0.14
      prism.current.rotation.y = t * 0.24
    }
    shardRefs.current.forEach((shard, i) => {
      if (!shard) return
      shard.position.y = SHARDS[i].pos[1] + Math.sin(t * SHARDS[i].speed + i * 1.7) * 0.22
      shard.rotation.x = t * 0.5 * SHARDS[i].speed
      shard.rotation.y = t * 0.35 * SHARDS[i].speed
    })
  })

  return (
    <group ref={group}>
      {/* faceted chrome icosahedron */}
      <mesh ref={ico} position={[-2.35, 0.4, -0.5]}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial color="#dfe6f2" metalness={0.92} roughness={0.18} flatShading envMapIntensity={1.2} />
      </mesh>
      {/* accent metal torus knot */}
      <mesh ref={knot} position={[2.35, 0.55, -0.7]} rotation={[0.4, 0, 0]}>
        <torusKnotGeometry args={[0.62, 0.2, 200, 28]} />
        <meshStandardMaterial color="#43e0c8" metalness={1} roughness={0.24} envMapIntensity={1.3} />
      </mesh>
      {/* the Prism mark: glass triangular prism */}
      <mesh ref={prism} position={[0, -0.1, 0.7]} rotation={[0.45, 0.7, 0.18]}>
        <cylinderGeometry args={[1.0, 1.0, 1.3, 3]} />
        <meshPhysicalMaterial
          color="#eaf4ff"
          metalness={0.1}
          roughness={0.03}
          transmission={0.7}
          thickness={0.5}
          ior={1.5}
          dispersion={3}
          iridescence={0.9}
          iridescenceIOR={1.3}
          clearcoat={1}
          flatShading
          envMapIntensity={1.6}
        />
      </mesh>
      {/* drifting shards at depth */}
      {SHARDS.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale} ref={(el) => { shardRefs.current[i] = el }}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#7c9bff" metalness={0.85} roughness={0.3} envMapIntensity={1.1} />
        </mesh>
      ))}
      {/* viewport grid floor */}
      <gridHelper args={[16, 32, '#2c4a55', '#17202e']} position={[0, -1.7, 0]} />
    </group>
  )
}

export default function PrismScene() {
  const hostRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [frameloop, setFrameloop] = useState(reduced ? 'demand' : 'always')

  useEffect(() => {
    if (reduced) return undefined // one posed frame, no listeners
    const host = hostRef.current
    const section = host?.closest('section')
    if (!host || !section) return undefined

    let inView = true
    const sync = () => setFrameloop(inView && !document.hidden ? 'always' : 'never')
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync() }, { threshold: 0 })
    io.observe(host)
    const onVis = () => sync()
    document.addEventListener('visibilitychange', onVis)
    const onMove = (event) => {
      const rect = section.getBoundingClientRect()
      pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    section.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      section.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  return (
    <div ref={hostRef} className="relative h-[19rem] w-full sm:h-[21rem]" role="img" aria-label="Interactive 3D preview of Prism library assets">
      <Canvas
        dpr={[1, 2]}
        frameloop={frameloop}
        camera={{ position: [0, 0.5, 7.6], fov: 33 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <StudioEnvironment />
        </Suspense>
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <pointLight position={[-5, -2, 3]} intensity={12} color="#43e0c8" />
        <Rig pointer={pointer} reduced={reduced} />
      </Canvas>
    </div>
  )
}
