// 商业分析内容索引：直接用 TS 导出，避免服务端 fs 读取引发的客户端 bundle 问题
// 每次添加新文章，在这里追加一个对象即可
import type { MarkdownPost } from "@/lib/markdownLoader";

export const businessAnalysisPosts: MarkdownPost[] = [
  {
    slug: "southeast-asia-market",
    title: "中国消费品牌东南亚市场进入策略报告",
    description: "系统评估东南亚六国市场吸引力，建立三维进入策略矩阵，为国货品牌出海提供决策框架。",
    date: "2025-06",
    tags: ["市场分析", "国际贸易", "东南亚", "品牌出海"],
    type: "Strategy Report",
    coverImage: "/works/covers/business/southeast-asia-market.jpg",
    content: `## 业务语境（Business Context）
客户计划在 2025 年启动出海，但面对多国政策差异、渠道结构复杂和品牌定位不清三重挑战。项目目标是在有限周期内输出可执行的进入顺序与首站落地方案。

## 角色（Role）
负责市场研究框架搭建、国家对比分析与主报告撰写。

## 挑战与对策（Problem & Solution）

| 问题描述（Problem） | 对应解法（Solution） |
|---|---|
| 市场信息分散，三国数据口径不统一，难以横向比较 | 统一指标口径，构建可比矩阵（需求规模/监管友好度/渠道效率/竞争强度） |
| 团队对进入顺序存在分歧，决策缺少证据链 | 使用 PEST 与竞品价格-口碑矩阵进行联合论证，形成分阶段进入结论 |
| 策略建议停留在宏观层，执行可操作性不足 | 输出 90 天行动路径，细化到组织搭建、平台上线、KOL 协同和复盘节点 |

## 交付资产（Deliverables）
<HorizontalScrollShowcase items={["三国市场吸引力矩阵", "竞品价格-口碑地图", "越南90天执行路径"]} />

- 《东南亚市场进入策略报告》完整主文
- 三国优先级与进入节奏建议
- 首站市场执行清单（30/60/90 天）

## 心得体会（Insights）
出海首站不一定是“体量最大”的国家，而应是“组织可控性最高”的国家。先在可控市场完成方法验证，再扩展到复杂市场，能更稳地降低试错成本并提升组织学习效率。

> 请补充：当前内容为理解性初稿，请替换为可核验项目事实（样本来源、关键图表、决策节点与复盘数据）。`,
  },
];
