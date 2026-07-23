# GLTF 模型资源搜索指南

## 推荐免费 3D 模型资源站

### 1. **Sketchfab**
- 网址：https://sketchfab.com/
- 搜索关键词：
  - `monstera plant free gltf` — 龟背竹盆栽
  - `wooden chair gltf free` — 木质椅子
  - `bamboo plant pot gltf` — 文竹/竹子盆栽
  - `bean bag chair gltf free` — 懒人沙发
  - `desk lamp gltf free` — 台灯
  - `globe gltf free` — 地球仪
- 筛选器：选择 `Downloadable` + `CC License` 或 `Free`
- 格式：直接下载 `.glb` 或 `.gltf`

### 2. **Poly Pizza (原 Google Poly)**
- 网址：https://poly.pizza/
- 特点：简约低多边形风格，适合网页使用
- 搜索关键词：
  - `monstera` / `tropical plant`
  - `wooden chair` / `furniture`
  - `bamboo plant`
  - `bean bag`
  - `desk lamp` / `table lamp`
  - `globe` / `world globe`

### 3. **Quaternius**
- 网址：https://quaternius.com/
- 特点：完全免费的低多边形资产包
- 搜索：在 `Ultimate Nature Pack` 或 `Furniture Pack` 中找植物和家具

### 4. **CGTrader Free Section**
- 网址：https://www.cgtrader.com/free-3d-models
- 搜索关键词：
  - `monstera plant free`
  - `wooden dining chair free`
  - `bamboo plant free`
  - `bean bag free`
  - `table lamp free`
  - `desktop globe free`
- 筛选：勾选 `Free` + `GLTF/GLB` 格式

### 5. **TurboSquid Free Section**
- 网址：https://www.turbosquid.com/Search/3D-Models/free
- 搜索：同上关键词
- 格式：下载后可能需要用 Blender 转换为 `.glb`

### 6. **Kenney Assets**
- 网址：https://kenney.nl/assets
- 特点：游戏风格，完全免费 CC0 许可
- 适合：简约卡通风格的家具

---

## 关键词组合技巧

### 植物类
- `monstera deliciosa 3d model gltf`
- `potted plant low poly gltf`
- `bamboo plant terracotta pot`
- `indoor plant 3d free`

### 家具类
- `wooden chair dining gltf`
- `bean bag chair fabric gltf`
- `lazy sofa 3d model`
- `vintage desk lamp gltf`
- `retro globe stand 3d`

### 筛选建议
- 加上 `low poly` — 减少面数，提升网页性能
- 加上 `pbr` — 物理渲染材质，与 Three.js 兼容性好
- 加上 `textured` — 带贴图，视觉效果更好
- 避免超过 5MB 的模型，网页加载太慢

---

## 使用流程

1. **下载模型** — 从上述资源站下载 `.glb` 或 `.gltf` 文件
2. **放入项目** — 保存到 `public/models/` 目录
   ```
   public/models/
   ├── monstera.glb
   ├── chair.glb
   ├── bamboo.glb
   ├── beanbag.glb
   ├── desklamp.glb
   └── globe.glb
   ```
3. **替换占位模型** — 当前 RoomScene.tsx 里用的是几何体，替换为：
   ```tsx
   // 旧代码（几何体占位）
   <group position={[-3.2, 0, -3.2]}>
     <mesh>...</mesh>
   </group>

   // 新代码（GLTF 模型）
   function MonsteraModel() {
     const { scene } = useGLTF('/models/monstera.glb');
     return <primitive object={scene} />;
   }
   useGLTF.preload('/models/monstera.glb');
   ```
4. **调整坐标** — 在 `/room-editor` 里微调位置、旋转、大小
5. **导出 JSON** — 复制编辑器输出的坐标，回填到 RoomScene.tsx

---

## 许可证注意事项

- **CC0** — 完全免费，无需署名
- **CC-BY** — 免费使用，需署名作者
- **Free for Personal Use** — 个人作品集可用，商业项目需付费

建议优先选择 **CC0** 或 **CC-BY** 许可的模型。

---

## Blender 转换（可选）

如果下载的是 `.fbx` 或 `.obj` 格式：

1. 打开 Blender
2. `File > Import > FBX/OBJ`
3. `File > Export > glTF 2.0 (.glb)`
4. 勾选 `+Y Up`（Three.js 默认坐标系）
5. 导出为 `.glb` 文件

---

*最后更新：2026-07-15*
