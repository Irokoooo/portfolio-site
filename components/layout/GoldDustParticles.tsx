'use client';
// 金粉飘落粒子动画 — Canvas 2D，稀疏优雅风格
// 25 个小金椭圆从左上角缓慢飘向右下角，不同速率，带 opacity 生命周期渐变
// z-index: 2，位于背景层之上，内容层之下，pointer-events-none

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;       // 横向速度（极慢）
  vy: number;       // 纵向速度（轻盈）
  rotation: number; // 当前旋转角度（弧度）
  vr: number;       // 旋转速度
  rx: number;       // 椭圆半径 x
  ry: number;       // 椭圆半径 y
  color: string;    // 金色系
  life: number;     // 当前生命值 0-1
  lifeSpeed: number;// 生命消耗速率（越小越慢）
  phase: 'in' | 'hold' | 'out'; // 淡入/持续/淡出
  opacity: number;  // 当前不透明度
}

const GOLD_COLORS = ['#D4AF37', '#C9A227', '#F0C040', '#E8C547', '#BFA135'];
const PARTICLE_COUNT = 40;

function createParticle(canvasW: number, canvasH: number): Particle {
  // 全屏随机生成，偏向左上角但覆盖全局
  const x = Math.random() * canvasW;
  const y = Math.random() * canvasH * 0.6;
  return {
    x,
    y,
    vx: 0.15 + Math.random() * 0.50,  // 稍快横移
    vy: 0.30 + Math.random() * 0.65,  // 稍快纵落
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.012, // 缓旋转
    rx: 2 + Math.random() * 3,         // 2-5px 小椭圆
    ry: 1 + Math.random() * 1.5,
    color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
    life: 0,
    lifeSpeed: 0.00018 + Math.random() * 0.00020, // 生命周期 8~15s
    phase: 'in',
    opacity: 0,
  };
}

export function GoldDustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 初始化尺寸
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 初始化粒子（随机分散初始 life，避免所有粒子同时出现）
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const p = createParticle(canvas.width, canvas.height);
      // 随机分散初始状态，避免同时淡入
      p.life = Math.random();
      p.phase = 'hold';
      p.opacity = 0.45 + Math.random() * 0.15;
      // 随机放置在行进中途
      p.x += p.vx * (p.life / p.lifeSpeed) * 0.3;
      p.y += p.vy * (p.life / p.lifeSpeed) * 0.3;
      return p;
    });

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // 更新生命
        p.life += p.lifeSpeed;

        // 生命周期 opacity 控制（0→0.6→0）
        if (p.life < 0.15) {
          p.opacity = (p.life / 0.15) * 0.55;
          p.phase = 'in';
        } else if (p.life < 0.80) {
          p.opacity = 0.55;
          p.phase = 'hold';
        } else if (p.life < 1.0) {
          p.opacity = ((1 - p.life) / 0.20) * 0.55;
          p.phase = 'out';
        } else {
          // 粒子死亡，在左上角重新生成
          Object.assign(p, createParticle(canvas.width, canvas.height));
          continue;
        }

        // 移动
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;

        // 绘制旋转椭圆
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}
