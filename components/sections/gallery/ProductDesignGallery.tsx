// 产品设计 Gallery 页：展示 UI/UX、视觉设计和产品思维类项目
export function ProductDesignGallery() {
  const items = [
    {
      emoji: "🎨",
      title: "SheNicest 黑客松 — AI 产品原型",
      tags: ["Figma", "产品思维", "GenAI 应用"],
      desc: "以参赛团队顾问身份参与 AI 产品原型设计，提供 Prompt 调优与 AI 交互流程优化建议，助力团队完成最终展示。",
      period: "2024",
      type: "Product Prototype",
    },
    {
      emoji: "📱",
      title: "留学申请工具流设计",
      tags: ["用户体验", "Notion 数据库", "流程优化"],
      desc: "为自身 Erasmus 申请设计一套完整的信息管理流程，包括选校矩阵、时间轴管理和文书版本控制系统。",
      period: "2025.09 — 至今",
      type: "System Design",
    },
    {
      emoji: "🖼️",
      title: "国际短片节视觉物料设计",
      tags: ["Adobe Photoshop", "双语排版", "品牌视觉"],
      desc: "为 BISFF 国际组设计双语宣传物料，覆盖社交媒体海报、现场展板等多类型视觉输出。",
      period: "2025.10 — 2025.12",
      type: "Visual Design",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-gray-900 mb-1">Product Design</h2>
        <p className="text-xs text-gray-400 mb-6">产品设计 — 从用户洞察到视觉呈现</p>
      </div>

      {/* 项目列表 */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-150 group"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      {item.title}
                    </p>
                    <span className="inline-block text-xs text-gray-400 bg-gray-50 px-2 py-0.5 mt-1 border border-gray-100">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{item.period}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 设计工具 */}
      <div className="border-t border-gray-100 pt-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Design Tools</p>
        <div className="flex flex-wrap gap-2">
          {["Figma", "Canva", "Adobe PS", "Adobe Ai", "Adobe Au", "PPT 路演设计"].map((tool) => (
            <span key={tool} className="text-xs text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
