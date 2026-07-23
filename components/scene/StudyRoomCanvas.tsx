'use client';
import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { RoomScene } from './RoomScene';

function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a0f06]">
      <div className="text-[#c8a96e] text-sm tracking-widest opacity-60 animate-pulse">
        Loading...
      </div>
    </div>
  );
}

export function StudyRoomCanvas() {
  const reducedFX = typeof navigator !== 'undefined' && navigator.hardwareConcurrency < 4;

  return (
    <div className="w-full h-full">
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 3.5, 9], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#1a0f06' }}
        >
          <RoomScene reducedFX={reducedFX} />
        </Canvas>
      </Suspense>

      {/* Hint text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#c8a96e]/50 text-xs tracking-widest pointer-events-none select-none text-center leading-relaxed">
        点击物件探索 · 拖拽旋转 · 滚轮缩放<br />
        Click to explore · Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
