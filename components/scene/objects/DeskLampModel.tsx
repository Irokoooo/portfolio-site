'use client';
import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useCursor } from '@react-three/drei';

export function DeskLampModel() {
  const { scene } = useGLTF('/models/classic_lamp_revival.glb');
  const [isOn, setIsOn] = useState(true);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group position={[1.386, 1.79, -3.377]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
      <primitive
        object={scene}
        onClick={(e: any) => { e.stopPropagation(); setIsOn(!isOn); }}
        onPointerOver={(e: any) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      />
      {isOn && <pointLight position={[0, 0.3, 0]} color="#e8c060" intensity={10} castShadow distance={6} />}
    </group>
  );
}

useGLTF.preload('/models/classic_lamp_revival.glb');
