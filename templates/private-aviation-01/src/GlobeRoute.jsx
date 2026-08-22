import{Canvas}from'@react-three/fiber'
import*as THREE from'three'
import{motion}from'framer-motion'
import{useMemo,useState}from'react'

const points={Farnborough:[51.28,-.78],'Le Bourget':[48.97,2.44],Teterboro:[40.85,-74.06],Geneva:[46.24,6.11],Dubai:[24.9,55.16],Nice:[43.66,7.22]}
const codes={Farnborough:'FAB','Le Bourget':'LBG',Teterboro:'TEB',Geneva:'GVA',Dubai:'DWC',Nice:'NCE'}
const toVector=([lat,lon],radius=2)=>{const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;return new THREE.Vector3(-radius*Math.sin(phi)*Math.cos(theta),radius*Math.cos(phi),radius*Math.sin(phi)*Math.sin(theta))}

function World({origin,destination,rotation}){
 const start=useMemo(()=>toVector(points[origin]),[origin]),end=useMemo(()=>toVector(points[destination]),[destination])
 const curve=useMemo(()=>{const mid=start.clone().add(end).multiplyScalar(.5).normalize().multiplyScalar(2.65);return new THREE.CatmullRomCurve3([start,mid,end])},[start,end])
 const routeGeometry=useMemo(()=>new THREE.TubeGeometry(curve,48,.025,6,false),[curve])
 return <group rotation={[.12,rotation,-.16]}><mesh><sphereGeometry args={[1.98,48,48]}/><meshStandardMaterial color="#0d2839" roughness={.74} metalness={.2}/></mesh><mesh><sphereGeometry args={[2,28,20]}/><meshBasicMaterial color="#65b9da" wireframe transparent opacity={.28}/></mesh><mesh geometry={routeGeometry}><meshBasicMaterial color="#ff6f3c"/></mesh>{[start,end].map((position,index)=><group position={position} key={index}><mesh><sphereGeometry args={[.095,16,16]}/><meshBasicMaterial color={index?'#fff3d6':'#ff6f3c'}/></mesh><pointLight intensity={3} distance={1.25} color={index?'#fff3d6':'#ff6f3c'}/></group>)}</group>
}

export default function GlobeRoute({origin,destination,onDestination}){
 const[rotation,setRotation]=useState(.3)
 return <section className="route-orbit" aria-labelledby="orbit-title"><div className="orbit-copy"><p className="eyebrow">02 / Route intelligence</p><h2 id="orbit-title">Put the whole world<br/><em>on one desk.</em></h2><p>The route is spatial before it is operational. Rotate the globe, move the arrival, then carry the same mission into dispatch.</p><div className="route-pills" role="group" aria-label="Choose arrival">{['Geneva','Dubai','Nice'].map(city=><button key={city} data-qa-action="globe-route" aria-pressed={destination===city} onClick={()=>onDestination(city)}>{codes[city]}<span>{city}</span></button>)}</div></div><div className="globe-console"><div className="globe-canvas" role="img" aria-label={`Interactive route globe from ${origin} to ${destination}`}><Canvas frameloop="demand" camera={{position:[0,0,6.5],fov:42}} dpr={[1,1.5]}><ambientLight intensity={1.3}/><directionalLight position={[4,4,4]} intensity={4}/><World origin={origin} destination={destination} rotation={rotation}/></Canvas><div className="orbit-ring" aria-hidden="true"/><span className="globe-label origin-label">{codes[origin]}</span><span className="globe-label arrival-label">{codes[destination]}</span></div><div className="globe-controls"><button data-qa-action="globe-rotate" aria-label="Rotate globe west" onClick={()=>setRotation(value=>value-.32)}>← <span>WEST</span></button><motion.div key={`${origin}-${destination}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}><small>ACTIVE CORRIDOR</small><strong>{codes[origin]} → {codes[destination]}</strong><span>{origin} / {destination}</span></motion.div><button data-qa-action="globe-rotate" aria-label="Rotate globe east" onClick={()=>setRotation(value=>value+.32)}><span>EAST</span> →</button></div></div></section>
}
