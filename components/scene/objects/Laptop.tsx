'use client';
import { useState } from 'react';
import { useGLTF, useCursor, Html } from '@react-three/drei';
import { useOverlayStore } from '@/lib/useOverlayStore';

export function Laptop() {
  const { scene } = useGLTF('/models/hp_victus_gaming_laptop.glb');
  const { openOverlay, cameraTarget } = useOverlayStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isActive = cameraTarget === 'laptop';

  return (
    <group position={[0.005, 1.4, -3.028]} rotation={[0, -0.2, 0]} scale={[1.9, 1.9, 1.9]}>
      <primitive
        object={scene}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => openOverlay('laptop')}
      />
      {(hovered || isActive) && (
        <pointLight
          position={[0, 0.15, -0.1]}
          color="#4a90e8"
          intensity={hovered ? 4 : 2}
          distance={1.2}
        />
      )}
      {hovered && (
        <Html center position={[0, 0.4, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#1a1209]/80 text-[#f5e0bc] text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-[#c8a96e]/20">
            作品集 Portfolio
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/models/hp_victus_gaming_laptop.glb');
