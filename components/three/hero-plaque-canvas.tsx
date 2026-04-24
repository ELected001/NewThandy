"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox, Sparkles, useTexture } from "@react-three/drei";

function PlaqueModel() {
  const logoTexture = useTexture("/images/brand/logo-white-green.png");

  return (
    <Float floatIntensity={0.48} rotationIntensity={0.22} speed={1.35}>
      <group position={[0, -0.06, 0]} rotation={[-0.12, 0.32, 0]} scale={0.92}>
        <RoundedBox args={[5.75, 3.5, 0.08]} position={[0, 0, -0.18]} radius={0.28} smoothness={6}>
          <meshStandardMaterial
            color="#7ED957"
            emissive="#63B53E"
            emissiveIntensity={0.48}
            metalness={0.15}
            roughness={0.25}
          />
        </RoundedBox>
        <RoundedBox args={[5.45, 3.2, 0.38]} radius={0.24} smoothness={6}>
          <meshStandardMaterial color="#060906" metalness={0.24} roughness={0.45} />
        </RoundedBox>
        <mesh position={[0, 0, 0.21]}>
          <planeGeometry args={[4.85, 2.32]} />
          <meshBasicMaterial map={logoTexture} toneMapped={false} transparent />
        </mesh>
        <mesh position={[1.78, 1.1, -0.58]} rotation={[0.6, 0.2, 0.48]}>
          <torusGeometry args={[0.76, 0.06, 18, 60]} />
          <meshStandardMaterial
            color="#7ED957"
            emissive="#7ED957"
            emissiveIntensity={0.65}
            metalness={0.18}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[-2.18, -1.18, -0.72]} rotation={[0.42, -0.4, 0.82]}>
          <torusGeometry args={[0.4, 0.045, 14, 48]} />
          <meshStandardMaterial
            color="#B9EA96"
            emissive="#7ED957"
            emissiveIntensity={0.38}
            metalness={0.12}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[2.8, -1.55, -0.06]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.85, 0.18, 0.12]} />
          <meshStandardMaterial color="#7ED957" emissive="#7ED957" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroPlaqueCanvas() {
  return (
    <div className="aspect-[1.45/1] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgb(126_217_87/14%),_transparent_28%),linear-gradient(180deg,_rgba(6,9,6,0.86),_rgba(4,8,5,0.96))] shadow-[var(--shadow-card)]">
      <Canvas
        camera={{ fov: 28, position: [0, 0, 9.2] }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      >
        <color attach="background" args={["#050805"]} />
        <ambientLight intensity={1.35} />
        <directionalLight color="#f7ffe6" intensity={2.35} position={[3.5, 4.6, 6]} />
        <pointLight color="#7ED957" intensity={2.2} position={[-4, -2.5, 4]} />
        <pointLight color="#B9EA96" intensity={1.35} position={[3.6, 1.2, 3.4]} />
        <Suspense fallback={null}>
          <PlaqueModel />
          <Sparkles
            color="#7ED957"
            count={32}
            noise={0.7}
            opacity={0.28}
            scale={[8, 4.8, 4]}
            size={2.8}
            speed={0.35}
          />
          <ContactShadows blur={2.6} far={4.5} opacity={0.34} position={[0, -2.4, 0]} scale={7.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
