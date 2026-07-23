'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useOverlayStore } from '@/lib/useOverlayStore';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const FOCUS_MAP: Record<string, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  laptop:     { pos: new THREE.Vector3(-0.4, 1.8, 2.8),  target: new THREE.Vector3(-0.4, 1.2, 0) },
  bookshelf:  { pos: new THREE.Vector3(-3.5, 2.0, 1.5),  target: new THREE.Vector3(-4.2, 1.8, -1.5) },
  photoframe: { pos: new THREE.Vector3(-1.4, 1.5, 2.5),  target: new THREE.Vector3(-1.4, 1.2, 0.3) },
  wallmap:    { pos: new THREE.Vector3(1.8, 2.5, 2.5),   target: new THREE.Vector3(1.5, 2.5, -3.8) },
  folder:     { pos: new THREE.Vector3(1.4, 1.4, 2.5),   target: new THREE.Vector3(1.2, 1.2, 0.2) },
  globe:      { pos: new THREE.Vector3(2.1, 2.5, -1.5),  target: new THREE.Vector3(2.1, 2.26, -3.2) },
};

export function CameraRig() {
  const { camera, controls } = useThree();
  const { cameraTarget } = useOverlayStore();
  const orbitControls = controls as OrbitControlsImpl | undefined;

  useEffect(() => {
    if (orbitControls) {
      orbitControls.enabled = !cameraTarget;
    }
  }, [cameraTarget, orbitControls]);

  useFrame(() => {
    if (!cameraTarget || !orbitControls) return;

    const focus = FOCUS_MAP[cameraTarget];
    if (focus) {
      camera.position.lerp(focus.pos, 0.06);
      orbitControls.target.lerp(focus.target, 0.06);
      orbitControls.update();
    }
  });

  return null;
}
