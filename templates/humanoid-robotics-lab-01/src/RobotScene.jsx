import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

const shell = { color: '#e7e4dc', metalness: .55, roughness: .28 }
const joint = { color: '#13181b', metalness: .75, roughness: .38 }

function Segment({ length = 1, radius = .16, shellColor = shell.color }) {
  return <group>
    <mesh><capsuleGeometry args={[radius, length, 8, 16]} /><meshStandardMaterial {...shell} color={shellColor} /></mesh>
    <mesh position={[0, length * .42, 0]} scale={[1.04, .15, 1.04]}><sphereGeometry args={[radius, 18, 14]} /><meshStandardMaterial {...joint} /></mesh>
  </group>
}

function Limb({ side, pose, arm }) {
  const x = side * (arm ? .67 : .30)
  const upperRotation = arm ? [pose.shoulder, 0, side * pose.armOut] : [pose.hip, 0, side * .05]
  return <group position={[x, arm ? 1.95 : .52, 0]} rotation={upperRotation}>
    <mesh><sphereGeometry args={[arm ? .23 : .27, 20, 16]} /><meshStandardMaterial {...joint} /></mesh>
    <group position={[0, arm ? -.59 : -.73, 0]}><Segment length={arm ? .82 : 1.05} radius={arm ? .14 : .19} />
      <group position={[0, arm ? -.58 : -.72, 0]} rotation={[arm ? pose.elbow : pose.knee, 0, 0]}>
        <mesh><sphereGeometry args={[arm ? .19 : .23, 20, 16]} /><meshStandardMaterial {...joint} /></mesh>
        <group position={[0, arm ? -.54 : -.66, arm ? .07 : .06]}><Segment length={arm ? .72 : .95} radius={arm ? .125 : .17} />
          {arm ? <group position={[0, -.47, 0]}><mesh scale={[.18,.22,.1]}><boxGeometry /><meshStandardMaterial {...joint} /></mesh>{[-1,-.35,.35,1].map((finger)=><mesh key={finger} position={[finger*.105,-.2,.02]}><capsuleGeometry args={[.025,.22,5,8]}/><meshStandardMaterial {...shell}/></mesh>)}</group> : <mesh position={[0,-.58,.13]} scale={[.26,.12,.5]}><boxGeometry/><meshStandardMaterial {...joint}/></mesh>}
        </group>
      </group>
    </group>
  </group>
}

function Humanoid({ phase, task }) {
  const poses = useMemo(() => ({
    teach: { shoulder: -.12, elbow: -.16, armOut: .06, hip: 0, knee: 0, torso: 0 },
    perceive: { shoulder: -.38, elbow: -.32, armOut: .18, hip: .04, knee: -.05, torso: -.04 },
    execute: task === 'inspect'
      ? { shoulder: -1.28, elbow: -1.02, armOut: .34, hip: .08, knee: -.12, torso: -.13 }
      : task === 'tote'
        ? { shoulder: -.72, elbow: -1.18, armOut: .09, hip: .28, knee: -.45, torso: -.05 }
        : { shoulder: -1.05, elbow: -.78, armOut: .2, hip: .02, knee: -.08, torso: -.1 },
    verify: { shoulder: -.24, elbow: -.42, armOut: .12, hip: 0, knee: 0, torso: 0 }
  }), [task])
  const pose = poses[phase]
  const { invalidate } = useThree()
  useEffect(() => invalidate(), [phase, task, invalidate])
  return <group position={[0, -1.25, 0]} rotation={[0, task === 'inspect' ? -.28 : .18, 0]}>
    <group rotation={[pose.torso, 0, 0]}>
      <mesh position={[0, 1.5, 0]} scale={[.62,.75,.35]}><sphereGeometry args={[1,32,22]}/><meshStandardMaterial {...shell}/></mesh>
      <mesh position={[0,1.55,.34]} scale={[.38,.42,.06]}><boxGeometry/><meshStandardMaterial color="#ef6437" metalness={.3} roughness={.45}/></mesh>
      <mesh position={[0,2.66,0]} scale={[.38,.46,.37]}><sphereGeometry args={[1,28,18]}/><meshStandardMaterial {...shell}/></mesh>
      <mesh position={[0,2.7,.35]} scale={[.25,.11,.03]}><boxGeometry/><meshBasicMaterial color="#6fe8f2" toneMapped={false}/></mesh>
      <mesh position={[0,.82,0]} scale={[.36,.25,.28]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial {...joint}/></mesh>
      <Limb side={-1} pose={pose} arm/><Limb side={1} pose={pose} arm/>
    </group>
    <Limb side={-1} pose={pose}/><Limb side={1} pose={{...pose, hip: -pose.hip*.55, knee: pose.knee*.35}}/>
    {phase === 'perceive' && <mesh position={[0,2.68,1.45]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[1.05,2.7,28,1,true]}/><meshBasicMaterial color="#6fe8f2" wireframe transparent opacity={.28}/></mesh>}
    {phase === 'execute' && <group position={[task==='inspect' ? 1.2 : 0, task==='tote' ? .52 : 1.38, .65]}>
      <mesh scale={task==='tote'?[.8,.55,.48]:[.35,.35,.35]}><boxGeometry/><meshStandardMaterial color="#ef6437" roughness={.48}/></mesh>
      <pointLight color="#ef6437" intensity={4} distance={3}/>
    </group>}
  </group>
}

function Bay({ phase, task, world }) {
  const { camera, invalidate, size } = useThree()
  useEffect(() => {
    const mobile = size.width < 620
    camera.position.set(mobile ? 0 : task === 'inspect' ? 4.7 : 4.2, mobile ? 1.05 : phase === 'execute' ? 2.1 : 1.8, mobile ? 9.8 : 7.8)
    camera.fov = mobile ? 43 : 38
    camera.lookAt(0, mobile ? .38 : .55, 0)
    camera.updateProjectionMatrix()
    invalidate()
  }, [phase, task, camera, invalidate, size.width])
  return <>
    <color attach="background" args={[world === 'orange' ? '#ef6437' : '#080b0d']}/>
    <fog attach="fog" args={[world === 'orange' ? '#ef6437' : '#080b0d', 8, 18]}/>
    <ambientLight intensity={1.7}/><directionalLight position={[5,8,6]} intensity={5.5}/><pointLight position={[-4,2,3]} color="#6fe8f2" intensity={11}/>
    <Humanoid phase={phase} task={task}/>
    <gridHelper args={[16,32,'#39565a','#1b2528']} position={[0,-1.28,0]}/>
    <mesh position={[0,-1.34,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[18,18]}/><meshStandardMaterial color="#101618" roughness={.86}/></mesh>
    <mesh position={[-2.2,.8,-2]}><boxGeometry args={[.08,4.3,.08]}/><meshStandardMaterial color="#ef6437"/></mesh>
    {[0,1,2,3,4].map(i=><mesh key={i} position={[-2.2,-1.15+i*.85,-1.95]}><boxGeometry args={[.38,.025,.025]}/><meshBasicMaterial color="#ef6437"/></mesh>)}
  </>
}

export default function RobotScene({ phase, task, world = 'dark' }) {
  return <Canvas frameloop="demand" dpr={[1,1.45]} camera={{position:[4.2,1.8,7.8],fov:38}} role="img" aria-label={`Interactive humanoid in ${phase} state for ${task} task`}>
    <Bay phase={phase} task={task} world={world}/>
  </Canvas>
}
