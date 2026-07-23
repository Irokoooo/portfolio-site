'use client';
import { useGLTF } from '@react-three/drei';

export function MonsteraPlant() {
  const { scene } = useGLTF('/models/monstera_plant.glb');
  return <primitive object={scene} position={[-2.75, 0, -3.05]} rotation={[0, 0, 0]} scale={[1.45, 1.4, 1.4]} castShadow receiveShadow />;
}

useGLTF.preload('/models/monstera_plant.glb');
