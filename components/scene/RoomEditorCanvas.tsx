'use client';

import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { RoomEditorScene } from './RoomEditorScene';
import { EditorPanel } from './EditorPanel';

export type Vec3 = [number, number, number];
export type TransformMode = 'translate' | 'rotate' | 'scale';
export type EditableKind = 'gltf' | 'laptop' | 'photoframe' | 'folder' | 'window';

export type EditableObject = {
  id: string;
  label: string;
  kind: EditableKind;
  modelPath?: string;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

export type Annotation = {
  id: string;
  text: string;
  position: Vec3;
};

const INITIAL_OBJECTS: EditableObject[] = [
  {
    id: 'desk',
    label: 'Desk 书桌',
    kind: 'gltf',
    modelPath: '/models/desk.glb',
    position: [0, 0, -3.028],
    rotation: [0, 0, 0],
    scale: [2, 1.5, 2],
  },
  {
    id: 'bookshelf',
    label: 'Bookshelf 书架',
    kind: 'gltf',
    modelPath: '/models/bookshelf.glb',
    position: [-3.203, 0, 0.712],
    rotation: [0, 0, 0],
    scale: [2, 2, 2],
  },
  {
    id: 'wallmap',
    label: 'Wall Map 墙面地图',
    kind: 'gltf',
    modelPath: '/models/old_world_map.glb',
    position: [4, 2.626, 1.136],
    rotation: [1.569, 0, 1.569],
    scale: [0.01, 0.01, 0.01],
  },
  {
    id: 'laptop',
    label: 'Laptop 电脑',
    kind: 'gltf',
    modelPath: '/models/hp_victus_gaming_laptop.glb',
    position: [0.005, 1.4, -3.028],
    rotation: [0, -0.2, 0],
    scale: [1.05, 1.05, 1.05],
  },
  {
    id: 'photoframe',
    label: 'Photo Frame 相框',
    kind: 'photoframe',
    position: [-1.05, 1.5, -3.15],
    rotation: [0, 0.3, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'folder',
    label: 'Folder Stack 文件夹',
    kind: 'folder',
    position: [0.856, 1.4, -2.971],
    rotation: [0, -0.15, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'chair',
    label: 'Chair 木椅子',
    kind: 'gltf',
    modelPath: '/models/victorian_chair.glb',
    position: [0, 0.05, -1.6],
    rotation: [0, 3.05, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'monstera',
    label: 'Monstera Plant 龟背竹',
    kind: 'gltf',
    modelPath: '/models/monstera_plant.glb',
    position: [-2.75, 0, -3.05],
    rotation: [0, 0, 0],
    scale: [1.45, 1.4, 1.4],
  },
  {
    id: 'bamboo',
    label: 'Bamboo Plant 文竹盆栽',
    kind: 'gltf',
    modelPath: '/models/potted_plant.glb',
    position: [-0.55, 1.21, -3.5],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'beanbag',
    label: 'Bean Bag Sofa 懒人沙发',
    kind: 'gltf',
    modelPath: '/models/bean_bag_-_base_mesh_1.glb',
    position: [1.806, 0, 0.909],
    rotation: [0.05, -0.85, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'desklamp',
    label: 'Desk Lamp 台灯',
    kind: 'gltf',
    modelPath: '/models/classic_lamp_revival.glb',
    position: [1.386, 1.79, -3.377],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'floorlamp',
    label: 'Floor Lamp 落地灯',
    kind: 'gltf',
    modelPath: '/models/antique_lamp.glb',
    position: [2.85, 0, 2.55],
    rotation: [0, 0, 0],
    scale: [0.015, 0.015, 0.015],
  },
  {
    id: 'globe',
    label: 'Globe 地球仪',
    kind: 'gltf',
    modelPath: '/models/antique_globe.glb',
    position: [2.1, 1.4, -3.2],
    rotation: [0, 0.3, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'bookstack',
    label: 'Book Stack 书堆',
    kind: 'gltf',
    modelPath: '/models/book_lost_wisdom.glb',
    position: [-2.2, 0, -0.5],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'inkquill',
    label: 'Ink & Quill 墨水羽毛笔',
    kind: 'gltf',
    modelPath: '/models/ink_bottle_with_quill.glb',
    position: [0.3, 1.4, -2.8],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  {
    id: 'window',
    label: 'Window Position 窗户位置',
    kind: 'window',
    position: [4, 2.8, 0],
    rotation: [0, 0, 0],
    scale: [3.6, 3.2, 0.04],
  },
];

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0f06] text-sm tracking-[0.3em] text-[#c8a96e]/70">
      Loading room editor...
    </div>
  );
}

export function RoomEditorCanvas() {
  const [objects, setObjects] = useState<EditableObject[]>(INITIAL_OBJECTS);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>('bookshelf');
  const [mode, setMode] = useState<TransformMode>('translate');
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);

  const selectedObject = useMemo(
    () => objects.find((object) => object.id === selectedId) ?? null,
    [objects, selectedId]
  );

  const updateObject = (id: string, patch: Partial<Pick<EditableObject, 'position' | 'rotation' | 'scale'>>) => {
    setObjects((current) =>
      current.map((object) => (object.id === id ? { ...object, ...patch } : object))
    );
  };

  const updateAnnotation = (id: string, patch: Partial<Pick<Annotation, 'text' | 'position'>>) => {
    setAnnotations((current) =>
      current.map((annotation) => (annotation.id === id ? { ...annotation, ...patch } : annotation))
    );
  };

  const addAnnotation = (position: Vec3) => {
    const id = `note-${Date.now()}`;
    setAnnotations((current) => [
      ...current,
      { id, text: '在这里写我的设想 / New idea', position },
    ]);
    setIsAddingAnnotation(false);
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations((current) => current.filter((annotation) => annotation.id !== id));
  };

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 3.5, 9], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#1a0f06' }}
        >
          <RoomEditorScene
            objects={objects}
            annotations={annotations}
            selectedId={selectedId}
            mode={mode}
            isAddingAnnotation={isAddingAnnotation}
            onSelect={setSelectedId}
            onUpdateObject={updateObject}
            onAddAnnotation={addAnnotation}
          />
        </Canvas>
      </Suspense>

      <EditorPanel
        objects={objects}
        annotations={annotations}
        selectedObject={selectedObject}
        selectedId={selectedId}
        mode={mode}
        isAddingAnnotation={isAddingAnnotation}
        onSelect={setSelectedId}
        onModeChange={setMode}
        onUpdateObject={updateObject}
        onUpdateAnnotation={updateAnnotation}
        onDeleteAnnotation={deleteAnnotation}
        onStartAddAnnotation={() => setIsAddingAnnotation(true)}
        onCancelAddAnnotation={() => setIsAddingAnnotation(false)}
      />
    </div>
  );
}
