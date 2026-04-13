'use client';
// InterestsSection（第十五轮）
// - 学术兴趣：点击展开弹幕区（横向滚动问句，hover 暂停+思考气泡）
// - 书架：16本书（上下各8）+ 第二排右侧 SVG 台灯（可交互点亮/熄灭）
// - 泡泡图：7个爱好圆形泡泡
// - Ken Burns 大图轮播
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hobbyPhotos } from "@/lib/hobbyPhotos";

// ─────────────────────────────────────────────
// 学术兴趣数据（含弹幕问题 + hover 思考气泡）
// 你可以在 questions 数组里随意增删条目
// ─────────────────────────────────────────────
const academicInterests = [
  {
    id: "ai",
    title: "生产力重塑 (Generative AI)",
    desc: "关注大模型在垂直领域的落地、Prompt 工程，以及 AI 对个人知识库和工作流的重构。",
    // 弹幕问句。格式：{ q: 问句, thought: hover 显示的思考 }
    // 分三行，每行速度不同
    questions: [
      // 第一行（慢）
      [
        { q: "AI 会替代哪些工作，又会创造哪些？", thought: "我觉得不是替代，而是把工作粒度拆得更细，再重新分配。" },
        { q: "Prompt 工程是真的技能还是过渡期产物？", thought: "与其争论，不如把它当作和机器沟通的语言学去学。" },
        { q: "个人知识库的终极形态是什么？", thought: "也许是一个能主动提问而不只是被动存储的系统。" },
        { q: "大模型真的能理解语义还是只是统计？", thought: "这个问题让我想重新定义「理解」本身。" },
      ],
      // 第二行（中速）
      [
        { q: "用 AI 提效，节省出的时间应该用来做什么？", thought: "这才是真正值得思考的问题——时间的再分配。" },
        { q: "AI 幻觉问题能彻底解决吗？", thought: "也许永远无法彻底解决，就像人类也无法彻底客观。" },
        { q: "什么样的问题是 AI 永远无法解决的？", thought: "需要真实利害关系的判断，和需要承担后果的决策。" },
        { q: "多模态 AI 会如何改变内容创作行业？", thought: "门槛降低，但品味和判断力的稀缺性会大幅上升。" },
      ],
      // 第三行（快）
      [
        { q: "GenAI 时代的核心竞争力是什么？", thought: "会提问 + 会判断 + 会整合——元认知能力。" },
        { q: "AI 工具链如何与个人工作流真正融合？", thought: "关键是找到摩擦最小的那个接入点。" },
        { q: "开源模型会赶上闭源模型吗？", thought: "速度惊人，趋势已经很明显了。" },
        { q: "Agent 时代下人的主体性在哪里？", thought: "在于设定目标和评估结果，而不是执行步骤。" },
      ],
    ],
  },
  {
    id: "digital",
    title: "数字化转型 (Digital Transformation)",
    desc: "传统行业的数字化跃迁、数据治理，以及技术变革对宏观服务业与经济表现的影响。",
    questions: [
      [
        { q: "为什么大量数字化项目最终失败？", thought: "技术不是瓶颈，组织惰性才是。" },
        { q: "数据治理的核心矛盾是什么？", thought: "效率与合规之间的张力，永远在博弈。" },
        { q: "传统企业的数字化应该从哪里切入？", thought: "从痛点最浅、数据最干净的那个流程开始。" },
        { q: "数字化会加剧行业集中度吗？", thought: "规模效应在数字世界被放大了，所以可能会。" },
      ],
      [
        { q: "中小企业的数字化路径和大企业有什么根本不同？", thought: "资源约束反而逼出了更务实的方案。" },
        { q: "数据要素如何真正变成生产要素？", thought: "定价机制和确权是还没解决的基础设施问题。" },
        { q: "服务业数字化为什么比制造业难？", thought: "服务的交付过程本身高度依赖人，标准化阻力更大。" },
        { q: "平台经济的下一个演化方向是什么？", thought: "可能是从流量平台走向基础设施平台。" },
      ],
      [
        { q: "数字化转型的 ROI 如何衡量？", thought: "很多价值是滞后的、间接的，这导致投资决策难做。" },
        { q: "云原生架构适合所有规模的企业吗？", thought: "不适合，迁移成本有时候远高于收益。" },
        { q: "数字化转型需要专门的变革管理吗？", thought: "绝对需要，而且这才是决定成败的关键变量。" },
        { q: "政府数字化和企业数字化的核心差异是什么？", thought: "目标函数完全不同——一个是效率，一个是公平服务。" },
      ],
    ],
  },
  {
    id: "psychology",
    title: "经济心理学与行为决策 (Psychology)",
    desc: "探究非理性选择背后的决策机制，结合经济学模型与心理学动力，分析人类行为偏差。",
    questions: [
      [
        { q: "损失厌恶真的是普世的吗？", thought: "跨文化研究显示有差异，但大方向是一致的。" },
        { q: "「理性人」假设到底错在哪里？", thought: "它假设了人有无限的信息处理能力和稳定的偏好。" },
        { q: "助推（Nudge）是操控还是赋能？", thought: "取决于设计者的目标和透明度，两者都可能。" },
        { q: "行为经济学能预测市场崩溃吗？", thought: "能解释，但预测时间节点还做不到。" },
      ],
      [
        { q: "为什么明知道不该拖延还是会拖延？", thought: "双曲折现——未来的奖励在心理上被大幅打折。" },
        { q: "锚定效应在谈判中有多强？", thought: "强到令人不安，第一个数字往往决定了讨论的框架。" },
        { q: "心理账户如何影响消费决策？", thought: "同样的钱贴了不同标签，花起来的感觉完全不同。" },
        { q: "社会规范和市场规范冲突时会发生什么？", thought: "引入金钱往往会摧毁社会规范，且很难逆转。" },
      ],
      [
        { q: "默认选项为什么如此强大？", thought: "惰性 + 认可效应，改变需要付出认知成本。" },
        { q: "情绪对决策的影响是干扰还是必要信号？", thought: "Damasio 的研究说明：没有情绪其实根本无法做决策。" },
        { q: "过度自信偏差在哪些职业最严重？", thought: "金融分析师、预测师、外科医生——都有研究支持。" },
        { q: "行为设计能帮助人做出更好的长期决策吗？", thought: "承诺机制是目前效果最好的工具之一。" },
      ],
    ],
  },
  {
    id: "regional",
    title: "区域国别研究 (Area Studies)",
    desc: "关注不同区域的政治经济结构、产业路径与文化语境，理解同一商业问题在不同国家的差异化答案。",
    questions: [
      [
        { q: "区域国别研究和国际关系研究的核心差别是什么？", thought: "前者更强调具体区域语境，后者更强调体系规则与权力结构。" },
        { q: "为什么同样的政策工具在不同国家效果完全不同？", thought: "制度基础、社会信任与执行链路的差异，决定了政策落地效果。" },
        { q: "做区域研究时最容易忽略的变量是什么？", thought: "历史路径依赖，很多现实选择都被过去塑形。" },
        { q: "语言能力在区域研究中的价值到底有多大？", thought: "它决定你能否直接接触一手材料，而不是只看二手解读。" },
      ],
      [
        { q: "东盟案例为什么适合观察区域协同治理？", thought: "它同时包含发展差异、制度协商与地缘平衡三个复杂维度。" },
        { q: "中欧经贸议题里，最值得持续跟踪的变量是什么？", thought: "除了贸易额，更关键是规则协调、供应链安全和产业定位。" },
        { q: "区域研究如何转化为企业的市场进入策略？", thought: "把宏观判断转成渠道、合规、伙伴和节奏这四个决策。" },
        { q: "跨国商业模式本地化最难的部分是什么？", thought: "不是技术移植，而是用户行为与制度预期的再适配。" },
      ],
      [
        { q: "比较政治经济学如何提升区域研究解释力？", thought: "它能把零散个案放进可比较、可复盘的分析框架。" },
        { q: "区域研究能为商科申请提供什么独特价值？", thought: "它让商业判断不只停留在数字，还能看到制度与文化约束。" },
        { q: "如何避免把单一区域经验错误外推到全球？", thought: "先建立共性假设，再逐层验证差异边界。" },
        { q: "我为什么持续关注区域国别议题？", thought: "因为它连接了商业决策、社会结构与真实世界的复杂性。" },
      ],
    ],
  },
];

// ─────────────────────────────────────────────
// 弹幕行组件
// ─────────────────────────────────────────────
// duration: 动画时长（秒），越小越快
function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: { q: string; thought: string }[];
  duration: number;
  reverse?: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // 重复两次内容让无缝衔接
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
      <motion.div
        className="flex gap-3 py-1"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        style={{ animationPlayState: hoveredIndex !== null ? 'paused' : 'running' }}
        // pause via animate stop trick: when hover, set to current position
      >
        {doubled.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          const origIdx = idx % items.length;
          return (
            <div
              key={idx}
              className="relative flex-shrink-0"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.2 }}
                className="px-3 py-1.5 rounded-full border cursor-default whitespace-nowrap text-[11px] font-medium transition-colors duration-200"
                style={{
                  borderColor: isHovered ? 'rgba(63,46,47,0.3)' : 'rgba(63,46,47,0.10)',
                  backgroundColor: isHovered ? 'rgba(63,46,47,0.06)' : 'rgba(63,46,47,0.02)',
                  color: isHovered ? 'rgba(63,46,47,0.85)' : 'rgba(63,46,47,0.5)',
                }}
              >
                {item.q}
              </motion.div>

              {/* hover 思考气泡 */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute z-30 bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white/95 rounded-xl border border-seed-shadow/10 shadow-lg px-3.5 py-2.5"
                    style={{ width: 220, backdropFilter: 'blur(8px)' }}
                  >
                    {/* 气泡小三角 */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-r border-b border-seed-shadow/10 rotate-45" />
                    <p className="text-[9px] text-seed-shadow/35 uppercase tracking-widest mb-1">我的思考</p>
                    <p className="text-[11px] text-seed-shadow/75 leading-relaxed">{item.thought}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 学术兴趣卡片（含弹幕展开）
// ─────────────────────────────────────────────
function AcademicCard({ item }: { item: typeof academicInterests[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className={[
          "w-full text-left rounded-xl border-t border-b border-r transition-all duration-200",
          open
            ? "border-t-seed-shadow/8 border-b-seed-shadow/8 border-r-seed-shadow/8 border-l-[3px] bg-cream-pour/60 shadow-sm [border-left-color:#3A5A40]"
            : "border-seed-shadow/8 bg-cream-pour/30 hover:border-seed-shadow/18 hover:shadow-sm border-l",
        ].join(" ")}
      >
        <div className="p-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold leading-tight ${open ? "text-[#3A5A40]" : "text-seed-shadow"}`}>
              {item.title}
            </p>
            {!open && (
              <p className="text-xs text-seed-shadow/50 leading-relaxed mt-1 line-clamp-1">{item.desc}</p>
            )}
          </div>
          {/* 展开/收起箭头 */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-seed-shadow/30 text-xs flex-shrink-0 mt-0.5"
          >
            ↓
          </motion.span>
        </div>
      </button>

      {/* 弹幕展开区 */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="marquee"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="border border-t-0 border-seed-shadow/8 rounded-b-xl bg-gradient-to-b from-cream-pour/40 to-cream-pour/20 px-4 pt-3 pb-4 space-y-2"
              style={{ borderTop: 'none' }}
            >
              <p className="text-[9px] text-seed-shadow/30 uppercase tracking-widest mb-2">
                Questions I keep thinking about · 持续思考的问题
              </p>
              {/* 三行弹幕，速度各不同 */}
              <MarqueeRow items={item.questions[0]} duration={38} />
              <MarqueeRow items={item.questions[1]} duration={28} reverse />
              <MarqueeRow items={item.questions[2]} duration={20} />
              <p className="text-[9px] text-seed-shadow/25 text-right pt-1">
                将鼠标悬停在问题上，查看我的思考 →
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// 书架数据（18本，上下各9）
// cover: 封面图路径（放在 public/Book cover/ 目录下，文件名即书名）
// ─────────────────────────────────────────────
const books = [
  // 上排（9本）
  {
    id: "book1", title: "一只特立独行的猪", author: "王小波",
    spine: "#7A3B2E", side: "#5C2A1E",
    cover: "/Book cover/一只特立独行的猪.jpg",
    quote: "我活在世上，无非想要明白些道理，遇见些有趣的事。",
    height: 148,
  },
  {
    id: "book2", title: "一生之敌", author: "白岩松",
    spine: "#2B4A6B", side: "#1D3450",
    cover: "/Book cover/一生之敌.jpg",
    quote: "跟自己和解，是一生中最难也最必要的功课。",
    height: 136,
  },
  {
    id: "book3", title: "也许你该找个人聊聊", author: "洛莉·戈特利布",
    spine: "#5A7A4A", side: "#3E5A33",
    cover: "/Book cover/也许你该找个人聊聊.jpg",
    quote: "改变，需要先接受现实；接受现实，需要先停止评判。",
    height: 154,
  },
  {
    id: "book4", title: "债", author: "大卫·格雷伯",
    spine: "#4A3A2A", side: "#342819",
    cover: "/Book cover/债.jpg",
    quote: "货币的历史就是一部关于承诺与背叛的历史。",
    height: 142,
  },
  {
    id: "book5", title: "复杂时代下的熵减行动指南", author: "刘润",
    spine: "#1E4A5A", side: "#12303B",
    cover: "/Book cover/复杂时代下的熵减行动指南.jpg",
    quote: "世界在熵增，能做到熵减的人，才是真正的赢家。",
    height: 150,
  },
  {
    id: "book6", title: "当你像鸟飞往你的山", author: "塔拉·韦斯特弗",
    spine: "#4A6B3A", side: "#334D28",
    cover: "/Book cover/当你像鸟飞往你的山.jpg",
    quote: "教育意味着获得不同的视角，理解不同的人、经历和历史。",
    height: 156,
  },
  {
    id: "book7", title: "杀死一只知更鸟", author: "哈珀·李",
    spine: "#6B4A2E", side: "#503521",
    cover: "/Book cover/杀死一只知更鸟.jpg",
    quote: "你永远无法真正了解一个人，除非你从他的角度考虑问题。",
    height: 144,
  },
  {
    id: "book8", title: "棋王 树王 孩子王", author: "阿城",
    spine: "#3A5A6B", side: "#294250",
    cover: "/Book cover/棋王 树王 孩子王.jpg",
    quote: "吃是为了活，活不是单为了吃。",
    height: 132,
  },
  {
    id: "book9", title: "法律的悖论", author: "罗翔",
    spine: "#5A2A4A", side: "#421E36",
    cover: "/Book cover/法律的悖论.jpg",
    quote: "法律的边界，就是人性的边界。",
    height: 140,
  },
  // 下排（9本）
  {
    id: "book10", title: "法治及其本土资源", author: "苏力",
    spine: "#2A4A3A", side: "#1C3528",
    cover: "/Book cover/法治及其本土资源.jpg",
    quote: "法律不是从天上掉下来的，它生长于社会，服务于社会。",
    height: 146,
  },
  {
    id: "book11", title: "法治的细节", author: "罗翔",
    spine: "#6B3A2E", side: "#502921",
    cover: "/Book cover/法治的细节.jpg",
    quote: "正义不只是结果，也是过程。",
    height: 134,
  },
  {
    id: "book12", title: "绿毛水怪", author: "王小波",
    spine: "#3A6B4A", side: "#285035",
    cover: "/Book cover/绿毛水怪.jpg",
    quote: "那一天我二十一岁，在我一生的黄金时代。",
    height: 152,
  },
  {
    id: "book13", title: "蒋勋说红楼梦", author: "蒋勋",
    spine: "#7A3A3A", side: "#5C2828",
    cover: "/Book cover/蒋勋说红楼梦.jpg",
    quote: "红楼梦是一部关于青春、繁华与幻灭的诗。",
    height: 138,
  },
  {
    id: "book14", title: "虚无主义", author: "纳维尔·莫罗",
    spine: "#2A2A4A", side: "#1C1C36",
    cover: "/Book cover/虚无主义.jpg",
    quote: "虚无不是终点，而是追问意义的起点。",
    height: 130,
  },
  {
    id: "book15", title: "西方现代思想讲义", author: "刘擎",
    spine: "#4A3A6B", side: "#342850",
    cover: "/Book cover/西方现代思想讲义.jpg",
    quote: "现代人的困境：我们获得了自由，却失去了方向。",
    height: 148,
  },
  {
    id: "book16", title: "过于喧嚣的孤独", author: "赫拉巴尔",
    spine: "#6B4A3A", side: "#503629",
    cover: "/Book cover/过于喧嚣的孤独.jpg",
    quote: "我有幸受过教育，这使我明白了一件事：不幸是件好事。",
    height: 144,
  },
  {
    id: "book17", title: "那不勒斯四部曲", author: "埃莱娜·费兰特",
    spine: "#5A2A6B", side: "#421C50",
    cover: "/Book cover/那不勒斯四部曲.png",
    quote: "友谊是唯一能让我们看清自己的镜子。",
    height: 156,
  },
  {
    id: "book18", title: "金钱心理学", author: "摩根·豪塞尔",
    spine: "#2A5A4A", side: "#1C4235",
    cover: "/Book cover/金钱心理学.jpg",
    quote: "你对金钱的态度，比金钱本身更能决定你的财富命运。",
    height: 136,
  },
];

const shelf1 = books.slice(0, 9);
const shelf2 = books.slice(9, 18);

// ─────────────────────────────────────────────
// 3D 书脊组件（支持封面图 hover 预览）
// ─────────────────────────────────────────────
function Book3D({ book, onSelect, isSelected }: {
  book: typeof books[0]; onSelect: () => void; isSelected: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onSelect}
      className="cursor-pointer relative flex-shrink-0"
      style={{ width: 20, height: book.height }}
      animate={{ y: isSelected ? -16 : 0 }}
      whileHover={{ y: isSelected ? -18 : -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* 封面图 hover 预览气泡 */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute z-40 pointer-events-none"
            style={{
              bottom: 'calc(100% + 10px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
            }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl border border-seed-shadow/15">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full object-cover"
                style={{ height: 110 }}
              />
            </div>
            {/* 小三角 */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-seed-shadow/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 书脊正面 */}
      <div
        className="absolute inset-0 rounded-sm flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: book.spine,
          boxShadow: isSelected
            ? `0 -10px 28px ${book.spine}90, 0 4px 12px rgba(0,0,0,0.35)`
            : `1px 0 5px rgba(0,0,0,0.2)`,
        }}
      >
        <div style={{
          writingMode: 'vertical-rl', textOrientation: 'mixed',
          color: 'rgba(255,255,255,0.90)', fontSize: 7,
          fontFamily: '"Times New Roman","SimSun",serif',
          letterSpacing: '0.04em', padding: '3px 1px',
          userSelect: 'none', maxHeight: '90%', overflow: 'hidden',
        }}>
          {book.title}
        </div>
        {isSelected && (
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-sm" style={{ background: 'rgba(255,255,255,0.45)' }} />
        )}
      </div>
      {/* 侧面厚度 */}
      <div className="absolute top-0 right-0 rounded-sm"
        style={{ width: 3, height: '100%', backgroundColor: book.side, transform: 'translateX(100%) rotateY(-90deg)', transformOrigin: 'left center' }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SVG 台灯组件（可交互点亮/熄灭）
// ─────────────────────────────────────────────
function DeskLamp() {
  const [on, setOn] = useState(false);

  return (
    <div className="relative flex-shrink-0 flex items-end justify-center" style={{ width: 64, height: 110 }}>
      {/* 光晕（亮时显示） */}
      <AnimatePresence>
        {on && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-none"
            style={{
              top: 4, left: '50%', transform: 'translateX(-50%)',
              width: 150, height: 96,
              background: 'radial-gradient(ellipse at top, rgba(255,220,100,0.35) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      <svg
        width="78" height="138"
        viewBox="0 0 78 138"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer select-none"
        onClick={() => setOn(o => !o)}
        aria-label={on ? "点击关灯" : "点击开灯"}
      >
        {/* 灯罩 */}
        <path d="M16 34 L62 34 L54 10 L24 10 Z" fill={on ? "#D4A84B" : "#8B6914"} stroke="#6B4F10" strokeWidth="1.4" />
        {/* 灯罩内侧（亮时发光） */}
        {on && (
          <path d="M17 33 L61 33 L53 12 L25 12 Z" fill="rgba(255,230,120,0.6)" />
        )}
        {/* 灯泡 */}
        <circle cx="39" cy="36" r="5" fill={on ? "#FFE566" : "#C4A460"}
          style={{ filter: on ? 'drop-shadow(0 0 6px rgba(255,220,80,0.8))' : 'none' }} />
        {/* 灯臂（竖直段） */}
        <rect x="37" y="42" width="4" height="44" rx="2" fill="#8B6914" />
        {/* 灯臂（折弯，向左侧） */}
        <path d="M39 86 Q32 92 32 102" stroke="#8B6914" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* 底座 */}
        <rect x="16" y="128" width="46" height="7" rx="2.5" fill="#6B4F10" />
        <rect x="25" y="102" width="28" height="26" rx="3" fill="#8B6914" />
        {/* 底座光泽 */}
        <rect x="26.5" y="103" width="6" height="24" rx="2" fill="rgba(255,255,255,0.08)" />

        {/* 开关小按钮 */}
        <circle cx="39" cy="115" r="3.6" fill={on ? "#FFE566" : "#6B4F10"} stroke="#5A3E0A" strokeWidth="0.8"
          style={{ cursor: 'pointer', filter: on ? 'drop-shadow(0 0 3px rgba(255,220,80,0.7))' : 'none' }} />
      </svg>

      {/* 提示文字 */}
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] text-seed-shadow/25 whitespace-nowrap">
        {on ? "· 亮着 ·" : "点击"}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 互动鱼缸组件（点击投食，小鱼游动）
// ─────────────────────────────────────────────
function FishTank() {
  const [fed, setFed] = useState(false);
  const [foodDots, setFoodDots] = useState<{id: number; x: number}[]>([]);
  const nextId = useRef(0);

  function handleFeed() {
    setFed(true);
    const dots = Array.from({ length: 4 }, () => ({
      id: nextId.current++,
      x: 20 + Math.random() * 60,
    }));
    setFoodDots(prev => [...prev, ...dots]);
    setTimeout(() => {
      setFoodDots(prev => prev.filter(d => !dots.find(nd => nd.id === d.id)));
      setFed(false);
    }, 2000);
  }

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{ width: 100, height: 68 }}
      onClick={handleFeed}
      title="点击投食"
    >
      <svg width="100" height="68" viewBox="0 0 136 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 玻璃缸体 */}
        <rect x="6" y="14" width="124" height="66" rx="6" fill="rgba(180,220,255,0.16)" stroke="rgba(120,180,240,0.52)" strokeWidth="1.5"/>
        {/* 缸顶边框 */}
        <rect x="4" y="10" width="128" height="6" rx="2.5" fill="rgba(120,180,240,0.42)" stroke="rgba(80,140,200,0.4)" strokeWidth="1"/>
        {/* 水底沙砾 */}
        <ellipse cx="68" cy="76" rx="52" ry="4" fill="rgba(194,160,100,0.35)"/>
        {/* 水草1 */}
        <path d="M28 76 Q24 64 28 54 Q32 44 28 34" stroke="rgba(60,160,80,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M28 54 Q22 50 24 45" stroke="rgba(60,160,80,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* 水草2 */}
        <path d="M104 76 Q108 60 104 50 Q100 40 108 30" stroke="rgba(40,140,70,0.55)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M104 50 Q112 46 110 41" stroke="rgba(40,140,70,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* 气泡 */}
        <circle cx="54" cy="46" r="2" fill="rgba(255,255,255,0.35)"/>
        <circle cx="76" cy="34" r="1.6" fill="rgba(255,255,255,0.3)"/>
        <circle cx="64" cy="26" r="1.2" fill="rgba(255,255,255,0.25)"/>
      </svg>

      {/* 小鱼1（橙色，左右游） */}
      <motion.div
        className="absolute"
        style={{ top: 30, left: 24 }}
        animate={{ x: fed ? [0, 16, 8] : [0, 66, 0], scaleX: fed ? 1 : [1, 1, -1, -1, 1] }}
        transition={{ duration: fed ? 0.5 : 4.4, repeat: fed ? 0 : Infinity, ease: 'easeInOut' }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10">
          <path d="M2 5 Q8 1 14 5 Q8 9 2 5Z" fill="#F4914A" opacity="0.85"/>
          <path d="M0 2 L4 5 L0 8Z" fill="#F4914A" opacity="0.7"/>
          <circle cx="13" cy="4.5" r="1" fill="rgba(0,0,0,0.3)"/>
        </svg>
      </motion.div>

      {/* 小鱼2（蓝色，反向游） */}
      <motion.div
        className="absolute"
        style={{ top: 52, left: 34 }}
        animate={{ x: fed ? [56, 42, 48] : [62, 0, 62], scaleX: fed ? -1 : [-1, -1, 1, 1, -1] }}
        transition={{ duration: fed ? 0.6 : 5.4, repeat: fed ? 0 : Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="16" height="9" viewBox="0 0 16 9">
          <path d="M2 4.5 Q7 1 12 4.5 Q7 8 2 4.5Z" fill="#5A9FD4" opacity="0.85"/>
          <path d="M0 2 L3 4.5 L0 7Z" fill="#5A9FD4" opacity="0.7"/>
          <circle cx="11" cy="4" r="0.9" fill="rgba(0,0,0,0.3)"/>
        </svg>
      </motion.div>

      {/* 投食粒子 */}
      <AnimatePresence>
        {foodDots.map(dot => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-amber-400"
            style={{ width: 3, height: 3, left: dot.x + 26, top: 12 }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 52, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeIn' }}
          />
        ))}
      </AnimatePresence>

      {/* 提示文字 */}
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] text-seed-shadow/25 whitespace-nowrap">
        {fed ? '· 吃啦 ·' : '点击投食'}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 书架层（一排书 + 底板）
// ─────────────────────────────────────────────
function Shelf({ shelfBooks, selectedId, onSelect, showLamp = false, showTank = false }: {
  shelfBooks: typeof books; selectedId: string | null;
  onSelect: (id: string) => void; showLamp?: boolean; showTank?: boolean;
}) {
  return (
    <div className="relative">
      <div className="flex items-end justify-between px-3 pb-0 gap-2">
        <div className="flex items-end gap-1">
          {shelfBooks.map((book) => (
            <Book3D key={book.id} book={book} onSelect={() => onSelect(book.id)} isSelected={selectedId === book.id} />
          ))}
        </div>

        {/* 右侧：鱼缸（上排）或台灯（下排） */}
        <div className="flex items-end justify-end min-w-[72px]">
          {showTank && <FishTank />}
          {showLamp && <DeskLamp />}
        </div>
      </div>
      {/* 书架底板 */}
      <div className="mx-2 h-3 rounded-sm"
        style={{ background: 'linear-gradient(to bottom, #C4A460, #8B6914)', boxShadow: '0 3px 8px rgba(63,46,47,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// Notion 风 Modal
// ─────────────────────────────────────────────
function BookModal({ book, onClose }: { book: typeof books[0]; onClose: () => void }) {
  const [noteUrls, setNoteUrls] = useState<string[]>([]);
  const [noteIndex, setNoteIndex] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setNoteIndex(0);
    const check = async () => {
      const results: string[] = [];
      for (let i = 1; i <= 5; i++) {
        const url = `/photo/interests/books/${book.id}/note${i}.jpg`;
        try { const r = await fetch(url, { method: 'HEAD' }); if (r.ok) results.push(url); } catch {}
      }
      setNoteUrls(results); setChecked(true);
    };
    check();
  }, [book.id]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backdropFilter: 'blur(16px)', backgroundColor: 'rgba(250,248,243,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-white/95 rounded-2xl shadow-2xl overflow-hidden border border-seed-shadow/10 relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1.5" style={{ backgroundColor: book.spine }} />
        <div className="p-8">
          <button onClick={onClose}
            className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-seed-shadow/30 hover:text-seed-shadow/60 hover:bg-seed-shadow/5 transition-all text-lg">×</button>
          <div className="flex items-start gap-4 mb-6">
            {/* 封面图（竖版） */}
            <div className="flex-shrink-0 w-16 rounded-md overflow-hidden shadow-md border border-seed-shadow/10" style={{ height: 96 }}>
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl text-seed-shadow font-medium leading-tight">{book.title}</h3>
              <p className="text-sm text-seed-shadow/45 mt-1">{book.author}</p>
              <p className="text-xs text-seed-shadow/60 italic mt-3 leading-relaxed border-l-2 border-seed-shadow/15 pl-3">"{book.quote}"</p>
            </div>
          </div>
          <div className="border-t border-seed-shadow/8 pt-5">
            <p className="text-[10px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-3">Reading Notes · 读书笔记</p>
            {!checked ? (
              <div className="h-40 bg-cream-pour/30 rounded-xl animate-pulse" />
            ) : noteUrls.length > 0 ? (
              <div className="relative rounded-xl overflow-hidden bg-cream-pour/20" style={{ minHeight: 200 }}>
                <AnimatePresence mode="wait">
                  <motion.img key={noteUrls[noteIndex]} src={noteUrls[noteIndex]} alt="读书笔记" className="w-full object-contain"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} />
                </AnimatePresence>
                {noteUrls.length > 1 && (
                  <>
                    <button onClick={() => setNoteIndex(i => (i - 1 + noteUrls.length) % noteUrls.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/15 hover:bg-black/30 text-white flex items-center justify-center transition-colors">‹</button>
                    <button onClick={() => setNoteIndex(i => (i + 1) % noteUrls.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/15 hover:bg-black/30 text-white flex items-center justify-center transition-colors">›</button>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-seed-shadow/35 leading-relaxed">
                  上传笔记图片至<br />
                  <code className="bg-seed-shadow/5 px-1.5 py-0.5 rounded text-[11px] mt-1 inline-block">
                    public/photo/interests/books/{book.id}/note1.jpg
                  </code>
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// 漂流瓶（生活爱好）— 使用用户提供的 1.svg / 2.svg
// ─────────────────────────────────────────────
const lifeHobbies = [
  { id: "craft",    label: "手工 · 串珠", desc: "用双手创造秩序感，冥想式的专注体验。" },
  { id: "hardware", label: "硬件拼装",     desc: "从零构建可运行的东西，数字与物理的边界模糊处。" },
  { id: "sport",    label: "健身 & 羽球", desc: "在对抗中找到节奏感，身体是最诚实的反馈。" },
  { id: "explore",  label: "探索跨界",     desc: "每个领域都是一扇窗，好奇心是最好的导航。" },
  { id: "reading",  label: "阅读 & 语言", desc: "语言是进入另一个世界的钥匙，阅读是最便宜的旅行。" },
  { id: "coding",   label: "Vibe Coding", desc: "需求驱动的创造，把想法变成可运行的东西。" },
  { id: "pkm",      label: "知识整理",     desc: "思维的外骨骼，让信息不再流失在遗忘曲线里。" },
];

// 瓶子大小与上下浮动配置（固定值，避免 SSR hydration mismatch）
const bottleConfigs = lifeHobbies.map((_, i) => ({
  svg: ([1, 2, 1, 2, 1, 2, 1] as const)[i],
  size: [68, 56, 76, 60, 72, 52, 66][i],          // 瓶子高度 px
  floatAmp: [9, 7, 11, 8, 10, 7, 9][i],           // 上下浮动幅度 px
  floatDur: [3.4, 4.2, 3.8, 4.7, 3.5, 4.4, 3.9][i], // 浮动周期 s
  floatDelay: [0, 1.1, 2.0, 0.6, 1.6, 2.6, 0.9][i],  // 浮动延迟 s
}));

// 单个瓶子组件（浮动动画独立，文字在瓶子下方）
function DriftBottle({ hobby, cfg, idx }: {
  hobby: typeof lifeHobbies[0];
  cfg: typeof bottleConfigs[0];
  idx: number;
}) {
  const [showDesc, setShowDesc] = useState(false);
  // 瓶身宽度按比例（原始 SVG 约 213:265 宽高比）
  const bottleW = Math.round(cfg.size * 0.81);
  const bottleH = cfg.size;

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer select-none shrink-0"
      style={{ width: bottleW + 24 }}
      animate={{ y: [0, -cfg.floatAmp, 0] }}
      transition={{ duration: cfg.floatDur, repeat: Infinity, ease: 'easeInOut', delay: cfg.floatDelay }}
      onClick={() => setShowDesc(v => !v)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      {/* 瓶子图片 */}
      <img
        src={`/assets/decorations/${cfg.svg}.svg`}
        alt={hobby.label}
        width={bottleW}
        height={bottleH}
        style={{ objectFit: 'contain', width: bottleW, height: bottleH }}
        draggable={false}
      />

      {/* 爱好标签：瓶子正下方，字体放大清晰 */}
      <p
        className="mt-1.5 text-center font-medium whitespace-nowrap"
        style={{
          fontFamily: 'serif',
          fontSize: 11,
          color: 'rgba(63,46,47,0.72)',
          letterSpacing: '0.02em',
        }}
      >
        {hobby.label}
      </p>

      {/* click 展开描述纸条 */}
      <AnimatePresence>
        {showDesc && (
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.85 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.85 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="mt-1 bg-amber-50/95 border border-amber-200/60 rounded shadow-sm px-2 py-1.5 pointer-events-none"
            style={{
              originY: 0,
              width: 92,
              backgroundImage: 'repeating-linear-gradient(transparent,transparent 11px,rgba(180,140,60,0.11) 11px,rgba(180,140,60,0.11) 12px)',
            }}
          >
            <p className="text-[8px] text-seed-shadow/60 leading-relaxed text-center" style={{ fontFamily: 'serif' }}>
              {hobby.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BubbleChart() {
  // 复制数组实现无缝 marquee（同胶片轮播思路）
  const doubled = [...lifeHobbies, ...lifeHobbies];
  const doubledCfg = [...bottleConfigs, ...bottleConfigs];

  // marquee 总宽（单程）：每个瓶子平均占 96px
  const ITEM_W = 96;
  const totalW = lifeHobbies.length * ITEM_W;

  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ height: 240 }}>

      {/* ── 海浪背景 ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute bottom-0 w-[200%]" style={{ animation: 'wave-scroll 20s linear infinite' }}
          viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 C180 10 360 70 540 40 S900 10 1080 40 S1260 70 1440 40 S1620 10 1800 40"
            fill="none" stroke="rgba(80,140,210,0.45)" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-6 w-[200%]" style={{ animation: 'wave-scroll 14s linear infinite reverse' }}
          viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50 C200 20 400 80 600 50 S1000 20 1200 50 S1400 80 1600 50"
            fill="none" stroke="rgba(60,120,200,0.30)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-3 w-[200%]" style={{ animation: 'wave-scroll 10s linear infinite' }}
          viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 35 C160 60 320 15 480 35 S800 60 960 35 S1280 15 1440 35"
            fill="none" stroke="rgba(100,160,230,0.22)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 水面渐变 */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(180,220,255,0.13), transparent)' }} />

      {/* 左右遮罩 */}
      <div className="absolute left-0 top-0 bottom-0 w-10 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to right, rgba(247,244,238,0.9), transparent)' }} aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to left, rgba(247,244,238,0.9), transparent)' }} aria-hidden="true" />

      {/* ── marquee 轨道：从右向左无缝移动 ── */}
      <motion.div
        className="absolute top-0 bottom-0 flex items-end pb-8 gap-4"
        animate={{ x: [0, -totalW] }}
        transition={{ duration: lifeHobbies.length * 9, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        style={{ width: totalW * 2 + 100, left: 0 }}
      >
        {doubled.map((h, i) => (
          <DriftBottle key={`${h.id}-${i}`} hobby={h} cfg={doubledCfg[i]} idx={i} />
        ))}
      </motion.div>

      {/* 提示 */}
      <p className="absolute bottom-1 right-3 text-[8px] text-seed-shadow/25 pointer-events-none z-20">
        点击瓶子查看
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 横向胶片带轮播（无缝循环 marquee）
// ─────────────────────────────────────────────
function HobbyKenBurns() {
  const photos = hobbyPhotos;

  if (photos.length === 0) {
    return (
      <div className="h-36 rounded-xl border border-seed-shadow/8 flex flex-col items-center justify-center gap-2 bg-cream-pour/20">
        <p className="text-[10px] text-seed-shadow/35 text-center">
          上传爱好照片至<br />
          <code className="bg-seed-shadow/5 px-1 rounded">public/photo/hobbies/</code><br />
          并更新 lib/hobbyPhotos.ts
        </p>
      </div>
    );
  }

  // 复制数组实现无缝循环
  const doubled = [...photos, ...photos];
  const PHOTO_SIZE = 148; // px，正方形边长
  const GAP = 14;         // px，照片间距
  const totalWidth = photos.length * (PHOTO_SIZE + GAP);

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ height: PHOTO_SIZE + 8 }}>
      {/* 左右边缘渐变遮罩 */}
      <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, var(--tw-bg-opacity, #F7F4EE), transparent)' }}
        aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, var(--tw-bg-opacity, #F7F4EE), transparent)' }}
        aria-hidden="true" />

      {/* 无缝滚动轨道 */}
      <motion.div
        className="flex items-center gap-[14px] absolute left-0 top-0 bottom-0 py-1"
        animate={{ x: [-totalWidth, 0] }}
        transition={{
          duration: photos.length * 4.5,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{ width: totalWidth * 2 + GAP * doubled.length }}
      >
        {doubled.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="shrink-0 rounded-lg overflow-hidden border border-seed-shadow/10 shadow-sm"
            style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
          >
            {/* Ken Burns 缓动叠加在每张图片 */}
            <motion.img
              src={src}
              alt=""
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.06, x: idx % 2 === 0 ? 8 : -8 }}
              animate={{ scale: 1.0, x: 0 }}
              transition={{ duration: 12 + (idx % 3) * 2, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
              style={{ willChange: 'transform' }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 主组件
// ─────────────────────────────────────────────
export function InterestsSection() {
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);

  const handleSelectBook = useCallback((id: string) => {
    const book = books.find(b => b.id === id) ?? null;
    setSelectedBook(prev => prev?.id === id ? null : book);
  }, []);

  return (
    <>
      <div className="space-y-8">
        {/* 标题 */}
        <motion.div initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          <h2 className="text-2xl font-serif text-seed-shadow mb-1">My Interests</h2>
          <p className="text-xs text-seed-shadow/40">兴趣领域</p>
        </motion.div>

        {/* 学术兴趣 + 书架 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* 左：学术兴趣弹幕卡片 */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 space-y-2">
            <p className="text-[10px] font-semibold text-seed-shadow/40 uppercase tracking-widest mb-3">
              Academic Interests · 学术兴趣
            </p>
            {academicInterests.map(item => (
              <AcademicCard key={item.id} item={item} />
            ))}
          </motion.div>

          {/* 右：书架 */}
          <motion.div initial={{ opacity: 0, x: 16, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="rounded-2xl overflow-visible border border-seed-shadow/10 shadow-sm p-4 flex flex-col gap-4"
              style={{ background: 'linear-gradient(160deg, #f5edd8 0%, #ede0c4 100%)' }}>
              <p className="text-[9px] font-medium text-seed-shadow/40 uppercase tracking-widest text-center">Reading Shelf · 书架</p>
              {/* 上排（带鱼缸） */}
              <Shelf shelfBooks={shelf1} selectedId={selectedBook?.id ?? null} onSelect={handleSelectBook} showTank />
              {/* 下排（带台灯） */}
              <Shelf shelfBooks={shelf2} selectedId={selectedBook?.id ?? null} onSelect={handleSelectBook} showLamp />
              <p className="text-[9px] text-seed-shadow/30 text-center">点击书脊查看笔记 · 点击鱼缸投食 · 点击台灯切换光线</p>
            </div>
          </motion.div>
        </div>

        {/* 生活爱好泡泡图 */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="space-y-4">
          <p className="text-[10px] font-semibold text-seed-shadow/40 uppercase tracking-widest">Life &amp; Hobbies · 生活爱好</p>
          <div className="rounded-2xl border border-seed-shadow/8 bg-cream-pour/20 p-6 overflow-hidden">
            <BubbleChart />
            <p className="text-[9px] text-seed-shadow/30 text-center mt-2">将鼠标悬停在泡泡上查看详情</p>
          </div>
        </motion.div>

        {/* Ken Burns 照片流 */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}>
          <p className="text-[10px] font-semibold text-seed-shadow/40 uppercase tracking-widest mb-3">Moments · 生活瞬间</p>
          <HobbyKenBurns />
        </motion.div>
      </div>

      {/* Notion Modal */}
      <AnimatePresence>
        {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </AnimatePresence>
    </>
  );
}
