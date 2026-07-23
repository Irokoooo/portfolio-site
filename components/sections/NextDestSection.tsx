'use client';
// Next Destination 板块：航向愿景 + 技能攀升路线
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";
import { ClassicalMap } from "@/components/ui/ClassicalMap";
import { useLanguage } from "@/components/i18n/LanguageProvider";

// 双语内容数据结构
const content = {
  title: {
    zh: "Next Destination",
    en: "Next Destination"
  },
  section1: {
    label: {
      zh: "一 · 航向与终极愿景",
      en: "I · Navigation & Ultimate Vision"
    },
    intro: {
      zh: "我有野心，也很贪心，我要走向更远的世界，过上更好的生活。",
      en: "I am ambitious and eager—I want to venture into a wider world and build a better life."
    },
    visions: [
      {
        emoji: "🇪🇺",
        title: "Academic Anchor",
        subtitle: {
          zh: "学术锚点",
          en: "Academic Foundation"
        },
        tag: "Erasmus Mundus Joint Master Degrees",
        description: {
          zh: "志向申请欧洲伊拉斯谟：数字化转型、商业分析、可持续发展治理的跨学科学位。期望走出国门，学到更多的知识，亲身体验到不同的教育环境。",
          en: "Aspiring to pursue Erasmus Mundus programs in digital transformation, business analytics, and sustainability governance. I hope to study abroad, expand my knowledge, and experience diverse educational environments firsthand."
        }
      },
      {
        emoji: "🦅",
        title: "Urban Avian Conservation",
        subtitle: {
          zh: "城市生灵共存",
          en: "Urban Wildlife Coexistence"
        },
        tag: null,
        description: {
          zh: "期望能够为城市鸟类保护、世界珍稀鸟种的保护贡献力量。整个地球从来不只属于人类，空中的精灵也应该有一席之地。",
          en: "I hope to contribute to urban bird conservation and the protection of rare species worldwide. The Earth has never belonged solely to humans—aerial creatures deserve their place too."
        }
      },
      {
        emoji: "🌊",
        title: "Pacific Ecological Governance",
        subtitle: {
          zh: "深蓝治理",
          en: "Deep Blue Stewardship"
        },
        tag: null,
        description: {
          zh: "伴海而生，以此为志。我的人生终极目标是投身太平洋塑料治理，清除海洋生态污染，还生灵一片纯净海域。",
          en: "Born by the sea, devoted to its cause. My ultimate life goal is to engage in Pacific plastic governance, remove marine pollution, and restore a pristine ocean for all living beings."
        }
      },
      {
        emoji: "🌍",
        title: "Area Studies & Global South",
        subtitle: {
          zh: "区域国别与全球发展",
          en: "Regional Studies & Global Development"
        },
        tag: null,
        description: {
          zh: "致力于解码全球南方的增长逻辑。结合国际经贸专业背景，深度调研中国经验（如特高压基建）在不同国别环境下的落地差异。通过田野调查与实证分析，探索东南亚及非洲乡村转型的多元路径，为全球治理贡献来自一线的数据洞察。",
          en: "Dedicated to decoding the growth logic of the Global South. Combining my international trade background, I conduct in-depth research on how Chinese experiences (e.g., ultra-high voltage infrastructure) adapt across different national contexts. Through fieldwork and empirical analysis, I explore diverse pathways for rural transformation in Southeast Asia and Africa, contributing frontline data insights to global governance."
        }
      }
    ]
  },
  section2: {
    label: {
      zh: "二 · 技能树攀升路线",
      en: "II · Skill Development Roadmap"
    },
    intro: {
      zh: "为了达到上述志向，我不会停下奋斗的步伐。",
      en: "To achieve the above aspirations, I will never stop striving forward."
    },
    skills: [
      {
        emoji: "📈",
        title: "Applied Marketing",
        subtitle: {
          zh: "应用营销学",
          en: "Marketing Science"
        },
        description: {
          zh: "学习并应用营销学原理。接触相关生物学知识，探索人类经济行为下实际是生理 / 心理上的什么因素变动。",
          en: "Learning and applying marketing principles. Exploring biological foundations to understand what physiological and psychological factors drive human economic behavior."
        }
      },
      {
        emoji: "🗣️",
        title: "Francophone Mastery",
        subtitle: {
          zh: "法语冲刺",
          en: "French Proficiency"
        },
        description: {
          zh: "冲刺 DELF 法语认证。打通除英语外的第二条核心跨文化通道，扩展自己对于不同文化的理解，进一步深入国别研究。",
          en: "Pursuing DELF French certification. Opening a second core cross-cultural channel beyond English, expanding my understanding of diverse cultures, and deepening my regional studies."
        }
      },
      {
        emoji: "🕸️",
        title: "Digital Garden Cultivation",
        subtitle: {
          zh: "知识库重构",
          en: "Knowledge Base Reconstruction"
        },
        description: {
          zh: "持续构建与优化个人知识管理系统（PKM）。将碎片化的商科理论、语言学习笔记与生态保护文献，编织成一张随时可调用的数字网络。",
          en: "Continuously building and optimizing my Personal Knowledge Management (PKM) system. Weaving fragmented business theories, language learning notes, and ecological conservation literature into an accessible digital network."
        }
      }
    ]
  },
  button: {
    label: {
      zh: "LinkedIn Profile",
      en: "LinkedIn Profile"
    }
  }
};

export function NextDestSection() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-8">

      {/* ── 板块标题 ── */}
      <div>
        <h2 className="text-2xl font-serif text-gray-900 mb-6">
          {lang === 'zh' ? content.title.zh : content.title.en}
        </h2>
      </div>

      {/* ── 古典航海足迹地图（禁止修改此块） ── */}
      <ClassicalMap />

      {/* ════════════════════════════════════════════════
          区块一：航向与终极愿景
          ════════════════════════════════════════════════ */}
      <section className="space-y-5">

        {/* 区块标签 */}
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            {lang === 'zh' ? content.section1.label.zh : content.section1.label.en}
          </p>
          <span className="flex-1 border-t border-gray-100" />
        </div>

        {/* 引言 */}
        <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3 italic">
          {lang === 'zh' ? content.section1.intro.zh : content.section1.intro.en}
        </p>

        {/* 志向条目 */}
        <ul className="space-y-4">
          {content.section1.visions.map((vision, index) => (
            <li
              key={index}
              className="border border-gray-100 p-4 space-y-1.5 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-base leading-none">{vision.emoji}</span>
                <h3 className="text-sm font-semibold text-gray-900 font-serif">
                  {vision.title}
                </h3>
                <span className="text-xs text-gray-400">{lang === 'zh' ? vision.subtitle.zh : vision.subtitle.en}</span>
                {vision.tag && (
                  <span
                    className="ml-auto text-xs tracking-wide"
                    style={{ color: "#8B3A3A", fontStyle: "italic" }}
                  >
                    {vision.tag}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {lang === 'zh' ? vision.description.zh : vision.description.en}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ════════════════════════════════════════════════
          区块二：技能树攀升路线
          ════════════════════════════════════════════════ */}
      <section className="space-y-5">

        {/* 区块标签 */}
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            {lang === 'zh' ? content.section2.label.zh : content.section2.label.en}
          </p>
          <span className="flex-1 border-t border-gray-100" />
        </div>

        {/* 引言 */}
        <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3 italic">
          {lang === 'zh' ? content.section2.intro.zh : content.section2.intro.en}
        </p>

        {/* 技能路线 */}
        <ul className="space-y-3">
          {content.section2.skills.map((skill, index) => (
            <li
              key={index}
              className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0"
            >
              <span className="text-lg leading-none mt-0.5 shrink-0">{skill.emoji}</span>
              <div className="space-y-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-gray-900 font-serif">
                    {skill.title}
                  </h3>
                  <span className="text-xs text-gray-400">{lang === 'zh' ? skill.subtitle.zh : skill.subtitle.en}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'zh' ? skill.description.zh : skill.description.en}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 行动按钮 ── */}
      <div className="flex gap-3 flex-wrap">
        <ExternalLinkButton href="https://www.linkedin.com/in/xinyi-shi1015" label={lang === 'zh' ? content.button.label.zh : content.button.label.en} />
      </div>

    </div>
  );
}
