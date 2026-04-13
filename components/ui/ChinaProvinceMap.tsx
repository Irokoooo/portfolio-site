"use client";

/**
 * ChinaProvinceMap — 中国省级足迹地图（点击中国后的下钻视图）
 *
 * 数据源：直接 import GeoJSON（绕过 URL 加载，避免网络失败）
 *         adcode 为数字类型，如 110000（北京）、440000（广东）、810000（香港）
 * 视觉：延续羊皮纸双线复古边框
 * 交互：省份高亮 + Hover 经历短词 + 返回世界地图按钮
 */

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
// 直接 import GeoJSON 对象，绕过 URL 网络加载，确保始终可用
import CHINA_GEO from "../../public/geo/china-provinces.json";

// ── 省份足迹数据 ──────────────────────────────────────────────────────────
// key：adcode 字符串（DataV GeoJSON 中 adcode 是数字，读取时转 String）
type ExperienceType = "home" | "study" | "exchange" | "travel";

interface ProvinceData {
  zh: string;
  en: string;
  experience: string; // Hover tooltip 短词
  type: ExperienceType;
}

const PROVINCE_EXPERIENCES: Record<string, ProvinceData> = {
  "440000": { zh: "广东", en: "Guangdong",     experience: "家乡 · Hometown",               type: "home"     },
  "110000": { zh: "北京", en: "Beijing",        experience: "大学本科 · Undergraduate",      type: "study"    },
  "810000": { zh: "香港", en: "Hong Kong",      experience: "交换学习 · Exchange Study",     type: "exchange" },
  "500000": { zh: "重庆", en: "Chongqing",      experience: "旅游 · Travel",                type: "travel"   },
  "520000": { zh: "贵州", en: "Guizhou",        experience: "旅游 · 贵阳",                  type: "travel"   },
  "210000": { zh: "辽宁", en: "Liaoning",       experience: "旅游 · 大连",                  type: "travel"   },
  "120000": { zh: "天津", en: "Tianjin",        experience: "旅游 · Travel",                type: "travel"   },
  "130000": { zh: "河北", en: "Hebei",          experience: "旅游 · Travel",                type: "travel"   },
  "150000": { zh: "内蒙古", en: "Inner Mongolia", experience: "旅游 · Travel",              type: "travel"   },
};

// ── 经历类型 → 颜色 ───────────────────────────────────────────────────────
const TYPE_COLORS: Record<ExperienceType, { fill: string; hover: string }> = {
  home:     { fill: "#7A2F2F", hover: "#9C3E3E" }, // 最深暗红 — 家乡
  study:    { fill: "#8B4513", hover: "#A0522D" }, // 深棕橙 — 求学
  exchange: { fill: "#3D5A7A", hover: "#4E6E94" }, // 深蓝墨 — 交换
  travel:   { fill: "#6B5B3E", hover: "#876F4E" }, // 棕褐 — 旅行
};

const LAND_DEFAULT  = "#B8A898"; // 未访问省份：中性暖灰，与背景明显区分
const LAND_HOVER    = "#C4A460"; // 古董金
const STROKE_COLOR  = "#5C4033";

const SAR_MARKERS = [
  { code: "810000", name: "香港", coord: [114.173355, 22.320048] as [number, number] },
  { code: "820000", name: "澳门", coord: [113.54909, 22.198951] as [number, number] },
];

// 部分行政区 GeoJSON 在 d3 下会出现“外环方向相反”问题：
// d3 会把省份解释成“全球减去省份”，导致整幅图被大面填充、仅剩小点可见。
// 这里统一翻转 Polygon/MultiPolygon 的 ring 顺序，确保中国省图正常落在视区内。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reverseGeometryRings(geometry: any) {
  if (!geometry) return geometry;

  if (geometry.type === "Polygon") {
    return {
      ...geometry,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      coordinates: (geometry.coordinates as any[]).map((ring) => [...ring].reverse()),
    };
  }

  if (geometry.type === "MultiPolygon") {
    return {
      ...geometry,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      coordinates: (geometry.coordinates as any[]).map((polygon) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (polygon as any[]).map((ring) => [...ring].reverse())
      ),
    };
  }

  return geometry;
}

// ── 组件 ─────────────────────────────────────────────────────────────────
interface Props {
  onBack: () => void;
}

export function ChinaProvinceMap({ onBack }: Props) {
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");

  // DataV adcode 是数字，统一转成字符串来匹配 PROVINCE_EXPERIENCES 的 key
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCode = useCallback((geo: any): string => {
    const raw = geo?.properties?.adcode ?? geo?.id;
    return raw != null ? String(raw) : "";
  }, []);

  // 仅保留合法省级 feature，避免九段线/聚合面等遮挡层参与渲染
  // 规则：level=province 且 adcode 为 6 位数字，且不包含 100000（全国聚合）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const strictProvinceFeatures = (CHINA_GEO as any).features.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (f: any) => {
      const code = String(f?.properties?.adcode ?? "");
      const level = String(f?.properties?.level ?? "");
      const isProvinceLevel = level === "province";
      const isSixDigitCode = /^\d{6}$/.test(code);
      const isNationalAggregate = code === "100000";
      return isProvinceLevel && isSixDigitCode && !isNationalAggregate;
    }
  );

  // 某些 GeoJSON 版本可能缺 level 字段；若严格过滤结果过少，回退到 adcode 规则
  const filteredFeatures = useMemo(() => {
    if (strictProvinceFeatures.length >= 31) {
      return strictProvinceFeatures;
    }
    return (CHINA_GEO as any).features.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (f: any) => {
        const code = String(f?.properties?.adcode ?? "");
        return /^\d{6}$/.test(code) && code !== "100000";
      }
    );
  }, [strictProvinceFeatures]);

  const filteredGeo = useMemo(
    () => ({
      ...(CHINA_GEO as object),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      features: filteredFeatures.map((feature: any) => ({
        ...feature,
        geometry: reverseGeometryRings(feature.geometry),
      })),
    }),
    [filteredFeatures]
  );

  const handleMouseEnter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (geo: any) => {
      const code = getCode(geo);
      setHoveredCode(code);
      const data = PROVINCE_EXPERIENCES[code];
      if (data) {
        setTooltipContent(`${data.zh} · ${data.experience}`);
      } else {
        // 未高亮省份：显示省名（去掉"省/市/自治区"等后缀更简洁）
        const rawName: string = geo?.properties?.name ?? "";
        const shortName = rawName
          .replace(/省$|市$|自治区$|特别行政区$|回族自治区$|维吾尔自治区$|壮族自治区$/, "");
        setTooltipContent(shortName || code);
      }
    },
    [getCode]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredCode(null);
    setTooltipContent("");
  }, []);

  const getFill = useCallback(
    (code: string): string => {
      const data = PROVINCE_EXPERIENCES[code];
      const isHovered = hoveredCode === code;
      if (data) {
        return isHovered ? TYPE_COLORS[data.type].hover : TYPE_COLORS[data.type].fill;
      }
      return isHovered ? LAND_HOVER : LAND_DEFAULT;
    },
    [hoveredCode]
  );

  return (
    <motion.div
      key="china-view"
      className="relative w-full max-w-3xl"
      initial={{ opacity: 0, scale: 0.88, y: 8  }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 1.06, y: -6 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── 标题行 ── */}
      <div className="mb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{
            fontSize: "10px",
            color: "#7A6655",
            fontFamily: '"Times New Roman", Times, Georgia, serif',
            fontStyle: "italic",
            letterSpacing: "0.04em",
            background: "none",
            border: "none",
            padding: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="#7A6655" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          World Map
        </button>

        <span style={{ color: "rgba(92,64,51,0.25)", fontSize: "10px" }}>／</span>

        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#7A6655" }}>
          中国 · Province Footprints
        </p>

        <span className="text-xs ml-auto" style={{ color: "rgba(92,64,51,0.45)", fontStyle: "italic" }}>
          {Object.keys(PROVINCE_EXPERIENCES).length} provinces visited
        </span>
      </div>

      {/* ── 地图容器 — 复古双线边框 ── */}
      <div
        style={{
          padding: "6px",
          border: "1.5px solid rgba(92,64,51,0.55)",
          background: "linear-gradient(135deg, #F5EFE6 0%, #EDE4D7 50%, #F5EFE6 100%)",
          boxShadow: "0 4px 18px rgba(92,64,51,0.14), inset 0 0 24px rgba(92,64,51,0.05)",
          borderRadius: "1px",
        }}
      >
        {/* 内框 */}
        <div
          className="relative w-full overflow-hidden"
          style={{ border: "1px solid rgba(92,64,51,0.28)" }}
        >
          {/* 四角装饰 */}
          {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map(
            (pos) => <CornerOrnament key={pos} position={pos} />
          )}

          {/* 地图主体 */}
          <div
            data-tooltip-id="china-province-tooltip"
            data-tooltip-content={tooltipContent}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                // 使用 rotate + center 的中国视角，避免路径跨反经线时坐标爆炸导致“地图缩成小点”
                rotate: [-104.5, 0, 0],
                center: [0, 35],
                scale: 545,
              }}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={filteredGeo}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const code = getCode(geo);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getFill(code)}
                        stroke={STROKE_COLOR}
                        strokeWidth={0.65}
                        onMouseEnter={() => handleMouseEnter(geo)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: { outline: "none", transition: "fill 0.15s ease" },
                          hover:   { outline: "none", cursor: "inherit" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

                {/* 港澳区域在省级底图里几何极小，增加可见锚点避免“悬浮命中但视觉空白” */}
                {SAR_MARKERS.map((item) => (
                  <Marker
                    key={item.code}
                    coordinates={item.coord}
                    onMouseEnter={() => {
                      const data = PROVINCE_EXPERIENCES[item.code];
                      setHoveredCode(item.code);
                      setTooltipContent(data ? `${data.zh} · ${data.experience}` : `${item.name}`);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <circle
                      r={3.4}
                      fill={getFill(item.code)}
                      stroke={STROKE_COLOR}
                      strokeWidth={0.8}
                      style={{ cursor: "inherit" }}
                    />
                  </Marker>
                ))}
            </ComposableMap>
          </div>

          {/* 图例 */}
          <div className="flex items-center gap-3 px-4 pb-3 flex-wrap justify-end">
            <LegendItem color={TYPE_COLORS.home.fill}     label="家乡 Hometown" />
            <LegendItem color={TYPE_COLORS.study.fill}    label="求学 Study" />
            <LegendItem color={TYPE_COLORS.exchange.fill} label="交换 Exchange" />
            <LegendItem color={TYPE_COLORS.travel.fill}   label="旅游 Travel" />
            <LegendItem color={LAND_DEFAULT} label="未涉足" stroke={STROKE_COLOR} />
          </div>
        </div>{/* /内框 */}
      </div>{/* /外框 */}

      {/* Tooltip */}
      <Tooltip
        id="china-province-tooltip"
        float
        noArrow
        style={{
          background: "#2C1B10",
          color: "#F0E6D3",
          border: "1px solid rgba(196,164,96,0.45)",
          borderRadius: "1px",
          fontSize: "11px",
          fontFamily: '"Times New Roman", Times, "Songti SC", Georgia, serif',
          padding: "5px 10px",
          letterSpacing: "0.04em",
          boxShadow: "0 2px 8px rgba(44,27,16,0.30)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </motion.div>
  );
}

// ── 子组件：复古 L 形卡尺角纹 ────────────────────────────────────────────
type CornerPos = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function CornerOrnament({ position }: { position: CornerPos }) {
  const posStyle: Record<CornerPos, React.CSSProperties> = {
    "top-left":     { top: 0, left: 0,  transformOrigin: "top left"     },
    "top-right":    { top: 0, right: 0, transformOrigin: "top right",    transform: "scaleX(-1)"   },
    "bottom-left":  { bottom: 0, left: 0, transformOrigin: "bottom left", transform: "scaleY(-1)"  },
    "bottom-right": { bottom: 0, right: 0, transformOrigin: "bottom right", transform: "scale(-1,-1)" },
  };
  return (
    <svg
      width="32" height="32" viewBox="0 0 32 32" fill="none"
      style={{ position: "absolute", pointerEvents: "none", zIndex: 2, ...posStyle[position] }}
    >
      <polyline points="30,3.5 3.5,3.5 3.5,30" stroke="#5C4033" strokeWidth="1.1" strokeLinecap="round" opacity="0.52" />
      <polyline points="28,6 6,6 6,28"          stroke="#5C4033" strokeWidth="0.5" strokeLinecap="round" opacity="0.28" />
      <polygon  points="3.5,0.2 7,3.5 3.5,6.8 0,3.5" fill="#5C4033" opacity="0.50" />
      <line x1="11" y1="3.5" x2="11" y2="8"   stroke="#5C4033" strokeWidth="0.9" opacity="0.42" />
      <line x1="18" y1="3.5" x2="18" y2="7"   stroke="#5C4033" strokeWidth="0.9" opacity="0.34" />
      <line x1="24" y1="3.5" x2="24" y2="6"   stroke="#5C4033" strokeWidth="0.9" opacity="0.26" />
      <line x1="3.5" y1="11" x2="8"   y2="11" stroke="#5C4033" strokeWidth="0.9" opacity="0.42" />
      <line x1="3.5" y1="18" x2="7"   y2="18" stroke="#5C4033" strokeWidth="0.9" opacity="0.34" />
      <line x1="3.5" y1="24" x2="6"   y2="24" stroke="#5C4033" strokeWidth="0.9" opacity="0.26" />
    </svg>
  );
}

// ── 子组件：图例条目 ──────────────────────────────────────────────────────
function LegendItem({ color, label, stroke }: { color: string; label: string; stroke?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span style={{
        display: "inline-block", width: 9, height: 9,
        background: color, border: `0.5px solid ${stroke ?? color}`,
        borderRadius: "1px", flexShrink: 0,
      }} />
      <span style={{
        fontSize: "9px", color: "rgba(92,64,51,0.65)",
        fontFamily: '"Times New Roman", Times, Georgia, serif',
        letterSpacing: "0.05em", fontStyle: "italic",
      }}>
        {label}
      </span>
    </div>
  );
}
