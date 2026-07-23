'use client';
import { useState } from 'react';
import { useCursor, Html } from '@react-three/drei';
import { useOverlayStore } from '@/lib/useOverlayStore';

// Stack of project folders on the desk, right side
export function FolderStack() {
  const { openOverlay, cameraTarget } = useOverlayStore();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isActive = cameraTarget === 'folder';
  const glow = hovered || isActive;

  return (
    <group position={[0.85, 1.394, -2.971]} rotation={[0, -0.15, 0]}>
      {[0, 0.022, 0.044].map((offsetY, i) => (
        <mesh
          key={i}
          position={[i * 0.015 - 0.015, offsetY, i * 0.008 - 0.008]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => openOverlay('folder')}
        >
          <boxGeometry args={[0.45, 0.018, 0.35]} />
          <meshStandardMaterial
            color={['#c8a050', '#d4ac60', '#ba9440'][i]}
            emissive={glow ? '#c8a96e' : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
            roughness={0.9}
          />
        </mesh>
      ))}
      {/* Tab on top folder */}
      <mesh position={[-0.14, 0.068, -0.15]}>
        <boxGeometry args={[0.13, 0.035, 0.018]} />
        <meshStandardMaterial color="#d4ac60" roughness={0.9} />
      </mesh>
      {hovered && (
        <Html center position={[0, 0.22, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#1a1209]/80 text-[#f5e0bc] text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-[#c8a96e]/20">
            项目精选 Projects
          </div>
        </Html>
      )}
    </group>
  );
}
