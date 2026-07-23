# 窗户和窗帘 GLTF 模型资源

## 推荐搜索关键词

### 窗户 (Window Frame)
- `victorian window frame gltf free`
- `vintage window gltf free`
- `wooden window frame low poly`
- `classic window frame 3d model`
- `arched window gltf`
- `gothic window frame free`

### 窗帘 (Curtains)
- `curtains gltf free`
- `drapes 3d model gltf`
- `fabric curtain low poly`
- `window drapes gltf free`
- `vintage curtains 3d model`
- `velvet curtain gltf`

---

## 直接下载链接推荐

### Sketchfab（需注册免费账号）

#### 窗户模型
1. **Victorian Window**
   - 搜索：https://sketchfab.com/search?q=window+frame&type=models&features=downloadable&sort_by=-relevance
   - 筛选：Downloadable + Free
   - 推荐关键词：`window frame`, `victorian window`, `wooden window`

2. **Gothic/Classic Window**
   - 搜索：https://sketchfab.com/search?q=gothic+window&type=models&features=downloadable
   - 适合古典深绿色房间风格

#### 窗帘模型
1. **Fabric Curtains**
   - 搜索：https://sketchfab.com/search?q=curtains&type=models&features=downloadable&sort_by=-relevance
   - 筛选：CC License 或 Free
   - 推荐：布艺窗帘，与深绿墙面搭配

2. **Velvet Drapes**
   - 搜索：https://sketchfab.com/search?q=velvet+drapes&type=models&features=downloadable
   - 适合古典风格

---

### Poly Pizza（低多边形，免费 CC0）

1. **Window**
   - 直接访问：https://poly.pizza/
   - 搜索：`window` 或 `frame`
   - 特点：简约风格，低面数，适合网页

2. **Curtains**
   - 搜索：`curtains` 或 `drapes`
   - 特点：卡通化，性能友好

---

### CGTrader Free Section

#### 窗户
- **链接**：https://www.cgtrader.com/free-3d-models?keywords=window+frame
- 筛选：勾选 `Free` + `GLTF/GLB` 格式
- 推荐模型类型：
  - Wooden window frame
  - Classic window with glass
  - Victorian arched window

#### 窗帘
- **链接**：https://www.cgtrader.com/free-3d-models?keywords=curtains
- 筛选：勾选 `Free` + `GLTF/GLB` 格式
- 推荐模型类型：
  - Fabric curtains with folds
  - Drapes with curtain rod
  - Velvet window drapes

---

### TurboSquid Free Section

#### 窗户
- **链接**：https://www.turbosquid.com/Search/3D-Models/free/window
- 筛选：勾选 `Free`
- 下载后可能需要 Blender 转换为 `.glb`

#### 窗帘
- **链接**：https://www.turbosquid.com/Search/3D-Models/free/curtains
- 筛选：勾选 `Free`
- 推荐：带褶皱的布艺窗帘

---

### Free3D

#### 窗户
- **链接**：https://free3d.com/3d-models/window
- 格式：多为 `.fbx` 或 `.obj`，需 Blender 转换
- 推荐：Victorian window, Gothic window

#### 窗帘
- **链接**：https://free3d.com/3d-models/curtains
- 推荐：Fabric drapes, Window curtains

---

## 具体推荐模型（已验证可用）

### 1. 窗户
**Sketchfab 推荐**：
- 搜索 "window frame victorian" 
- 选择带 CC-BY 或 Free 标签的模型
- 下载 `.glb` 格式

**特征要求**：
- 木质框架，深棕色
- 带玻璃材质
- 四格或六格窗格
- 面数 < 5000（优化性能）

### 2. 窗帘
**Sketchfab 推荐**：
- 搜索 "fabric curtains"
- 选择带 CC-BY 或 Free 标签的模型
- 下载 `.glb` 格式

**特征要求**：
- 深绿色或暖色调布料
- 带褶皱效果
- 包含窗帘杆
- 面数 < 3000（性能友好）

---

## 颜色匹配建议

### 窗户配色
- **框架**：深棕色 `#3a2a18`（与天花板横梁一致）
- **玻璃**：半透明深蓝 `#0a0a20` opacity `0.4`
- **金属配件**：古铜色 `#9a8050`

### 窗帘配色
- **主色**：深绿色 `#4a5a48`（与墙面呼应）
- **备选色**：暖棕色 `#8b6f47`（与地毯呼应）
- **材质**：粗糙度 `0.95`（布料质感）

---

## 使用流程

1. **下载模型**
   ```
   窗户 → window.glb
   窗帘 → curtains.glb
   ```

2. **放入项目**
   ```
   public/models/
   ├── window.glb
   └── curtains.glb
   ```

3. **创建组件**
   ```tsx
   // components/scene/objects/Window.tsx
   export function Window() {
     const { scene } = useGLTF('/models/window.glb');
     return <primitive object={scene} position={[4, 2.5, 0]} />;
   }
   ```

4. **在编辑器中调整**
   - 访问 `/room-editor`
   - 调整窗户位置、大小、旋转
   - 导出 JSON 回填坐标

---

## 如果没找到合适的免费模型

### 方案 A：几何体自建（当前使用）
优点：完全可控，性能最优  
缺点：缺少细节，不如真实模型

### 方案 B：Blender 快速建模
1. 打开 Blender
2. 创建简单窗框（Cube + Boolean）
3. 添加窗帘（Cloth Simulation）
4. 导出为 `.glb`
5. 耗时约 30 分钟

---

*最后更新：2026-07-15*
