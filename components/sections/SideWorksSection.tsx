// Side Works 板块：社会实践、志愿服务、跨界参与
export function SideWorksSection() {
  const works = [
    {
      emoji: "🎬",
      title: "北京国际短片节 (BISFF)",
      role: "国际组联络志愿者",
      tags: ["国际交流", "双语宣发", "媒体统筹"],
      desc: "统筹现场执行与国际文化交流，负责双语媒体宣传，展现跨文化沟通与媒体统筹能力。",
      period: "2025.10 — 2025.12",
    },
    {
      emoji: "🌍",
      title: "深圳国际世博会 (Shenzhen Expo)",
      role: "外事协调组志愿者",
      tags: ["跨文化沟通", "外宾接待", "现场统筹"],
      desc: "在多语言环境下负责外宾接待，敏捷应对突发状况，保障大型外事活动顺畅执行。",
      period: "2024.09 — 2025.06",
    },
    {
      emoji: "⚡",
      title: "SheNicest 深圳黑客松 (Hackathon)",
      role: "统筹志愿者 & 软件组参与者",
      tags: ["GenAI 赋能", "Prompt 调优", "跨界参与"],
      desc: "统筹赛事现场执行与流程推进，同时作为参赛团队外部伙伴提供 AI Prompt 调优与应用建议指导。",
      period: "2024",
    },
    {
      emoji: "🌾",
      title: "北京密云产销合作调研",
      role: "田野调查核心队员",
      tags: ["Python 可视化", "田野调查", "策略报告"],
      desc: "深入乡村一线，运用 Python 进行产销图谱可视化，并主笔 5000 字数字化推广策略报告。",
      period: "2025.06 — 2025.08",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-gray-900 mb-1">Side Works</h2>
        <p className="text-xs text-gray-400 mb-6">社会实践 & 技能矩阵</p>
      </div>

      {/* 社会实践 */}
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Field Experience · 社会实践</p>
        <div className="space-y-3">
          {works.map((w) => (
            <div key={w.title} className="border border-gray-100 p-4 hover:border-gray-200 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-xl">{w.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{w.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{w.role}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{w.period}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{w.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {w.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
