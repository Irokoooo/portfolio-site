'use client';
import { useState } from 'react';
import { useCursor, Html } from '@react-three/drei';
import { useOverlayStore } from '@/lib/useOverlayStore';

export function Globe() {
  const { openOverlay, cameraTarget } = useOverlayStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isActive = cameraTarget === 'globe';

  return (
    <group position={[2.1, 2.26, -3.2]} rotation={[0, 0.3, 0]}>
      {/* wooden base */}
      <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.04, 16]} />
        <meshStandardMaterial color="#3a2510" roughness={0.7} />
      </mesh>
      {/* metal stand arc */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <torusGeometry args={[0.16, 0.008, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#4a3820" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* globe sphere */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => openOverlay('globe')}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color="#3a5a4e"
          emissive={hovered || isActive ? '#4a6a5e' : '#1a2a2e'}
          emissiveIntensity={hovered ? 0.5 : isActive ? 0.3 : 0.1}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {/* latitude lines */}
      {[-0.08, 0, 0.08].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[Math.sqrt(0.14 * 0.14 - y * y), 0.002, 6, 24]} />
          <meshStandardMaterial color="#2a4a3e" roughness={0.7} />
        </mesh>
      ))}
      {(hovered || isActive) && (
        <pointLight
          position={[0, 0, 0.25]}
          color="#c8a96e"
          intensity={hovered ? 2.5 : 1.2}
          distance={1.2}
        />
      )}
      {hovered && (
        <Html center position={[0, 0.35, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#1a1209]/80 text-[#f5e0bc] text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-[#c8a96e]/20">
            下一站规划 Next Destination
          </div>
        </Html>
      )}
    </group>
  );
}
