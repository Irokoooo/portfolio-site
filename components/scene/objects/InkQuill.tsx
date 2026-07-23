'use client';
import { useGLTF } from '@react-three/drei';

export function InkQuill() {
  const { scene } = useGLTF('/models/ink_bottle_with_quill.glb');
  return <primitive object={scene} position={[0.695, 1.281, -2.758]} rotation={[0, 0, 0]} scale={[1, 1, 1]} castShadow receiveShadow />;
}

useGLTF.preload('/models/ink_bottle_with_quill.glb');
