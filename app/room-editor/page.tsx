'use client';

import dynamic from 'next/dynamic';

const RoomEditorCanvas = dynamic(
  () => import('@/components/scene/RoomEditorCanvas').then((mod) => mod.RoomEditorCanvas),
  { ssr: false }
);

export default function RoomEditorPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#1a0f06]">
      <RoomEditorCanvas />
    </main>
  );
}
