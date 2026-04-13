'use client';
// 藤蔓摇曳动画组件：固定在页面左下/右下角，使用 Framer Motion 实现极微小角度摇曳
// 此为客户端组件，在 layout.tsx（Server Component）中引入

import { motion } from 'framer-motion';

export function VineBackground() {
  return (
    <>
      {/* 藤蔓左下角：绕右上角为原点轻微摇曳 */}
      <motion.img
        src="/assets/decorations/vine-left.png"
        alt=""
        aria-hidden="true"
        className="fixed bottom-0 left-0 w-48 pointer-events-none select-none"
        style={{
          zIndex: 1,
          opacity: 0.18,
          mixBlendMode: 'multiply',
          transformOrigin: 'top right',
        }}
        animate={{ rotate: [-1, 1, -1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 藤蔓右下角：绕左上角为原点轻微摇曳，相位相反 */}
      <motion.img
        src="/assets/decorations/vine-right.png"
        alt=""
        aria-hidden="true"
        className="fixed bottom-0 right-0 w-48 pointer-events-none select-none"
        style={{
          zIndex: 1,
          opacity: 0.18,
          mixBlendMode: 'multiply',
          transformOrigin: 'top left',
        }}
        animate={{ rotate: [1, -1, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </>
  );
}
