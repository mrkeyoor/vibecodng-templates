import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'

const VIEWS = {
  Elevation: { position: [0, 1.65, 6.2], target: [0, .75, 0] },
  Corner: { position: [4.5, 3.1, 5.2], target: [0, .65, 0] },
  Plan: { position: [0, 7.4, .15], target: [0, 0, 0] },
}
const COLORS = { ash: '#252522', clay: '#a94b35', aluminium: '#aeb5b6' }

function Room({ materialId, span, wall, position, view, reduced }) {
  const object = useRef(), top = useRef(), wallMesh = useRef()
  const { camera, invalidate } = useThree()
  const target = useRef(new THREE.Vector3())
  const offset = position * Math.max(0, (wall - span) / 200)

  useEffect(() => invalidate(), [materialId, span, wall, position, view, reduced, invalidate])

  useFrame((_, delta) => {
    const speed = reduced ? 1 : Math.min(1, delta * 5.5)
    const cameraState = VIEWS[view]
    camera.position.lerp(new THREE.Vector3(...cameraState.position), speed)
    target.current.lerp(new THREE.Vector3(...cameraState.target), speed)
    camera.lookAt(target.current)
    object.current.position.x = THREE.MathUtils.lerp(object.current.position.x, offset, speed)
    top.current.scale.x = THREE.MathUtils.lerp(top.current.scale.x, span / 200, speed)
    wallMesh.current.scale.x = THREE.MathUtils.lerp(wallMesh.current.scale.x, wall / 320, speed)
    const destination = new THREE.Vector3(...cameraState.position)
    const unsettled = camera.position.distanceTo(destination) > .003 || Math.abs(object.current.position.x - offset) > .003 || Math.abs(top.current.scale.x - span / 200) > .003 || Math.abs(wallMesh.current.scale.x - wall / 320) > .003
    if (!reduced && unsettled) invalidate()
  })

  const color = COLORS[materialId]
  return <>
    <ambientLight intensity={1.8} />
    <directionalLight position={[3, 6, 4]} intensity={3.2} castShadow />
    <pointLight position={[-3, 2, 3]} color="#d96c4f" intensity={8} distance={10} />
    <group>
      <mesh ref={wallMesh} position={[0, 1.65, -1.05]} receiveShadow><boxGeometry args={[6.4, 3.3, .08]} /><meshStandardMaterial color="#d8d0c0" roughness={.96} /></mesh>
      <mesh position={[0, -.03, .4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[7.5, 5.5]} /><meshStandardMaterial color="#b6aa98" roughness={.9} /></mesh>
      <gridHelper args={[7, 14, '#675f55', '#b2a797']} position={[0, .002, .4]} />
    </group>
    <group ref={object} position={[offset, 0, 0]} rotation={[0, -.04, 0]}>
      <mesh ref={top} position={[0, .82, 0]} castShadow><boxGeometry args={[2, .14, .48]} /><meshStandardMaterial color={color} roughness={materialId === 'aluminium' ? .28 : .76} metalness={materialId === 'aluminium' ? .72 : .08} /></mesh>
      <mesh position={[span / 200 - 0.13, .41, -.02]} castShadow><boxGeometry args={[.22, .82, .46]} /><meshStandardMaterial color={color} roughness={.72} /></mesh>
      <mesh position={[-span / 200 + .2, .4, 0]} castShadow><boxGeometry args={[.08, .78, .38]} /><meshStandardMaterial color="#aeb5b6" roughness={.27} metalness={.75} /></mesh>
    </group>
    <mesh position={[offset, .02, .38]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.38, .43, 64]} /><meshBasicMaterial color="#bd4e35" /></mesh>
  </>
}

export default function RoomScene(props) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const label = props.span + ' centimetre ' + props.materialId + ' console placed in a ' + props.wall + ' centimetre room, ' + props.view + ' view'
  return <div className="spatial-canvas">
    <Canvas role="img" aria-label={label} camera={{ position: VIEWS.Elevation.position, fov: 38 }} shadows dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#171715']} />
      <Room {...props} reduced={reduced} />
    </Canvas>
    <span className="spatial-label">ROOM VOLUME / LIVE</span>
    <span className="spatial-motion">{reduced ? 'Static spatial state' : 'View and dimensions interpolate on input'}</span>
  </div>
}
