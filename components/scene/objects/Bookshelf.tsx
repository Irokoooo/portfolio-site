'use client';
import { useState } from 'react';
import { useGLTF, useCursor, Html } from '@react-three/drei';
import { useOverlayStore } from '@/lib/useOverlayStore';

export function Bookshelf() {
  const { scene } = useGLTF('/models/bookshelf.glb');
  const { openOverlay, cameraTarget } = useOverlayStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isActive = cameraTarget === 'bookshelf';

  return (
    <group position={[-3.203, 0, 0.712]} rotation={[0, 0, 0]} scale={[2, 2, 2]}>
      <primitive
        object={scene}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => openOverlay('bookshelf')}
      />
      {/* Hover glow overlay */}
      {(hovered || isActive) && (
        <pointLight
          position={[0, 1.5, 0.3]}
          color="#c8a96e"
          intensity={hovered ? 4 : 2}
          distance={2.5}
        />
      )}
      {hovered && (
        <Html center position={[0, 2.2, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#1a1209]/80 text-[#f5e0bc] text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-[#c8a96e]/20">
            读书笔记 Reading Notes
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/models/bookshelf.glb');
