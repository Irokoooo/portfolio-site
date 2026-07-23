'use client';
import { Suspense, useState } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { PostFX } from './PostFX';
import { Laptop } from './objects/Laptop';
import { Bookshelf } from './objects/Bookshelf';
import { PhotoFrame } from './objects/PhotoFrame';
import { WallMap } from './objects/WallMap';
import { FolderStack } from './objects/FolderStack';
import { Chair } from './objects/Chair';
import { MonsteraPlant } from './objects/MonsteraPlant';
import { BambooPlant } from './objects/BambooPlant';
import { BeanBag } from './objects/BeanBag';
import { DeskLampModel } from './objects/DeskLampModel';
import { FloorLamp } from './objects/FloorLamp';
import { GlobeModel } from './objects/GlobeModel';
import { BookStack } from './objects/BookStack';
import { InkQuill } from './objects/InkQuill';

// Room dimensions (half-extents): width=8 → X ∈ [-4, 4], depth=8 → Z ∈ [-4, 4], height=5
const W = 4;   // Reduced from 5 - narrower room on X-axis
const D = 4;   // half-depth
const H = 5;   // ceiling height

function DeskModel() {
  const { scene } = useGLTF('/models/desk.glb');
  return <primitive object={scene} position={[0, 0, -3.028]} scale={[2, 1.5, 2]} castShadow receiveShadow />;
}
useGLTF.preload('/models/desk.glb');

export function RoomScene({ reducedFX }: { reducedFX?: boolean }) {
  return (
    <>
      <CameraRig />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.2}
        target={[0, 1.5, 0]}
      />

      {/* ── Lighting ── */}
      <ambientLight color="#f5e0bc" intensity={0.55} />
      {/* Fireplace orange glow */}
      <pointLight position={[-4.2, 0.8, -1.0]} color="#c84a1a" intensity={6} distance={5} />
      {/* Soft window light from right */}
      <pointLight position={[4.0, 3.0, 1.0]} color="#d0c8f0" intensity={3} distance={6} />

      <Environment preset="apartment" />

      {/* ══════════════════════════════════════
          ROOM SHELL
          Floor: Y=0  Ceiling: Y=H  Walls: X=±W, Z=±D
      ══════════════════════════════════════ */}

      {/* Floor — dark wood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[W * 2, D * 2]} />
        <meshStandardMaterial color="#2e1e0f" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Back wall Z=-D */}
      <mesh position={[0, H / 2, -D]} receiveShadow>
        <planeGeometry args={[W * 2, H]} />
        <meshStandardMaterial color="#2d4a3e" roughness={0.95} />
      </mesh>
      {/* Back wall wainscoting rail */}
      <mesh position={[0, 1.1, -D + 0.01]}>
        <boxGeometry args={[W * 2, 0.08, 0.04]} />
        <meshStandardMaterial color="#3a5246" roughness={0.6} />
      </mesh>
      {/* Back wall lower panel */}
      <mesh position={[0, 0.55, -D + 0.01]}>
        <boxGeometry args={[W * 2, 1.1, 0.03]} />
        <meshStandardMaterial color="#3f5c4f" roughness={0.9} />
      </mesh>

      {/* Left wall X=-W */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-W, H / 2, 0]} receiveShadow>
        <planeGeometry args={[D * 2, H]} />
        <meshStandardMaterial color="#2d4a3e" roughness={0.95} />
      </mesh>
      {/* Left wall lower panel */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-W + 0.01, 0.55, 0]}>
        <boxGeometry args={[D * 2, 1.1, 0.03]} />
        <meshStandardMaterial color="#3f5c4f" roughness={0.9} />
      </mesh>

      {/* Right wall X=+W */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[W, H / 2, 0]} receiveShadow>
        <planeGeometry args={[D * 2, H]} />
        <meshStandardMaterial color="#2d4a3e" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]}>
        <planeGeometry args={[W * 2, D * 2]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.95} />
      </mesh>
      {/* Ceiling beams */}
      {[-1.5, 0, 1.5].map((z, i) => (
        <mesh key={i} position={[0, H - 0.08, z]} castShadow>
          <boxGeometry args={[W * 2, 0.16, 0.22]} />
          <meshStandardMaterial color="#5a3820" roughness={0.8} />
        </mesh>
      ))}

      {/* ══════════════════════════════════════
          FURNITURE & DECOR (all Y-grounded or wall-mounted)
      ══════════════════════════════════════ */}

      {/* Desk GLTF — centred slightly right, against back wall */}
      <DeskModel />

      {/* Wooden chair — GLTF model (will be adjusted in editor) */}

      {/* Monstera plant — GLTF model (will be adjusted in editor) */}

      {/* Bamboo plant — GLTF model (will be adjusted in editor) */}

      {/* Bean bag sofa — GLTF model (will be adjusted in editor) */}

      {/* Desk lamp — GLTF model with interactive toggle */}

      {/* Rug under desk - Bohemian woven style */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, -2.5]}>
        <planeGeometry args={[6.5, 4.2]} />
        <meshStandardMaterial
          color="#8b6f47"
          roughness={1}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Rug pattern stripes */}
      {[-0.8, 0, 0.8].map((offsetZ, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, -2.5 + offsetZ]}>
          <planeGeometry args={[6.3, 0.15]} />
          <meshStandardMaterial color="#5a3a28" roughness={1} transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Rug tassels effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, -0.4]}>
        <planeGeometry args={[6.5, 0.08]} />
        <meshStandardMaterial color="#6b5033" roughness={1} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, -4.6]}>
        <planeGeometry args={[6.5, 0.08]} />
        <meshStandardMaterial color="#6b5033" roughness={1} transparent opacity={0.5} />
      </mesh>


      {/* Frameless frosted glass window - positioned from editor */}
      <mesh position={[0.101, 3.049, -3.947]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6.25, 3.2, 0.04]} />
        <meshStandardMaterial
          color="#d0e0f0"
          transparent
          opacity={0.35}
          roughness={0.95}
          metalness={0.05}
          emissive="#e0f0ff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* ── Interactive GLTF objects ── */}
      <Suspense fallback={null}>
        <Laptop />
        <PhotoFrame />
        <FolderStack />
        <Bookshelf />
        <WallMap />
        <GlobeModel />
        <Chair />
        <MonsteraPlant />
        <BambooPlant />
        <BeanBag />
        <DeskLampModel />
        <FloorLamp />
        <BookStack />
        <InkQuill />
      </Suspense>

      <DustParticles />
      <PostFX reduced={reducedFX} />
    </>
  );
}

function DustParticles() {
  const count = 60;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 9;
    positions[i * 3 + 1] = Math.random() * 4.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.016} color="#f5e0bc" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}
