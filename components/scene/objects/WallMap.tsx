'use client';
import { useState } from 'react';
import { useGLTF, useCursor, Html } from '@react-three/drei';
import { useOverlayStore } from '@/lib/useOverlayStore';

export function WallMap() {
  const { scene } = useGLTF('/models/old_world_map.glb');
  const { openOverlay, cameraTarget } = useOverlayStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isActive = cameraTarget === 'wallmap';

  return (
    <group position={[4, 2.626, 1.136]} rotation={[0, 0, 0]} scale={[0.01, 0.01, 0.01]}>
      <primitive
        object={scene}
        rotation={[1.569, -0.001, 1.569]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => openOverlay('wallmap')}
      />
      {(hovered || isActive) && (
        <pointLight
          position={[0, 0, 0.3]}
          color="#c8a96e"
          intensity={hovered ? 3 : 1.5}
          distance={1.8}
        />
      )}
      {hovered && (
        <Html center position={[0, 0.65, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#1a1209]/80 text-[#f5e0bc] text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-[#c8a96e]/20">
            下一站规划 Next Destination
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/models/old_world_map.glb');
