'use client';
import { useGLTF } from '@react-three/drei';

export function FloorLamp() {
  const { scene } = useGLTF('/models/antique_lamp.glb');
  return <primitive object={scene} position={[2.85, 0, 2.55]} rotation={[0, 0, 0]} scale={[0.015, 0.015, 0.015]} castShadow receiveShadow />;
}

useGLTF.preload('/models/antique_lamp.glb');
