'use client';
import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';

export type OverlayKey = 'laptop' | 'bookshelf' | 'photoframe' | 'wallmap' | 'folder' | 'globe';

interface OverlayStore {
  cameraTarget: OverlayKey | null;
  activeOverlay: OverlayKey | null;
  openOverlay: (key: OverlayKey) => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayStore | null>(null);

// 拖拽视角误触判定的位移阈值（像素）：
// 拖拽旋转视角松手时，鼠标若正好停在某个可交互物件上，
// 浏览器仍会派发一次 click，导致“只是转个视角”却被当成点击跳转。
// 这里记录每次按下到抬起之间的最大位移，超过阈值就判定为拖拽，
// 随后这一次 click 不再触发 openOverlay。
const DRAG_THRESHOLD_PX = 6;

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [cameraTarget, setCameraTarget] = useState<OverlayKey | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<OverlayKey | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({ x: 0, y: 0, moved: false });

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      dragRef.current = { x: e.clientX, y: e.clientY, moved: false };
    }
    function handlePointerMove(e: PointerEvent) {
      const s = dragRef.current;
      if (Math.hypot(e.clientX - s.x, e.clientY - s.y) > DRAG_THRESHOLD_PX) {
        s.moved = true;
      }
    }
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const openOverlay = useCallback((key: OverlayKey) => {
    // 刚刚这一下其实是拖拽视角的尾端点击，忽略，不弹出内容
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    setCameraTarget(key);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Camera flies for 500ms, then content fades in
    timerRef.current = setTimeout(() => setActiveOverlay(key), 500);
  }, []);

  const closeOverlay = useCallback(() => {
    setActiveOverlay(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Brief delay so overlay fade-out plays before camera flies back
    timerRef.current = setTimeout(() => setCameraTarget(null), 300);
  }, []);

  return (
    <OverlayContext.Provider value={{ cameraTarget, activeOverlay, openOverlay, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlayStore() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlayStore must be within OverlayProvider');
  return ctx;
}
