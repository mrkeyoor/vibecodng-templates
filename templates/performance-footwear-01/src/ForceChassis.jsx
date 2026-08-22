import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'

const phaseMap = {
  Touchdown: { pitch: 0.16, forceX: -1.25, load: 0.72, label: 'Heel load enters the carrier' },
  Midstance: { pitch: 0, forceX: -0.05, load: 1, label: 'Load spreads through the chassis' },
  'Toe-off': { pitch: -0.14, forceX: 1.35, load: 0.84, label: 'Forefoot wing releases forward' },
}

function profile(points, depth, bevel = 0.08) {
  const shape = new THREE.Shape()
  points.forEach(([x, y], index) => index ? shape.lineTo(x, y) : shape.moveTo(x, y))
  shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 16,
  })
  geometry.center()
  return geometry
}

function ChassisModel({ exploded, activeLayer, phase, rotation, reduced }) {
  const group = useRef()
  const upper = useRef()
  const carrier = useRef()
  const outsole = useRef()
  const force = useRef()
  const { invalidate } = useThree()
  const geometries = useMemo(() => ({
    upper: profile([
      [-2.1, -0.34], [-1.92, 0.16], [-1.28, 0.42], [-0.58, 0.9],
      [0.05, 0.74], [0.62, 0.42], [1.88, 0.05], [2.18, -0.18], [2.05, -0.38],
    ], 0.82, 0.11),
    carrier: profile([
      [-2.15, 0.12], [-1.72, 0.2], [-0.52, 0.13], [0.58, 0.17],
      [1.58, 0.08], [2.22, -0.03], [2.05, -0.31], [0.92, -0.38],
      [-0.2, -0.31], [-1.45, -0.36], [-2.14, -0.2],
    ], 0.9, 0.08),
    outsole: profile([
      [-2.12, 0.08], [-0.9, 0.02], [0.26, 0.08], [1.32, 0.03],
      [2.12, -0.06], [2.02, -0.24], [0.82, -0.28], [-0.42, -0.2],
      [-1.66, -0.29], [-2.16, -0.14],
    ], 0.94, 0.05),
  }), [])

  useEffect(() => () => Object.values(geometries).forEach(geometry => geometry.dispose()), [geometries])

  useFrame((_, delta) => {
    const phaseState = phaseMap[phase]
    const speed = reduced ? 1 : Math.min(1, delta * 7)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation, speed)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, phaseState.pitch, speed)
    upper.current.position.y = THREE.MathUtils.lerp(upper.current.position.y, exploded ? 1.15 : 0.42, speed)
    carrier.current.position.y = THREE.MathUtils.lerp(carrier.current.position.y, exploded ? -0.05 : -0.14, speed)
    outsole.current.position.y = THREE.MathUtils.lerp(outsole.current.position.y, exploded ? -0.92 : -0.48, speed)
    force.current.position.x = THREE.MathUtils.lerp(force.current.position.x, phaseState.forceX, speed)
    force.current.scale.setScalar(THREE.MathUtils.lerp(force.current.scale.x, phaseState.load, speed))
    if (reduced) invalidate()
  })

  const faded = name => activeLayer !== 'All' && activeLayer !== name
  return <group ref={group} rotation={[0.08, rotation, 0]} position={[0, -0.05, 0]}>
    <group ref={upper} position={[0, 0.42, 0]}>
      <mesh geometry={geometries.upper} castShadow>
        <meshPhysicalMaterial color="#dfe5df" roughness={0.72} metalness={0.02} transparent opacity={faded('Upper') ? 0.15 : 0.92} wireframe={activeLayer === 'Upper'} />
      </mesh>
      {[...Array(5)].map((_, index) => <mesh key={index} position={[-0.38 + index * 0.27, 0.28 - Math.abs(index - 2) * 0.025, 0.47]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.05, 0.72, 0.045]} />
        <meshStandardMaterial color="#ff5835" />
      </mesh>)}
    </group>
    <mesh ref={carrier} geometry={geometries.carrier} position={[0, -0.14, 0]} castShadow>
      <meshPhysicalMaterial color="#2249d8" roughness={0.34} metalness={0.18} transparent opacity={faded('Carrier') ? 0.16 : 1} wireframe={activeLayer === 'Carrier'} />
    </mesh>
    <mesh ref={outsole} geometry={geometries.outsole} position={[0, -0.48, 0]} castShadow>
      <meshStandardMaterial color="#11161e" roughness={0.9} transparent opacity={faded('Outsole') ? 0.18 : 1} wireframe={activeLayer === 'Outsole'} />
    </mesh>
    <mesh ref={force} rotation={[Math.PI / 2, 0, 0]} position={[-1.25, -0.78, 0]}>
      <torusGeometry args={[0.46, 0.045, 16, 72]} />
      <meshBasicMaterial color="#ff5835" />
    </mesh>
    <gridHelper args={[7, 14, '#ff5835', '#283244']} position={[0, -1.02, 0]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
      <planeGeometry args={[7, 4]} />
      <shadowMaterial transparent opacity={0.28} />
    </mesh>
  </group>
}

export default function ForceChassis({ exploded, activeLayer, phase, rotation, onRotate }) {
  const [reduced, setReduced] = useState(false)
  const drag = useRef(null)

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const pointerDown = event => {
    drag.current = { x: event.clientX, rotation }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const pointerMove = event => {
    if (!drag.current || reduced) return
    onRotate(drag.current.rotation + (event.clientX - drag.current.x) * 0.008)
  }
  const pointerUp = event => {
    drag.current = null
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return <div className="force-canvas" data-phase={phase.toLowerCase().replace('-', '')}
    onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
    <Canvas
      aria-label="Interactive three-dimensional Vector 01 force chassis"
      role="img"
      camera={{ position: [0, 0.15, 6.7], fov: 38 }}
      dpr={[1, 1.5]}
      shadows
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.65} />
      <directionalLight position={[4, 5, 5]} intensity={4.2} castShadow />
      <pointLight position={[-4, 0, 2]} color="#ff5835" intensity={14} distance={9} />
      <ChassisModel exploded={exploded} activeLayer={activeLayer} phase={phase} rotation={rotation} reduced={reduced} />
    </Canvas>
    <div className="canvas-reticle" aria-hidden="true"><i /><i /><span>OPTICAL BAY / LIVE MODEL</span></div>
    <p className="drag-note">{reduced ? 'Static pose · motion preference respected' : 'Drag to rotate · controls provide non-drag access'}</p>
  </div>
}
