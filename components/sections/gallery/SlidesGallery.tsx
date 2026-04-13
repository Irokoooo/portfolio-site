'use client';
// Slides Gallery — 路演作品展示
// 交互：鼠标悬停卡片时显示PDF预览（自动轮播页码，悬停暂停）
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  event: string;       // 比赛/课程名称
  period: string;
  tags: string[];
  desc: string;        // 悬停展开的详情
  award?: string;
  pdfUrl: string;      // PDF 文件路径（public/works/slides/）
  pdfPageCount: number; // PDF 总页数
  coverColor: string;  // 封面色调（Tailwind bg 类）
}

function encodePublicFilePath(url: string) {
  const lastSlash = url.lastIndexOf("/");
  if (lastSlash === -1) return url;
  const dir = url.slice(0, lastSlash + 1);
  const filename = url.slice(lastSlash + 1);
  return `${dir}${encodeURIComponent(filename)}`;
}

const slides: SlideItem[] = [
  {
    id: 1,
    title: "绿壳鸡蛋农业品牌商业计划书",
    subtitle: "全国商业大赛 · 国家级奖项",
    event: "全国商业大赛",
    period: "2026.03",
    tags: ["商业计划书", "品牌策划", "小程序产品"],
    desc: "主导小程序与软件产品逻辑、交互设计与实地调查路演。将传统农业品牌与数字化销售渠道结合，构建从产地到消费者的完整商业闭环。",
    award: "全国商业大赛 · 国家级奖项",
    pdfUrl: "/works/slides/绿壳鸡蛋ppt.pdf",
    pdfPageCount: 35,
    coverColor: "bg-emerald-50",
  },
  {
    id: 2,
    title: "全场景具身智能消防机器人系统",
    subtitle: "全国电子商务创新创业挑战赛 · 优秀奖",
    event: "第十六届全国大学生电子商务创新创业挑战赛",
    period: "2026.03",
    tags: ["创新创业", "硬件系统", "商业计划"],
    desc: "展示城市末端消防\"最后一公里\"解决方案的技术与商业逻辑。集成机器学习、物联网与硬件工程，打造具身智能系统的完整演示。",
    award: "全国电子商务创新创业挑战赛优秀奖",
    pdfUrl: "/works/slides/烽智安新——全场景具身智能消防机器人系统.pdf",
    pdfPageCount: 26,
    coverColor: "bg-orange-50",
  },
  {
    id: 3,
    title: "校园拼车出行新模式",
    subtitle: "全国大学生创新创业赛 · 三创赛 2025",
    event: "中央民族大学第三届经创杯 · 全国三创赛",
    period: "2025.3",
    tags: ["共享经济", "校园服务", "商业模式"],
    desc: "创新的校园出行解决方案，集成社交、出行与消费。展示从校园痛点到商业闭环的创业思路与实施路径。",
    award: "三创赛 2025 参赛作品",
    pdfUrl: "/works/slides/小民快跑ppt.pdf",
    pdfPageCount: 20,
    coverColor: "bg-blue-50",
  },
  {
    id: 4,
    title: "文化书吧实体IP赋能社交APP",
    subtitle: "商业赛 2025 · 创意创业项目",
    event: "中国传媒大学 × 中央民族大学联合赛事",
    period: "2025.06",
    tags: ["文化创意", "社群运营", "实体+APP融合"],
    desc: "以传统文化书吧为载体，通过实体IP赋能数字社交平台。展现青年创意、社区服务与银发经济的三维融合创新。",
    award: "商业创意赛 2025",
    pdfUrl: "/works/slides/本科创意组-新文科-巧愿·学者芸窗：以文化书吧实体IP赋能文娱社交app的运营创业实践(1).pdf",
    pdfPageCount: 27,
    coverColor: "bg-pink-50",
  },
  {
    id: 5,
    title: "International Business Management",
    subtitle: "国际商务大赛 · 北京市二等奖",
    event: "国际商务大赛",
    period: "2025.11",
    tags: ["全英文写作", "商务分析", "跨文化沟通"],
    desc: "全英文论文主笔撰写，担任团队主答辩手。从市场分析、竞争格局到战略落地，全程英文输出与现场答辩。",
    award: "北京市二等奖",
    pdfUrl: "/works/slides/International Business Mgt(1).pdf",
    pdfPageCount: 41,
    coverColor: "bg-indigo-50",
  },
  {
    id: 6,
    title: "特高压输电工程对服务业企业绩效的影响",
    subtitle: "全国能源经济大赛 · 一等奖",
    event: "全国能源经济大赛",
    period: "2026.04",
    tags: ["学术路演", "Stata DID", "ArcGIS", "面板数据"],
    desc: "基于双重差分模型的实证研究，展示特高压工程对服务业的外溢效应。配套完整学术 PPT 与可视化图表与答辩演示。",
    award: "本科生研究论文组一等奖",
    pdfUrl: "/works/slides/特高压输电ppt.pdf",
    pdfPageCount: 12,
    coverColor: "bg-amber-50",
  },
];


// PDF 预览框组件 — 手动滚动查看
interface PDFFrameProps {
  pdfUrl: string;
  pdfPageCount: number;
}

function PDFFrame({ pdfUrl, pdfPageCount }: PDFFrameProps) {
  const maxPreviewPages = Math.min(pdfPageCount, 6);
  const pageImageUrls = Array.from({ length: maxPreviewPages }, (_, i) =>
    encodePublicFilePath(pdfUrl.replace(".pdf", `_p${i + 1}.jpg`))
  );

  return (
    <div className="relative w-full aspect-video rounded border-2 border-gray-900 bg-white overflow-hidden">
      <div className="w-full h-full overflow-y-auto bg-white">
        <div className="space-y-2 p-2">
          {pageImageUrls.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`PDF Page ${index + 1}`}
              className="w-full border border-gray-200 rounded-sm"
            />
          ))}
        </div>
      </div>

      {/* 页码指示器 - 左下角 */}
      <div className="absolute bottom-2 left-2 bg-black/60 rounded-full px-2 py-1">
        <p className="text-white text-xs font-medium whitespace-nowrap">
          手动滚动预览
        </p>
      </div>

      {/* 状态标签 - 右上角 */}
      <div className="absolute top-2 right-2 bg-gray-600/70 rounded-full px-2 py-1">
        <p className="text-white text-[10px] whitespace-nowrap">Manual View</p>
      </div>
    </div>
  );
}

function SlideCover({ slide }: { slide: SlideItem }) {
  const [imgError, setImgError] = useState(false);
  const thumbUrl = encodePublicFilePath(slide.pdfUrl.replace(".pdf", "_thumb.jpg"));

  if (imgError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
        Preview Unavailable
      </div>
    );
  }

  return (
    <img
      src={thumbUrl}
      alt={slide.title}
      className="w-full h-full object-contain"
      onError={() => setImgError(true)}
    />
  );
}

export function SlidesGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-gray-900 mb-1">Slides</h2>
        <p className="text-xs text-gray-400 mb-6">路演作品 — 商业计划、学术报告与竞赛演示</p>
      </div>

      {/* PPT 卡片网格 */}
      <div className="grid grid-cols-2 gap-4">
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            className="relative border border-gray-100 rounded-lg overflow-hidden cursor-pointer bg-white transition-shadow duration-200 hover:shadow-md"
            onMouseEnter={() => setHoveredId(slide.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* 未悬停：显示缩略图 + 信息 */}
            <AnimatePresence mode="wait">
              {hoveredId !== slide.id && (
                <motion.div
                  key="normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* 缩略图区域 */}
                  <div className={`${slide.coverColor} px-4 pt-4 pb-3`}>
                    <div className="aspect-video rounded border border-gray-200/60 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <SlideCover slide={slide} />
                    </div>
                  </div>

                  {/* 信息区 */}
                  <div className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-xs font-medium text-gray-900 line-clamp-1">
                          {slide.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{slide.subtitle}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                        {slide.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {slide.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 border border-gray-100 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 悬停：显示 上部文字 + 中部PDF框 + 下部Tags */}
            <AnimatePresence mode="wait">
              {hoveredId === slide.id && (
                <motion.div
                  key="hover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col p-4 h-full"
                >
                  {/* 上部：文字描述 */}
                  <div className="mb-3 flex-shrink-0">
                    <p className="text-xs font-medium text-gray-900 mb-1">{slide.title}</p>
                    {slide.award && (
                      <p className="text-[10px] text-amber-700 mb-1.5 font-medium">{slide.award}</p>
                    )}
                    <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">
                      {slide.desc}
                    </p>
                  </div>

                  {/* 中部：PDF预览框（with 黑色边框）*/}
                  <div className="flex-1 mb-3 min-h-0">
                    <PDFFrame pdfUrl={slide.pdfUrl} pdfPageCount={slide.pdfPageCount} />
                  </div>

                  {/* 下部：Tags */}
                  <div className="flex flex-wrap gap-1 flex-shrink-0">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 border border-gray-100 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* 底部说明 */}
      <div className="border-t border-gray-100 pt-5">
        <p className="text-xs text-gray-400">
          将鼠标悬停在卡片上即可预览 PDF 内容。中间预览框支持手动滚动查看。
        </p>
      </div>
    </div>
  );
}
