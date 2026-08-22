import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
const brass = "#bd9350",
  steel = "#b9c0c5",
  dark = "#20242a",
  ruby = "#d53842",
  blue = "#6ab4e4";
function Gear({ position, size = 0.72, teeth = 24, rotation = 0 }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, rotation]}>
      <mesh>
        <cylinderGeometry args={[size, size, 0.12, teeth]} />
        <meshStandardMaterial color={brass} metalness={0.86} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <torusGeometry args={[size * 0.56, size * 0.12, 8, 32]} />
        <meshStandardMaterial color={dark} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.22, 18]} />
        <meshStandardMaterial color={ruby} metalness={0.25} roughness={0.18} />
      </mesh>
    </group>
  );
}
function Bridge({ position, rotation = 0, scale = [1, 1, 1] }) {
  return (
    <group
      position={position}
      rotation={[Math.PI / 2, 0, rotation]}
      scale={scale}
    >
      <mesh>
        <boxGeometry args={[2.4, 0.22, 0.62]} />
        <meshStandardMaterial color={steel} metalness={0.92} roughness={0.2} />
      </mesh>
      <mesh position={[0.74, 0.16, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.18, 28]} />
        <meshStandardMaterial color={dark} metalness={0.8} />
      </mesh>
    </group>
  );
}
function Movement({ open, wind }) {
  const z = (n) => n * open;
  return (
    <group rotation={[0.1, -0.22, -0.12]}>
      <mesh position={[0, 0, -0.65]}>
        <cylinderGeometry args={[3.08, 3.08, 0.42, 72]} />
        <meshStandardMaterial color={dark} metalness={0.8} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.78, 0.16, 12, 72]} />
        <meshStandardMaterial color={steel} metalness={1} roughness={0.18} />
      </mesh>
      <group position={[0, 0, z(-1.6)]}>
        <Gear position={[-1.05, 0.25, 0]} size={0.86} rotation={wind * 0.04} />
        <Gear
          position={[0.45, -0.7, 0.1]}
          size={0.63}
          rotation={-wind * 0.06}
        />
        <Gear position={[1.34, 0.52, 0]} size={0.48} rotation={wind * 0.08} />
        <Gear position={[-0.15, 1.18, 0.1]} size={0.4} rotation={-wind * 0.1} />
      </group>
      <group position={[0, 0, z(0.1)]}>
        <Bridge position={[-0.72, -0.65, 0]} rotation={0.2} />
        <Bridge
          position={[0.52, 0.8, 0.05]}
          rotation={-1.1}
          scale={[0.82, 1, 1]}
        />
        <mesh position={[1.45, -0.62, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.08, 8, 48]} />
          <meshStandardMaterial
            color={blue}
            emissive={blue}
            emissiveIntensity={0.4}
            metalness={0.7}
          />
        </mesh>
      </group>
      <group position={[0, 0, z(1.7)]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.48, 2.48, 0.12, 72]} />
          <meshPhysicalMaterial
            color="#071018"
            transmission={0.42}
            transparent
            opacity={0.48}
            roughness={0.08}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[0, 0, 0.18]} rotation={[0, 0, -wind * 0.018]}>
          <boxGeometry args={[0.08, 2.15, 0.055]} />
          <meshStandardMaterial color="#edf0ec" metalness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.2]} rotation={[0, 0, wind * 0.003]}>
          <boxGeometry args={[0.1, 1.55, 0.07]} />
          <meshStandardMaterial color={brass} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.26]}>
          <cylinderGeometry args={[0.14, 0.14, 0.16, 24]} />
          <meshStandardMaterial color={ruby} />
        </mesh>
      </group>
      <group position={[0, 0, z(2.8)]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.98, 0.3, 16, 72]} />
          <meshStandardMaterial
            color={steel}
            metalness={0.95}
            roughness={0.16}
          />
        </mesh>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.sin(a) * 2.48, Math.cos(a) * 2.48, 0.12]}
            >
              <boxGeometry args={[0.045, 0.24, 0.08]} />
              <meshStandardMaterial color={brass} metalness={0.9} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
export default function CalibreScene({ open, wind }) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 9.4], fov: 38 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 5, 8]} intensity={5} />
      <pointLight position={[-5, -2, 4]} intensity={28} color="#6ab4e4" />
      <Movement open={open} wind={wind} />
    </Canvas>
  );
}
