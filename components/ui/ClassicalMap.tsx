"use client";

/**
 * ClassicalMap — 古典航海风格足迹地图（世界总览 + 中国省级下钻）
 *
 * 交互逻辑：
 *   1. 默认显示世界地图，中国/土耳其/日本高亮
 *   2. 点击中国 → AnimatePresence 切换到 ChinaProvinceMap（放大动效）
 *   3. 中国地图内点击「← World Map」→ 返回世界视图（收缩动效）
 *
 * 视觉基调：欧式古典数字手稿 / 羊皮纸航海图
 */

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { ChinaProvinceMap } from "./ChinaProvinceMap";

// ── TopoJSON 数据源（world-atlas@2）─────────────────────────────────────
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ── 已访问国家（ISO 3166-1 numeric）────────────────────────────────────
// 仅：中国 156 · 土耳其 792 · 日本 392
const VISITED_COUNTRY_IDS = new Set([
  "156", // 中国 China      ← 可点击下钻
  "792", // 土耳其 Turkey
  "392", // 日本 Japan
]);

// 中国的 ID，用于点击判断
const CHINA_ID = "156";

// ── 国家 ID → 双语名称 ───────────────────────────────────────────────────
const COUNTRY_NAMES: Record<string, { en: string; zh: string }> = {
  "004": { en: "Afghanistan",              zh: "阿富汗" },
  "008": { en: "Albania",                  zh: "阿尔巴尼亚" },
  "012": { en: "Algeria",                  zh: "阿尔及利亚" },
  "024": { en: "Angola",                   zh: "安哥拉" },
  "032": { en: "Argentina",               zh: "阿根廷" },
  "036": { en: "Australia",               zh: "澳大利亚" },
  "040": { en: "Austria",                  zh: "奥地利" },
  "050": { en: "Bangladesh",              zh: "孟加拉国" },
  "056": { en: "Belgium",                  zh: "比利时" },
  "064": { en: "Bhutan",                   zh: "不丹" },
  "068": { en: "Bolivia",                  zh: "玻利维亚" },
  "076": { en: "Brazil",                   zh: "巴西" },
  "100": { en: "Bulgaria",                 zh: "保加利亚" },
  "104": { en: "Myanmar",                  zh: "缅甸" },
  "116": { en: "Cambodia",                 zh: "柬埔寨" },
  "120": { en: "Cameroon",                 zh: "喀麦隆" },
  "124": { en: "Canada",                   zh: "加拿大" },
  "140": { en: "Central African Republic", zh: "中非共和国" },
  "144": { en: "Sri Lanka",               zh: "斯里兰卡" },
  "152": { en: "Chile",                    zh: "智利" },
  "156": { en: "China",                    zh: "中国" },
  "170": { en: "Colombia",                 zh: "哥伦比亚" },
  "178": { en: "Republic of Congo",        zh: "刚果共和国" },
  "180": { en: "DR Congo",                 zh: "刚果民主共和国" },
  "188": { en: "Costa Rica",              zh: "哥斯达黎加" },
  "191": { en: "Croatia",                  zh: "克罗地亚" },
  "192": { en: "Cuba",                     zh: "古巴" },
  "196": { en: "Cyprus",                   zh: "塞浦路斯" },
  "203": { en: "Czech Republic",          zh: "捷克" },
  "208": { en: "Denmark",                  zh: "丹麦" },
  "218": { en: "Ecuador",                  zh: "厄瓜多尔" },
  "818": { en: "Egypt",                    zh: "埃及" },
  "231": { en: "Ethiopia",                 zh: "埃塞俄比亚" },
  "246": { en: "Finland",                  zh: "芬兰" },
  "250": { en: "France",                   zh: "法国" },
  "266": { en: "Gabon",                    zh: "加蓬" },
  "276": { en: "Germany",                  zh: "德国" },
  "288": { en: "Ghana",                    zh: "加纳" },
  "300": { en: "Greece",                   zh: "希腊" },
  "320": { en: "Guatemala",               zh: "危地马拉" },
  "324": { en: "Guinea",                   zh: "几内亚" },
  "332": { en: "Haiti",                    zh: "海地" },
  "340": { en: "Honduras",                 zh: "洪都拉斯" },
  "348": { en: "Hungary",                  zh: "匈牙利" },
  "356": { en: "India",                    zh: "印度" },
  "360": { en: "Indonesia",               zh: "印度尼西亚" },
  "364": { en: "Iran",                     zh: "伊朗" },
  "368": { en: "Iraq",                     zh: "伊拉克" },
  "372": { en: "Ireland",                  zh: "爱尔兰" },
  "376": { en: "Israel",                   zh: "以色列" },
  "380": { en: "Italy",                    zh: "意大利" },
  "384": { en: "Ivory Coast",             zh: "科特迪瓦" },
  "392": { en: "Japan",                    zh: "日本" },
  "400": { en: "Jordan",                   zh: "约旦" },
  "398": { en: "Kazakhstan",              zh: "哈萨克斯坦" },
  "404": { en: "Kenya",                    zh: "肯尼亚" },
  "410": { en: "South Korea",             zh: "韩国" },
  "408": { en: "North Korea",             zh: "朝鲜" },
  "418": { en: "Laos",                     zh: "老挝" },
  "422": { en: "Lebanon",                  zh: "黎巴嫩" },
  "434": { en: "Libya",                    zh: "利比亚" },
  "484": { en: "Mexico",                   zh: "墨西哥" },
  "504": { en: "Morocco",                  zh: "摩洛哥" },
  "508": { en: "Mozambique",              zh: "莫桑比克" },
  "516": { en: "Namibia",                  zh: "纳米比亚" },
  "524": { en: "Nepal",                    zh: "尼泊尔" },
  "528": { en: "Netherlands",             zh: "荷兰" },
  "558": { en: "Nicaragua",               zh: "尼加拉瓜" },
  "562": { en: "Niger",                    zh: "尼日尔" },
  "566": { en: "Nigeria",                  zh: "尼日利亚" },
  "578": { en: "Norway",                   zh: "挪威" },
  "586": { en: "Pakistan",                 zh: "巴基斯坦" },
  "591": { en: "Panama",                   zh: "巴拿马" },
  "598": { en: "Papua New Guinea",        zh: "巴布亚新几内亚" },
  "604": { en: "Peru",                     zh: "秘鲁" },
  "608": { en: "Philippines",             zh: "菲律宾" },
  "616": { en: "Poland",                   zh: "波兰" },
  "620": { en: "Portugal",                 zh: "葡萄牙" },
  "642": { en: "Romania",                  zh: "罗马尼亚" },
  "643": { en: "Russia",                   zh: "俄罗斯" },
  "682": { en: "Saudi Arabia",            zh: "沙特阿拉伯" },
  "686": { en: "Senegal",                  zh: "塞内加尔" },
  "694": { en: "Sierra Leone",            zh: "塞拉利昂" },
  "703": { en: "Slovakia",                 zh: "斯洛伐克" },
  "705": { en: "Slovenia",                 zh: "斯洛文尼亚" },
  "706": { en: "Somalia",                  zh: "索马里" },
  "710": { en: "South Africa",            zh: "南非" },
  "702": { en: "Singapore",               zh: "新加坡" },
  "724": { en: "Spain",                    zh: "西班牙" },
  "736": { en: "Sudan",                    zh: "苏丹" },
  "752": { en: "Sweden",                   zh: "瑞典" },
  "756": { en: "Switzerland",             zh: "瑞士" },
  "760": { en: "Syria",                    zh: "叙利亚" },
  "762": { en: "Tajikistan",              zh: "塔吉克斯坦" },
  "764": { en: "Thailand",                 zh: "泰国" },
  "768": { en: "Togo",                     zh: "多哥" },
  "788": { en: "Tunisia",                  zh: "突尼斯" },
  "792": { en: "Turkey",                   zh: "土耳其" },
  "800": { en: "Uganda",                   zh: "乌干达" },
  "804": { en: "Ukraine",                  zh: "乌克兰" },
  "784": { en: "United Arab Emirates",    zh: "阿联酋" },
  "826": { en: "United Kingdom",          zh: "英国" },
  "840": { en: "United States",           zh: "美国" },
  "858": { en: "Uruguay",                  zh: "乌拉圭" },
  "860": { en: "Uzbekistan",              zh: "乌兹别克斯坦" },
  "862": { en: "Venezuela",               zh: "委内瑞拉" },
  "704": { en: "Vietnam",                  zh: "越南" },
  "887": { en: "Yemen",                    zh: "也门" },
  "894": { en: "Zambia",                   zh: "赞比亚" },
  "716": { en: "Zimbabwe",                 zh: "津巴布韦" },
};

// ── 调色盘（羊皮纸主题）──────────────────────────────────────────────────
const COLORS = {
  ocean:        "transparent",
  land:         "#DDD4C3",
  visited:      "#8B3A3A",
  hoverDefault: "#C4A460",   // 古董金
  hoverVisited: "#A84040",
  hoverChina:   "#6B1F1F",   // 中国 Hover：更深，暗示可下钻
  stroke:       "#5C4033",
  graticule:    "rgba(92,64,51,0.12)",
  sphereStroke: "rgba(92,64,51,0.18)",
};

// ── 视图类型 ──────────────────────────────────────────────────────────────
type MapView = "world" | "china";

// ═════════════════════════════════════════════════════════════════════════
// 主组件
// ═════════════════════════════════════════════════════════════════════════
export function ClassicalMap() {
  const [view, setView] = useState<MapView>("world");

  return (
    <div className="relative w-full">
      {/* ── 标题行 ── */}
      <div className="mb-3 flex items-baseline gap-3">
        <p
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "#7A6655" }}
        >
          Footprints · 足迹版图
        </p>
        {view === "world" && (
          <span
            className="text-xs"
            style={{ color: "rgba(92,64,51,0.45)", fontStyle: "italic" }}
          >
            {VISITED_COUNTRY_IDS.size} territories explored · click China to drill down
          </span>
        )}
      </div>

      {/* ── 动效切换容器 ── */}
      <AnimatePresence mode="wait">
        {view === "world" ? (
          <WorldMapView
            key="world"
            onChinaClick={() => setView("china")}
          />
        ) : (
          <ChinaProvinceMap
            key="china"
            onBack={() => setView("world")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 世界地图视图
// ═════════════════════════════════════════════════════════════════════════
function WorldMapView({ onChinaClick }: { onChinaClick: () => void }) {
  const [hoveredId, setHoveredId]         = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");

  const handleMouseEnter = useCallback((geoId: string) => {
    setHoveredId(geoId);
    const names = COUNTRY_NAMES[geoId];
    // 中国特殊提示：显示可点击提示
    if (geoId === CHINA_ID) {
      setTooltipContent("中国 China · 点击探索省级足迹 →");
    } else if (names) {
      setTooltipContent(`${names.en} · ${names.zh}`);
    } else {
      setTooltipContent(geoId);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTooltipContent("");
  }, []);

  const getFill = useCallback((geoId: string): string => {
    const isVisited = VISITED_COUNTRY_IDS.has(geoId);
    const isHovered = hoveredId === geoId;
    if (isHovered) {
      if (geoId === CHINA_ID) return COLORS.hoverChina;
      return isVisited ? COLORS.hoverVisited : COLORS.hoverDefault;
    }
    return isVisited ? COLORS.visited : COLORS.land;
  }, [hoveredId]);

  return (
    <motion.div
      key="world-view"
      initial={{ opacity: 0, scale: 1.06, y: -6 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.94, y: 6  }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 地图容器 — 复古双线边框 */}
      <div
        style={{
          padding: "6px",
          border: "1.5px solid rgba(92,64,51,0.55)",
          background:
            "linear-gradient(135deg, #F5EFE6 0%, #EDE4D7 50%, #F5EFE6 100%)",
          boxShadow:
            "0 4px 18px rgba(92,64,51,0.14), inset 0 0 24px rgba(92,64,51,0.05)",
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

        {/* Tooltip 锚点 */}
        <div
          data-tooltip-id="classical-map-tooltip"
          data-tooltip-content={tooltipContent}
        >
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 110 }}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            <Sphere
              id="sphere-bg"
              fill={COLORS.ocean}
              stroke={COLORS.sphereStroke}
              strokeWidth={0.6}
            />
            <Graticule stroke={COLORS.graticule} strokeWidth={0.4} />

            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId: string = geo.id?.toString() ?? "";
                  const isChina = geoId === CHINA_ID;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFill(geoId)}
                      stroke={COLORS.stroke}
                      strokeWidth={0.45}
                      onMouseEnter={() => handleMouseEnter(geoId)}
                      onMouseLeave={handleMouseLeave}
                      onClick={isChina ? onChinaClick : undefined}
                      style={{
                        default: {
                          outline: "none",
                          transition: "fill 0.18s ease",
                          // 中国有特殊光标提示
                          cursor: isChina ? "zoom-in" : "inherit",
                        },
                        hover:   { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* 图例 */}
        <div className="flex items-center gap-4 px-4 pb-3 pt-0 justify-end flex-wrap">
          {/* 中国特殊图例（可点击标注） */}
          <div className="flex items-center gap-1.5">
            <span
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                background: COLORS.visited,
                border: `0.5px solid ${COLORS.visited}`,
                borderRadius: "1px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "9px",
                color: "rgba(92,64,51,0.65)",
                fontFamily: '"Times New Roman", Times, Georgia, serif',
                letterSpacing: "0.05em",
                fontStyle: "italic",
              }}
            >
              已踏足 Visited
            </span>
          </div>
          <LegendItem
            color={COLORS.land}
            label="待探索 Unexplored"
            stroke={COLORS.stroke}
          />
        </div>
        </div>{/* /内框 */}
      </div>{/* /外框 */}

      {/* Tooltip */}
      <Tooltip
        id="classical-map-tooltip"
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

// ── 子组件：复古航海图角纹（L形卡尺 + 棱形锚点 + 刻度线）────────────────
type CornerPos = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function CornerOrnament({ position }: { position: CornerPos }) {
  // 定位到各角，再用 CSS transform 镜像得到其余三角
  const posStyle: Record<CornerPos, React.CSSProperties> = {
    "top-left":     { top: 0, left: 0,  transformOrigin: "top left" },
    "top-right":    { top: 0, right: 0, transformOrigin: "top right",    transform: "scaleX(-1)" },
    "bottom-left":  { bottom: 0, left: 0, transformOrigin: "bottom left", transform: "scaleY(-1)" },
    "bottom-right": { bottom: 0, right: 0, transformOrigin: "bottom right", transform: "scale(-1,-1)" },
  };

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 2,
        ...posStyle[position],
      }}
    >
      {/* 外层 L 形卡尺臂 */}
      <polyline
        points="30,3.5 3.5,3.5 3.5,30"
        stroke="#5C4033"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.52"
      />
      {/* 内层细线（双线效果） */}
      <polyline
        points="28,6 6,6 6,28"
        stroke="#5C4033"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* 角点棱形锚点 */}
      <polygon
        points="3.5,0.2 7,3.5 3.5,6.8 0,3.5"
        fill="#5C4033"
        opacity="0.50"
      />
      {/* 水平臂刻度线（从角点向右，间距递减） */}
      <line x1="11" y1="3.5" x2="11" y2="8"   stroke="#5C4033" strokeWidth="0.9" opacity="0.42"/>
      <line x1="18" y1="3.5" x2="18" y2="7"   stroke="#5C4033" strokeWidth="0.9" opacity="0.34"/>
      <line x1="24" y1="3.5" x2="24" y2="6"   stroke="#5C4033" strokeWidth="0.9" opacity="0.26"/>
      {/* 垂直臂刻度线 */}
      <line x1="3.5" y1="11" x2="8"   y2="11" stroke="#5C4033" strokeWidth="0.9" opacity="0.42"/>
      <line x1="3.5" y1="18" x2="7"   y2="18" stroke="#5C4033" strokeWidth="0.9" opacity="0.34"/>
      <line x1="3.5" y1="24" x2="6"   y2="24" stroke="#5C4033" strokeWidth="0.9" opacity="0.26"/>
    </svg>
  );
}

// ── 子组件：图例条目 ─────────────────────────────────────────────────────
function LegendItem({
  color,
  label,
  stroke,
}: {
  color: string;
  label: string;
  stroke?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        style={{
          display: "inline-block",
          width: 9,
          height: 9,
          background: color,
          border: `0.5px solid ${stroke ?? color}`,
          borderRadius: "1px",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "9px",
          color: "rgba(92,64,51,0.65)",
          fontFamily: '"Times New Roman", Times, Georgia, serif',
          letterSpacing: "0.05em",
          fontStyle: "italic",
        }}
      >
        {label}
      </span>
    </div>
  );
}
