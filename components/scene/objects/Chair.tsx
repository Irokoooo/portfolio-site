'use client';
import { useGLTF } from '@react-three/drei';

export function Chair() {
  const { scene } = useGLTF('/models/victorian_chair.glb');
  return <primitive object={scene} position={[0, 0.05, -1.6]} rotation={[0, 3.05, 0]} scale={[1, 1, 1]} castShadow receiveShadow />;
}

useGLTF.preload('/models/victorian_chair.glb');
