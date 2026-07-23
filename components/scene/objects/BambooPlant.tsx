'use client';
import { useGLTF } from '@react-three/drei';

export function BambooPlant() {
  const { scene } = useGLTF('/models/potted_plant.glb');
  return <primitive object={scene} position={[-0.5, 1.31, -3.5]} rotation={[0, 0, 0]} scale={[1.3, 1.3, 1.3]} castShadow receiveShadow />;
}

useGLTF.preload('/models/potted_plant.glb');
