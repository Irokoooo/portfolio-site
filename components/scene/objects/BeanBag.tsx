'use client';
import { useGLTF } from '@react-three/drei';

export function BeanBag() {
  const { scene } = useGLTF('/models/bean_bag_-_base_mesh_1.glb');
  return <primitive object={scene} position={[1.806, 0, 0.909]} rotation={[0.05, -0.85, 0]} scale={[1, 1, 1]} castShadow receiveShadow />;
}

useGLTF.preload('/models/bean_bag_-_base_mesh_1.glb');
