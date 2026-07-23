'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Environment, Html, OrbitControls, TransformControls, useGLTF } from '@react-three/drei';
import { ThreeEvent, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { Annotation, EditableObject, TransformMode, Vec3 } from './RoomEditorCanvas';

const W = 4;  // Reduced from 5 to make room narrower (less wide on X-axis)
const D = 4;
const H = 5;

type RoomEditorSceneProps = {
  objects: EditableObject[];
  annotations: Annotation[];
  selectedId: string | null;
  mode: TransformMode;
  isAddingAnnotation: boolean;
  onSelect: (id: string | null) => void;
  onUpdateObject: (id: string, patch: Partial<Pick<EditableObject, 'position' | 'rotation' | 'scale'>>) => void;
  onAddAnnotation: (position: Vec3) => void;
};

function roundVec3(values: Vec3): Vec3 {
  return values.map((value) => Number(value.toFixed(3))) as Vec3;
}

function GltfModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} castShadow receiveShadow />;
}

function LaptopModel() {
  return (
    <>
      <mesh rotation={[-0.25, 0, 0]} position={[0, 0.25, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.45, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#001a3a" emissiveIntensity={0.4} metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.035, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </mesh>
    </>
  );
}

function PhotoFrameModel() {
  return (
    <>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.32, 0.035]} />
        <meshStandardMaterial color="#7a5c30" roughness={0.5} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.019]}>
        <boxGeometry args={[0.2, 0.27, 0.002]} />
        <meshStandardMaterial color="#d4c0a8" roughness={1} />
      </mesh>
    </>
  );
}

function FolderModel() {
  return (
    <>
      {[0, 0.022, 0.044].map((offsetY, i) => (
        <mesh key={i} position={[i * 0.015 - 0.015, offsetY, i * 0.008 - 0.008]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.018, 0.35]} />
          <meshStandardMaterial color={['#c8a050', '#d4ac60', '#ba9440'][i]} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[-0.14, 0.068, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.13, 0.035, 0.018]} />
        <meshStandardMaterial color="#d4ac60" roughness={0.9} />
      </mesh>
    </>
  );
}

function PlaceholderBox() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color="#c8a96e" transparent opacity={0.55} roughness={0.8} />
    </mesh>
  );
}

function WindowPlaceholder() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#d0e0f0"
        transparent
        opacity={0.4}
        roughness={0.95}
        emissive="#e0f0ff"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function EditableObjectNode({
  object,
  selected,
  mode,
  onSelect,
  onUpdate,
}: {
  object: EditableObject;
  selected: boolean;
  mode: TransformMode;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Pick<EditableObject, 'position' | 'rotation' | 'scale'>>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { controls } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.position.set(...object.position);
    groupRef.current.rotation.set(...object.rotation);
    groupRef.current.scale.set(...object.scale);
  }, [object.position, object.rotation, object.scale]);

  const syncTransform = () => {
    const group = groupRef.current;
    if (!group) return;
    onUpdate(object.id, {
      position: roundVec3(group.position.toArray() as Vec3),
      rotation: roundVec3([group.rotation.x, group.rotation.y, group.rotation.z]),
      scale: roundVec3(group.scale.toArray() as Vec3),
    });
  };

  return (
    <>
      <group
        ref={groupRef}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(object.id);
        }}
      >
        {object.kind === 'gltf' && object.modelPath ? (
          <Suspense fallback={<PlaceholderBox />}>
            <GltfModel path={object.modelPath} />
          </Suspense>
        ) : object.kind === 'laptop' ? (
          <LaptopModel />
        ) : object.kind === 'photoframe' ? (
          <PhotoFrameModel />
        ) : object.kind === 'folder' ? (
          <FolderModel />
        ) : object.kind === 'window' ? (
          <WindowPlaceholder />
        ) : (
          <PlaceholderBox />
        )}
        {selected && (
          <Html center position={[0, 1.2, 0]} style={{ pointerEvents: 'none' }}>
            <div className="rounded-full border border-[#c8a96e]/50 bg-[#1a1209]/80 px-3 py-1 text-xs text-[#f5e0bc] shadow-lg backdrop-blur">
              {object.label}
            </div>
          </Html>
        )}
      </group>

      {selected && groupRef.current && (
        <TransformControls
          object={groupRef.current}
          mode={mode}
          size={0.85}
          onMouseDown={() => {
            if (controls) (controls as OrbitControlsImpl).enabled = false;
          }}
          onMouseUp={() => {
            if (controls) (controls as OrbitControlsImpl).enabled = true;
            syncTransform();
          }}
          onObjectChange={syncTransform}
        />
      )}
    </>
  );
}

function RoomShell() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[W * 2, D * 2]} />
        <meshStandardMaterial color="#2e1e0f" roughness={0.85} metalness={0.05} />
      </mesh>
      <gridHelper args={[10, 20, '#c8a96e', '#5a3820']} position={[0, 0.006, 0]} />
      <mesh position={[0, H / 2, -D]} receiveShadow>
        <planeGeometry args={[W * 2, H]} />
        <meshStandardMaterial color="#cfc0a0" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.1, -D + 0.01]}>
        <boxGeometry args={[W * 2, 0.08, 0.04]} />
        <meshStandardMaterial color="#7a5a30" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.55, -D + 0.01]}>
        <boxGeometry args={[W * 2, 1.1, 0.03]} />
        <meshStandardMaterial color="#b8a070" roughness={0.9} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-W, H / 2, 0]} receiveShadow>
        <planeGeometry args={[D * 2, H]} />
        <meshStandardMaterial color="#c8b895" roughness={0.95} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-W + 0.01, 0.55, 0]}>
        <boxGeometry args={[D * 2, 1.1, 0.03]} />
        <meshStandardMaterial color="#b09060" roughness={0.9} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[W, H / 2, 0]} receiveShadow>
        <planeGeometry args={[D * 2, H]} />
        <meshStandardMaterial color="#c8b895" roughness={0.95} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]}>
        <planeGeometry args={[W * 2, D * 2]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.95} />
      </mesh>
      {[-1.5, 0, 1.5].map((z, i) => (
        <mesh key={i} position={[0, H - 0.08, z]} castShadow>
          <boxGeometry args={[W * 2, 0.16, 0.22]} />
          <meshStandardMaterial color="#5a3820" roughness={0.8} />
        </mesh>
      ))}
    </>
  );
}

export function RoomEditorScene({
  objects,
  annotations,
  selectedId,
  mode,
  isAddingAnnotation,
  onSelect,
  onUpdateObject,
  onAddAnnotation,
}: RoomEditorSceneProps) {
  const handleFloorClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (isAddingAnnotation) {
      onAddAnnotation(roundVec3([event.point.x, event.point.y + 0.08, event.point.z]));
      return;
    }
    onSelect(null);
  };

  return (
    <>
      <OrbitControls makeDefault enableDamping dampingFactor={0.06} minDistance={2} maxDistance={14} target={[0, 1.5, 0]} />
      <ambientLight color="#f5e0bc" intensity={0.65} />
      <pointLight position={[0.8, 1.9, -0.4]} color="#e8c060" intensity={10} castShadow distance={6} />
      <pointLight position={[-4.2, 0.8, -1.0]} color="#c84a1a" intensity={6} distance={5} />
      <pointLight position={[4.0, 3.0, 1.0]} color="#d0c8f0" intensity={3} distance={6} />
      <Environment preset="apartment" />

      <RoomShell />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} visible={false} onClick={handleFloorClick}>
        <planeGeometry args={[W * 2, D * 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {objects.map((object) => (
        <EditableObjectNode
          key={object.id}
          object={object}
          selected={selectedId === object.id}
          mode={mode}
          onSelect={onSelect}
          onUpdate={onUpdateObject}
        />
      ))}

      {annotations.map((annotation) => (
        <Html key={annotation.id} center position={annotation.position}>
          <div className="max-w-[220px] rounded-lg border border-[#c8a96e]/50 bg-[#1a1209]/85 px-3 py-2 text-xs leading-relaxed text-[#f5e0bc] shadow-xl backdrop-blur">
            {annotation.text}
          </div>
        </Html>
      ))}

      {isAddingAnnotation && (
        <Html center position={[0, 3.9, 0]} style={{ pointerEvents: 'none' }}>
          <div className="rounded-full border border-[#c8a96e]/50 bg-[#1a1209]/85 px-4 py-2 text-xs tracking-widest text-[#f5e0bc] shadow-xl backdrop-blur">
            点击地板放置文字标注
          </div>
        </Html>
      )}
    </>
  );
}

useGLTF.preload('/models/desk.glb');
useGLTF.preload('/models/bookshelf.glb');
useGLTF.preload('/models/world-map.glb');
