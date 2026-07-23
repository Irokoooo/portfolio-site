'use client';
import { useState } from 'react';
import { useCursor, Html } from '@react-three/drei';
import { useOverlayStore } from '@/lib/useOverlayStore';

// Photo frame on the desk, left side
export function PhotoFrame() {
  const { openOverlay, cameraTarget } = useOverlayStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isActive = cameraTarget === 'photoframe';

  return (
    <group position={[-1.05, 1.5, -3.15]} rotation={[0, 0.3, 0]}>
      {/* Frame border */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => openOverlay('photoframe')}
      >
        <boxGeometry args={[0.25, 0.32, 0.035]} />
        <meshStandardMaterial
          color="#7a5c30"
          emissive={hovered || isActive ? '#c8a96e' : '#000000'}
          emissiveIntensity={hovered ? 0.6 : 0}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>
      {/* Photo inside */}
      <mesh position={[0, 0, 0.019]}>
        <boxGeometry args={[0.20, 0.27, 0.002]} />
        <meshStandardMaterial color="#d4c0a8" roughness={1} />
      </mesh>
      {hovered && (
        <Html center position={[0, 0.35, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#1a1209]/80 text-[#f5e0bc] text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-[#c8a96e]/20">
            About Me 关于我
          </div>
        </Html>
      )}
    </group>
  );
}
