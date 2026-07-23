'use client';
import { useState } from 'react';
import { useGLTF, useCursor, Html } from '@react-three/drei';
import { useOverlayStore } from '@/lib/useOverlayStore';

export function GlobeModel() {
  const { scene } = useGLTF('/models/antique_globe.glb');
  const { openOverlay, cameraTarget } = useOverlayStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isActive = cameraTarget === 'globe';

  return (
    <group position={[0.45, 1.65, -3.1]} rotation={[0, -0.6, 0]} scale={[1, 1, 1]}>
      <primitive
        object={scene}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => openOverlay('globe')}
        castShadow
        receiveShadow
      />
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

useGLTF.preload('/models/antique_globe.glb');
