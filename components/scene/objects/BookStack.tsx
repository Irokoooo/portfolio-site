'use client';
import { useGLTF } from '@react-three/drei';

export function BookStack() {
  const { scene } = useGLTF('/models/book_lost_wisdom.glb');
  return <primitive object={scene} position={[2.064, 0.097, -0.647]} rotation={[0, 0, 0]} scale={[1, 1, 1]} castShadow receiveShadow />;
}

useGLTF.preload('/models/book_lost_wisdom.glb');
