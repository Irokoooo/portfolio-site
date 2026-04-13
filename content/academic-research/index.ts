// 学术与科研  元数据导出（参考商业分析结构）
// 这里定义三个分类：科研项目、调研项目、自学笔记
import type { MarkdownPost } from "@/lib/markdownLoader";

export type AcademicCategory = "research" | "fieldwork" | "learning";

export interface AcademicResearchPost extends MarkdownPost {
  category: AcademicCategory;
  coverImage?: string;
  pdfUrl?: string;
  contentFile?: string;
}

export const academicResearchPosts: AcademicResearchPost[] = [
  {
    slug: "uhv-power-transmission",
    title: "Energy-Computing Synergy How UHV Projects and Digital",
    description: "在 AIGC 浪潮下，以特高压为准自然实验，识别\"稳态电能\"对东部高科技服务业数字资本连续性的精准赋能机制。",
    content: "",
    contentFile: "uhv-power-transmission.md",
    type: "Research Paper",
    date: "2025-06-15",
    tags: ["Energy", "Digital Infrastructure", "Academic Research"],
    category: "research",
    coverImage: "/works/covers/academic/uhv-power-transmission.jpg",
    pdfUrl: "/works/academic-research/Energy-Computing Synergy How UHV Projects and Digital.pdf",
  },
  {
    slug: "steel-supply-chain",
    title: "从交易中介到多层级供应链服务商",
    description: "中国钢铁贸易产业转型升级研究从交易规模、产业升级、结构转变的多维度分析",
    content: `## 研究缘起（Genesis）
作为团队中唯一的本科生，在师姐的带领下，我跨级参加了“第二届全国国际商务专业学位研究生全球供应链安全与管理专业能力竞赛”。最初的动力是想借此机会，系统学习专业行业研究报告的分析框架与撰写规范。

在专业层面上，随着全球地缘政治摩擦加剧以及欧盟碳关税（CBAM）等新型绿色壁垒的落地，传统单纯依赖“赚差价”的中国钢铁贸易模式已经遭遇严重的利润和生存瓶颈。这促使我们将目光锁定在这一硬核大宗商品领域，探究其如何寻找新的生存空间。

## 角色（Role）
负责核心贸易数据的搜集与可视化建模、数据分析相关章节的撰写，并统筹整份研究报告的排版美化与封面设计。

## 实证/调研路径（Methodology）
研究主要通过贸易网络数据洞察、风险识别与情景模拟来解构供应链短板。为了突破传统人工找数的效率瓶颈，我在此次研究中探索并搭建了自动化的数据处理工作流：编写指令让 AI Agent 接管网页交互，使其能够根据我们的特定需求，自动在 GTI（Global Trade Item）数据库中执行多层级的点击、指标筛选与海量数据下载。

这些自动化获取的底层数据被无缝衔接至可视化软件中，结合找钢网、厦门国贸等典型企业的商业模式拆解，最终形成了从宏观到微观的产业转型评估体系。

## 核心结论（Key Findings）
中国钢铁贸易企业必须摆脱低附加值的传统交易中介定位，在全球价值链重构的背景下，向涵盖物流、金融、数字化赋能的多层级供应链服务商转型，以综合服务能力对冲单一贸易环节的外部风险。

## 过程中遇到的问题和解决方案（Problem & Solution）
### 挑战 1：文风定位与学术规范盲区
作为本科生首次撰写长篇幅产业报告，前期对“行研报告”和“学术竞赛”的文风边界把控不准，对批注与引用格式也缺乏经验。

### 破局对策 1：降维解构与对标学习
广泛搜集并拆解头部券商和咨询公司的精品行业报告，学习其行文逻辑。同时积极向师姐请教，将商业分析的落地感与学术竞赛的严谨性进行中和，严格规范学术批注格式。

### 挑战 2：情景推演的“空中楼阁”陷阱
在分析供应链风险并进行情景推演时，很难建立合理的假设框架，推演过程容易变成主观臆测，缺乏说服力。

### 破局对策 2：引入真实变量做实推演边界
摒弃空泛的逻辑推导，将真实的宏观经济指标与贸易限制政策（如特定国家的反倾销税率、运费波动阈值）作为约束条件注入分析框架，让每一步推演都有具体的数据支撑。

## 个人心得体会（Reflection）
层层剥开钢铁贸易的产业底色后，我最直观的体感是：全球供应链真的是环环相扣，牵一发而动全身。虽然当前频繁的地缘冲突和贸易壁垒让人产生一种“历史开倒车”的错觉，但这反而从反面证明了全球一体化的深层绑定有多么紧密。

这次跨级参赛的研究经历让我跳出了单纯的课本理论，深刻意识到：越是在逆全球化的杂音中，扎实的国别研究和具有全局观的一体化供应链研究，就越具备指导现实的商业与战略价值。`,
    type: "Field Research",
    date: "2025-04-20",
    tags: ["Supply Chain", "Steel Industry", "Business Model"],
    category: "fieldwork",
    coverImage: "/works/covers/academic/steel-supply-chain.jpg",
    pdfUrl: "/works/academic-research/supply-chain-steel-trade.pdf",
  },
  {
    slug: "rural-agriculture",
    title: "北京密云区农产品产销合作",
    description: "密云区农产品产销合作调研报告通过田野调查深化对农业产业链的理解",
    content: `## 研究缘起（Genesis）
基于马克思主义政治经济学视点，农产品利润流失的核心矛盾往往在于中间商的差价剥削。理论上，引入电商模式直接对接终端消费者即可打破这一壁垒。但当我们将视角投向真实的中国乡村时却发现，农户面临着数字鸿沟、营销缺位以及高昂的物流履约成本等现实困境。这种理论推演与乡村现实的巨大撕裂，促使我们将北京密云区（特别是金叵罗村等农业聚落）作为田野调查的样本，去探究真实产销链路中的堵点以及“助农电商”难以全面落地的根源。

## 角色（Role）
核心主导田野数据的采集与全盘可视化建模，并统筹执笔调研成果的新闻深度报道。

## 实证/调研路径（Methodology）
本研究采用深度访谈与走访勘察相结合的田野作业模式。深入密云区金叵罗村等农业合作社，对一线农户、合作社负责人及本土农业企业展开多维度调研。在获取大量且粗粝的一手非结构化原始数据后，对其进行交叉比对与清洗转换，最终通过专业工具构建数据可视化图谱，将原本隐性的农产品产销信息流、物流链路及资金分配流向进行了直观解构与呈现。

## 核心结论（Key Findings）
第一，信息不对称是制约产销对接的核心掣肘，密云农产品普遍缺乏本土强力品牌的整合与背书；第二，高昂的冷链物流与分散的包装成本直接挤压了初级农产品的电商化利润空间；第三，破局的关键在于构建“农户+合作社+平台”的利益共同体，在减少中间环节的同时，推动农业从单一“卖产品”向深度的农文旅融合转型。

## 过程中遇到的问题和解决方案（Problem & Solution）
真实的田野绝不是实验室里的理想模型。初期走访时，首当其冲的是方言壁垒导致的沟通失真与关键信息遗漏。更为棘手的是“行政阻滞”——由于学校申报手续卡壳，团队甚至在现场遭遇了被拒绝入村调研的闭门羹。

面对这些突发状况，我迅速摒弃了学生气的被动等待，开始主动向上推进行政流程，摸索高校与地方对接的沟通逻辑，精准锁定负责老师以打通程序堵点；对下则放弃高高在上的“学术做派”，学着用拉家常的方式与被调查农户建立起人际信任。在消解了老乡们的防备心后，我们才真正拿到了最底层的真实产销账本。

## 个人心得体会（Reflection）
以前在课本里研究了太多经济学理论，直到双脚真正踩进密云的田间地头，才发现在现实社会的旷野中，影响经济行为的变量远比模型复杂得多，足以让许多完美的纸面理论瞬间失效。当我亲手接过老乡递来的刚刚出土的蔬菜，那种真切的土腥味和湿漉漉的触感，深深冲击了我这个原本只会套理论的“榆木脑袋”。它让我彻底清醒：真正有生命力的学术与商业洞察，绝不诞生于象牙塔的温室，而必须扎根于最粗糙、最真实的社会实践之中。`,
    type: "Field Research",
    date: "2025-03-10",
    tags: ["Rural Economy", "Agriculture", "Field Survey"],
    category: "fieldwork",
    coverImage: "/works/covers/academic/rural-agriculture.jpg",
    pdfUrl: "/works/academic-research/rural-agriculture-survey.pdf",
  },
  {
    slug: "cda-data-analysis",
    title: "CDA认证数据分析体系",
    description: "数据分析师一级知识点体系总结涵盖统计学、SQL、Python 等核心技能框架",
    content: `## 研究缘起（Genesis）
希望将分散的学习内容整合为可复盘、可迁移的知识结构，避免只记概念、不成体系。

## 角色（Role）
作为学习者与整理者，负责知识框架搭建、重点难点归档与练习节奏规划。

## 实证/调研路径（Methodology）
按统计基础  SQL 提取  Python 分析  业务表达四段式推进，结合阶段小练习持续校验理解深度。

## 核心结论（Key Findings）
**当知识点按问题-方法-表达链路组织后，分析效率与输出质量明显优于按工具分散学习。**`,
    type: "Learning Notes",
    date: "2025-01-30",
    tags: ["Data Analysis", "CDA", "Professional Development"],
    category: "learning",
    coverImage: "/works/covers/academic/cda-data-analysis.jpg",
    pdfUrl: "/works/academic-research/CDA_1级知识点汇总.pdf",
  },
];

export function getPostsByCategory(category: AcademicCategory): AcademicResearchPost[] {
  return academicResearchPosts.filter((post) => post.category === category);
}

export const categories: { key: AcademicCategory; label: string }[] = [
  { key: "research", label: "科研项目" },
  { key: "fieldwork", label: "调研项目" },
  { key: "learning", label: "自学笔记" },
];
