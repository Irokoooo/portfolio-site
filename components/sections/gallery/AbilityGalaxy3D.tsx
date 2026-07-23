'use client';
// ─────────────────────────────────────────────
// 能力星系 · 真 3D 旋涡银河（移植自 galaxy-template.html）
// 旋涡银河盘 + 弥漫星尘 + 自定义呼吸 shader + UnrealBloom 泛光 +
// 中心紫晕 + 淡金轨道环 + 流星；能力星是融在银河里的亮星。
// 点击一颗能力星 → 它与相连能力一起变亮 + 星座连线；详情由父组件从底部浮起。
// 零新依赖：three / OrbitControls / postprocessing 均已在 package.json。
// ─────────────────────────────────────────────
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import {
  GALAXY_DATA,
  CATEGORY_PALETTE,
  type AbilityNode,
} from "@/content/galaxy/abilities";

// 粒子柔光 shader：很慢的呼吸（非闪烁）+ 景深近大远小
const P_VERT = `
attribute float aSize; attribute float aPhase; attribute vec3 aColor;
uniform float uTime; uniform float uPix; varying vec3 vColor; varying float vTw;
void main(){
  vColor=aColor;
  float br=0.9+0.1*sin(uTime*0.28+aPhase);
  vTw=br;
  vec4 mv=modelViewMatrix*vec4(position,1.0);
  gl_PointSize=aSize*uPix*br*(1.0/-mv.z);
  gl_Position=projectionMatrix*mv;
}`;
const P_FRAG = `
varying vec3 vColor; varying float vTw;
void main(){
  float d=length(gl_PointCoord-0.5);
  float a=smoothstep(0.5,0.0,d);
  a=pow(a,1.6)*vTw;
  if(a<0.01) discard;
  gl_FragColor=vec4(vColor,a);
}`;

const GAL_R = 5;
const BRANCHES = 2;
const SPIN = 1.15;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pw = (p: number) => Math.pow(Math.random(), p);
function C(hex: string): [number, number, number] {
  const c = new THREE.Color(hex);
  return [c.r, c.g, c.b];
}

export interface GalaxyEngineHandle {
  highlight: (id: string) => void;
  clear: () => void;
}

interface Props {
  lang: "zh" | "en";
  selectedId: string | null;
  /** 点击能力星回调（点空白传 null） */
  onSelect: (id: string | null) => void;
}

export default function AbilityGalaxy3D({ lang, selectedId, onSelect }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GalaxyEngineHandle | null>(null);
  // 用 ref 持有最新回调，避免引擎闭包捕获旧值
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const langRef = useRef(lang);
  langRef.current = lang;

  // 引擎只初始化一次
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const el = mount; // 非空局部，供闭包使用（TS 在闭包内会把 mount 重新放宽为可空）

    const { nodes, edges } = GALAXY_DATA;
    // id → 相邻能力（据 edges 构建，用于点击联动）
    const neighbors = new Map<string, Set<string>>();
    nodes.forEach((n) => neighbors.set(n.id, new Set()));
    edges.forEach((e) => {
      neighbors.get(e.from)?.add(e.to);
      neighbors.get(e.to)?.add(e.from);
    });

    // ── 渲染器 / 场景 / 相机 / 控制器 ──
    const W = mount.clientWidth || 800;
    const H = mount.clientHeight || 600;
    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    mount.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050209");
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 3.1, 6.3);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.32;
    controls.minDistance = 2.4;
    controls.maxDistance = 13;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI * 0.86;

    function particleMat(sizeScale: number) {
      return new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPix: { value: renderer.getPixelRatio() * sizeScale } },
        vertexShader: P_VERT,
        fragmentShader: P_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    }

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.6, 0.62, 0.12);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ── 银河盘（核心重心 + 弥漫双臂）──
    function buildGalaxy() {
      const N = 11000;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const sz = new Float32Array(N);
      const ph = new Float32Array(N);
      const cIn = C("#ffdcf2"), cMid = C("#c891ff"), cOut = C("#8fb0ff"), gold = C("#ffcf9a");
      for (let i = 0; i < N; i++) {
        const r = pw(1.7) * GAL_R;
        const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
        const spin = r * SPIN;
        const scat = 0.55;
        const sx = pw(2.6) * (Math.random() < 0.5 ? 1 : -1) * scat * (r + 0.4);
        const sz2 = pw(2.6) * (Math.random() < 0.5 ? 1 : -1) * scat * (r + 0.4);
        const sy = pw(3.0) * (Math.random() < 0.5 ? 1 : -1) * scat * 0.34 * (r + 0.3);
        pos[i * 3] = Math.cos(branch + spin) * r + sx;
        pos[i * 3 + 1] = sy;
        pos[i * 3 + 2] = Math.sin(branch + spin) * r + sz2;
        const tN = r / GAL_R;
        let cr, cg, cb;
        if (tN < 0.5) { const k = tN / 0.5; cr = cIn[0] + (cMid[0] - cIn[0]) * k; cg = cIn[1] + (cMid[1] - cIn[1]) * k; cb = cIn[2] + (cMid[2] - cIn[2]) * k; }
        else { const k = (tN - 0.5) / 0.5; cr = cMid[0] + (cOut[0] - cMid[0]) * k; cg = cMid[1] + (cOut[1] - cMid[1]) * k; cb = cMid[2] + (cOut[2] - cMid[2]) * k; }
        if (Math.random() < 0.06) { cr = gold[0]; cg = gold[1]; cb = gold[2]; }
        col[i * 3] = cr; col[i * 3 + 1] = cg; col[i * 3 + 2] = cb;
        sz[i] = rand(1.4, 5.0) * (tN < 0.3 ? 1.15 : 1);
        ph[i] = Math.random() * 6.28;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
      g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
      g.setAttribute("aPhase", new THREE.BufferAttribute(ph, 1));
      return new THREE.Points(g, particleMat(1.05));
    }

    // ── 弥漫星尘（铺满空间增强景深）──
    function buildDust() {
      const N = 5000;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const sz = new Float32Array(N);
      const ph = new Float32Array(N);
      const cols = [C("#e8b8ff"), C("#9fb8ff"), C("#ffd0ec"), C("#c8a0f0"), C("#ffe0b0")];
      for (let i = 0; i < N; i++) {
        const r = pw(1.1) * GAL_R * 1.7 + 0.5;
        const th = Math.random() * Math.PI * 2, y = (Math.random() - 0.5) * GAL_R * 1.1;
        pos[i * 3] = Math.cos(th) * r; pos[i * 3 + 1] = y; pos[i * 3 + 2] = Math.sin(th) * r;
        const c = cols[Math.floor(Math.random() * cols.length)];
        col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
        sz[i] = rand(0.5, 1.8); ph[i] = Math.random() * 6.28;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
      g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
      g.setAttribute("aPhase", new THREE.BufferAttribute(ph, 1));
      const m = particleMat(1); m.uniforms.uPix.value *= 0.9;
      return new THREE.Points(g, m);
    }

    // ── 淡金轨道环 ──
    function buildOrbits() {
      for (const r of [1.3, 2.4, 3.6, 4.7]) {
        const g = new THREE.RingGeometry(r - 0.006, r + 0.006, 128);
        const m = new THREE.MeshBasicMaterial({
          color: "#ffd9a0", transparent: true, opacity: 0.05,
          side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const ring = new THREE.Mesh(g, m); ring.rotation.x = -Math.PI / 2; scene.add(ring);
      }
    }

    // ── 中心紫色柔光晕 ──
    let coreGlow: THREE.Sprite | null = null;
    function buildCoreGlow() {
      const s = 128, cv = document.createElement("canvas"); cv.width = cv.height = s;
      const g = cv.getContext("2d")!;
      const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grd.addColorStop(0, "rgba(255,226,246,.5)");
      grd.addColorStop(0.28, "rgba(234,178,242,.2)");
      grd.addColorStop(0.62, "rgba(186,142,236,.06)");
      grd.addColorStop(1, "rgba(162,126,226,0)");
      g.fillStyle = grd; g.fillRect(0, 0, s, s);
      const mat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.4 });
      coreGlow = new THREE.Sprite(mat); coreGlow.scale.set(1.8, 1.8, 1); scene.add(coreGlow);
    }

    // ── 能力星（融在银河里的亮星，可点击）──
    // 布局：按熟练度由内向外沿旋臂铺开，颜色=分类，大小=作者设定
    const abilityPos: THREE.Vector3[] = [];
    const idToIndex = new Map<string, number>();
    const indexToId: string[] = []; // 顺序索引 → 能力 id（反查，避免展开 Map 迭代器）
    let abilityPoints: THREE.Points | null = null;
    let origColor: Float32Array | null = null;
    let origSize: Float32Array | null = null;

    function abilityStarSize(n: AbilityNode) {
      return 6 + n.size * 4; // 6–14，比背景星稍大但不夸张
    }
    function abilityDim(n: AbilityNode) {
      return [0.6, 0.78, 0.95, 1.15][n.proficiency - 1] ?? 0.8; // 熟练度→亮度
    }

    function buildAbilities() {
      const N = nodes.length;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const sz = new Float32Array(N);
      const ph = new Float32Array(N);
      // 稳定排序：熟练度高的更靠内
      const ordered = nodes
        .map((n, i) => ({ n, i }))
        .sort((a, b) => b.n.proficiency - a.n.proficiency);
      ordered.forEach((o, k) => {
        const n = o.n;
        idToIndex.set(n.id, k);
        indexToId[k] = n.id;
        const t = N > 1 ? k / (N - 1) : 0;
        const r = 0.9 + Math.pow(t, 0.9) * GAL_R * 0.82;
        const branch = ((k % BRANCHES) / BRANCHES) * Math.PI * 2 + k * 0.7;
        const spin = r * SPIN;
        const jx = rand(-0.28, 0.28), jz = rand(-0.28, 0.28), jy = rand(-0.14, 0.14);
        const x = Math.cos(branch + spin) * r + jx;
        const z = Math.sin(branch + spin) * r + jz;
        const y = jy;
        pos[k * 3] = x; pos[k * 3 + 1] = y; pos[k * 3 + 2] = z;
        abilityPos[k] = new THREE.Vector3(x, y, z);
        const c = C(CATEGORY_PALETTE[n.category].core);
        const dim = abilityDim(n);
        col[k * 3] = c[0] * dim; col[k * 3 + 1] = c[1] * dim; col[k * 3 + 2] = c[2] * dim;
        sz[k] = abilityStarSize(n);
        ph[k] = Math.random() * 6.28;
      });
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
      g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
      g.setAttribute("aPhase", new THREE.BufferAttribute(ph, 1));
      abilityPoints = new THREE.Points(g, particleMat(1.4));
      scene.add(abilityPoints);
      origColor = Float32Array.from(col);
      origSize = Float32Array.from(sz);
    }

    // ── 点击 → 该星及相连能力变亮变大 + 星座连线 ──
    let hlLines: THREE.LineSegments | null = null;
    let hlActive: number[] = [];
    function clearHighlight() {
      if (hlLines) { scene.remove(hlLines); hlLines.geometry.dispose(); (hlLines.material as THREE.Material).dispose(); hlLines = null; }
      if (hlActive.length && abilityPoints && origColor && origSize) {
        const cA = abilityPoints.geometry.attributes.aColor as THREE.BufferAttribute;
        const sA = abilityPoints.geometry.attributes.aSize as THREE.BufferAttribute;
        hlActive.forEach((i) => {
          cA.array[i * 3] = origColor![i * 3];
          cA.array[i * 3 + 1] = origColor![i * 3 + 1];
          cA.array[i * 3 + 2] = origColor![i * 3 + 2];
          (sA.array as Float32Array)[i] = origSize![i];
        });
        cA.needsUpdate = true; sA.needsUpdate = true;
      }
      hlActive = [];
    }
    function highlightById(id: string) {
      clearHighlight();
      if (!abilityPoints || !origColor || !origSize) return;
      const index = idToIndex.get(id);
      if (index === undefined) return;
      const relIds = Array.from(neighbors.get(id) ?? []);
      const relIdx = relIds.map((rid) => idToIndex.get(rid)).filter((x): x is number => x !== undefined);
      const idxs = [index, ...relIdx];
      const cA = abilityPoints.geometry.attributes.aColor as THREE.BufferAttribute;
      const sA = abilityPoints.geometry.attributes.aSize as THREE.BufferAttribute;
      idxs.forEach((i, k) => {
        cA.array[i * 3] = Math.min(2.2, origColor![i * 3] * 2.6);
        cA.array[i * 3 + 1] = Math.min(2.2, origColor![i * 3 + 1] * 2.6);
        cA.array[i * 3 + 2] = Math.min(2.2, origColor![i * 3 + 2] * 2.6);
        (sA.array as Float32Array)[i] = origSize![i] * (k === 0 ? 1.9 : 1.5) + 3;
      });
      cA.needsUpdate = true; sA.needsUpdate = true; hlActive = idxs;
      // 连线
      const A = abilityPos[index];
      const lp: number[] = [];
      relIdx.forEach((i) => { const B = abilityPos[i]; lp.push(A.x, A.y, A.z, B.x, B.y, B.z); });
      if (lp.length) {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(lp, 3));
        const node = nodes.find((n) => n.id === id)!;
        hlLines = new THREE.LineSegments(
          g,
          new THREE.LineBasicMaterial({
            color: new THREE.Color(CATEGORY_PALETTE[node.category].core),
            transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false,
          })
        );
        scene.add(hlLines);
      }
    }

    // 暴露给 React 的引擎句柄
    engineRef.current = { highlight: highlightById, clear: clearHighlight };

    // ── 装配场景 ──
    const galaxy = buildGalaxy(); scene.add(galaxy);
    const dust = buildDust(); scene.add(dust);
    buildOrbits(); buildCoreGlow(); buildAbilities();

    // ── 悬停浮标（DOM 元素，跟随星星位置）──
    const hoverLabel = document.createElement("div");
    hoverLabel.style.cssText =
      "position:absolute;transform:translate(-50%,-140%);pointer-events:none;white-space:nowrap;" +
      "font-family:serif;font-size:12px;color:#FBEFFA;text-shadow:0 0 10px rgba(255,180,230,.7),0 1px 4px rgba(0,0,0,.8);" +
      "opacity:0;transition:opacity .2s ease;z-index:5;letter-spacing:.03em";
    mount.appendChild(hoverLabel);
    let hoverIndex = -1;

    // ── 射线拾取 ──
    const ray = new THREE.Raycaster();
    ray.params.Points!.threshold = 0.16;
    const ndc = new THREE.Vector2();
    let downXY: [number, number] | null = null;

    function pick(clientX: number, clientY: number): number {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      if (!abilityPoints) return -1;
      const hit = ray.intersectObject(abilityPoints);
      return hit.length ? (hit[0].index ?? -1) : -1;
    }

    function onPointerDown(e: PointerEvent) { downXY = [e.clientX, e.clientY]; }
    function onPointerUp(e: PointerEvent) {
      if (!downXY) return;
      const moved = Math.abs(e.clientX - downXY[0]) + Math.abs(e.clientY - downXY[1]);
      downXY = null;
      if (moved > 8) return; // 拖动，不算点击
      const idx = pick(e.clientX, e.clientY);
      onSelectRef.current(idx >= 0 ? indexToId[idx] ?? null : null);
    }
    function onPointerMove(e: PointerEvent) {
      const idx = pick(e.clientX, e.clientY);
      hoverIndex = idx;
      canvas.style.cursor = idx >= 0 ? "pointer" : "grab";
    }
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointermove", onPointerMove);

    // ── 流星 ──
    interface Meteor { line: THREE.Line; vel: THREE.Vector3; life: number; ttl: number; trail: THREE.Vector3[]; }
    const meteors: Meteor[] = [];
    let meteorTimer = 2.5;
    function spawnMeteor() {
      const R = GAL_R * 1.5, TRAIL = 14;
      const start = new THREE.Vector3((Math.random() - 0.5) * R * 2, rand(1.5, 4.5), (Math.random() - 0.5) * R * 2);
      const vel = new THREE.Vector3(rand(-1, 1), -rand(0.3, 0.7), rand(-1, 1)).normalize().multiplyScalar(rand(5, 8));
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(TRAIL * 3), col = new Float32Array(TRAIL * 3);
      const tint = [[1, 0.92, 1], [1, 0.85, 0.95], [0.9, 0.92, 1]][Math.floor(Math.random() * 3)];
      for (let i = 0; i < TRAIL; i++) { const a = Math.pow(1 - i / TRAIL, 1.5); col[i * 3] = tint[0] * a; col[i * 3 + 1] = tint[1] * a; col[i * 3 + 2] = tint[2] * a; }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      scene.add(line);
      meteors.push({ line, vel, life: 0, ttl: rand(1.1, 1.8), trail: Array.from({ length: TRAIL }, () => start.clone()) });
    }
    function updateMeteors(dt: number) {
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]; m.life += dt;
        const head = m.trail[0].clone().addScaledVector(m.vel, dt);
        m.trail.unshift(head); m.trail.pop();
        const arr = (m.line.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        m.trail.forEach((p, j) => { arr[j * 3] = p.x; arr[j * 3 + 1] = p.y; arr[j * 3 + 2] = p.z; });
        (m.line.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        (m.line.material as THREE.LineBasicMaterial).opacity = Math.min(1, m.life * 3) * Math.max(0, 1 - m.life / m.ttl);
        if (m.life >= m.ttl) { scene.remove(m.line); m.line.geometry.dispose(); (m.line.material as THREE.Material).dispose(); meteors.splice(i, 1); }
      }
    }

    // ── 主循环 ──
    const clock = new THREE.Clock();
    let openT = 0;
    const _v = new THREE.Vector3();
    let raf = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta(), et = clock.elapsedTime;
      (galaxy.material as THREE.ShaderMaterial).uniforms.uTime.value = et;
      (dust.material as THREE.ShaderMaterial).uniforms.uTime.value = et;
      if (abilityPoints) (abilityPoints.material as THREE.ShaderMaterial).uniforms.uTime.value = et;
      if (coreGlow) { const p = 1 + 0.1 * Math.sin(et * 0.85); coreGlow.scale.setScalar(1.8 * p); (coreGlow.material as THREE.SpriteMaterial).opacity = 0.36 + 0.08 * Math.sin(et * 0.85); }
      meteorTimer -= dt; if (meteorTimer <= 0) { spawnMeteor(); meteorTimer = rand(2.4, 6.5); }
      updateMeteors(dt);
      if (openT < 1) { openT = Math.min(1, openT + dt * 0.42); const e = 1 - Math.pow(1 - openT, 3); camera.position.z = 8.4 - (8.4 - 6.3) * e; }
      controls.update();
      // 悬停浮标
      if (hoverIndex >= 0 && abilityPos[hoverIndex]) {
        const hid = indexToId[hoverIndex];
        const node = hid ? nodes.find((n) => n.id === hid) : null;
        if (node) {
          _v.copy(abilityPos[hoverIndex]).project(camera);
          const x = (_v.x * 0.5 + 0.5) * el.clientWidth;
          const y = (-_v.y * 0.5 + 0.5) * el.clientHeight;
          hoverLabel.style.left = x + "px";
          hoverLabel.style.top = y + "px";
          hoverLabel.textContent = node.name[langRef.current];
          hoverLabel.style.opacity = _v.z < 1 ? "1" : "0";
        }
      } else {
        hoverLabel.style.opacity = "0";
      }
      composer.render();
    }
    animate();

    // ── 尺寸自适应 ──
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h); composer.setSize(w, h);
    });
    ro.observe(mount);

    function cleanup() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
      controls.dispose();
      renderer.dispose();
      scene.traverse((o) => {
        const any = o as any;
        if (any.geometry) any.geometry.dispose?.();
        if (any.material) {
          if (Array.isArray(any.material)) any.material.forEach((m: THREE.Material) => m.dispose());
          else any.material.dispose?.();
        }
      });
      hoverLabel.remove();
      canvas.remove();
    }

    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // selectedId 变化 → 驱动引擎高亮 / 清除
  useEffect(() => {
    if (!engineRef.current) return;
    if (selectedId) engineRef.current.highlight(selectedId);
    else engineRef.current.clear();
  }, [selectedId]);

  return <div ref={mountRef} className="absolute inset-0" style={{ touchAction: "none" }} />;
}
