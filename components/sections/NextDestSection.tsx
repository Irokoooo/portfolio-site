// Next Destination 板块：航向愿景 + 技能攀升路线
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";
import { ClassicalMap } from "@/components/ui/ClassicalMap";

export function NextDestSection() {
  return (
    <div className="space-y-8">

      {/* ── 板块标题 ── */}
      <div>
        <h2 className="text-2xl font-serif text-gray-900 mb-6">Next Destination</h2>
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
            一 · 航向与终极愿景
          </p>
          <span className="flex-1 border-t border-gray-100" />
        </div>

        {/* 引言 */}
        <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3 italic">
          我有野心，也很贪心，我要走向更远的世界，过上更好的生活。
        </p>

        {/* 三个志向条目 */}
        <ul className="space-y-4">

          {/* 🌍 Academic Anchor */}
          <li className="border border-gray-100 p-4 space-y-1.5 hover:border-gray-200 transition-colors">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base leading-none">🌍</span>
              <h3 className="text-sm font-semibold text-gray-900 font-serif">
                Academic Anchor
              </h3>
              <span className="text-xs text-gray-400">学术锚点</span>
              <span
                className="ml-auto text-xs tracking-wide"
                style={{ color: "#8B3A3A", fontStyle: "italic" }}
              >
                Erasmus Mundus Joint Master Degrees
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              志向申请欧洲伊拉斯谟：数字化转型、商业分析、可持续发展治理的跨学科学位。
              期望走出国门，学到更多的知识，亲身体验到不同的教育环境。
            </p>
          </li>

          {/* 🦅 Urban Avian Conservation */}
          <li className="border border-gray-100 p-4 space-y-1.5 hover:border-gray-200 transition-colors">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base leading-none">🦅</span>
              <h3 className="text-sm font-semibold text-gray-900 font-serif">
                Urban Avian Conservation
              </h3>
              <span className="text-xs text-gray-400">城市生灵共存</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              期望能够为城市鸟类保护、世界珍稀鸟种的保护贡献力量。
              整个地球从来不只属于人类，空中的精灵也应该有一席之地。
            </p>
          </li>

          {/* 🌊 Pacific Ecological Governance */}
          <li className="border border-gray-100 p-4 space-y-1.5 hover:border-gray-200 transition-colors">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base leading-none">🌊</span>
              <h3 className="text-sm font-semibold text-gray-900 font-serif">
                Pacific Ecological Governance
              </h3>
              <span className="text-xs text-gray-400">深蓝治理</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              伴海而生，以此为志。我的人生终极目标是投身太平洋塑料治理，清除海洋生态污染，还生灵一片纯净海域。
            </p>
          </li>

        </ul>
      </section>

      {/* ════════════════════════════════════════════════
          区块二：技能树攀升路线
          ════════════════════════════════════════════════ */}
      <section className="space-y-5">

        {/* 区块标签 */}
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            二 · 技能树攀升路线
          </p>
          <span className="flex-1 border-t border-gray-100" />
        </div>

        {/* 引言 */}
        <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3 italic">
          为了达到上述志向，我不会停下奋斗的步伐。
        </p>

        {/* 三条路线 */}
        <ul className="space-y-3">

          {/* 📈 Applied Marketing */}
          <li className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
            <span className="text-lg leading-none mt-0.5 shrink-0">📈</span>
            <div className="space-y-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-gray-900 font-serif">
                  Applied Marketing
                </h3>
                <span className="text-xs text-gray-400">应用营销学</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                学习并应用营销学原理。接触相关生物学知识，探索人类经济行为下实际是
                生理 / 心理上的什么因素变动。
              </p>
            </div>
          </li>

          {/* 🗣️ Francophone Mastery */}
          <li className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
            <span className="text-lg leading-none mt-0.5 shrink-0">🗣️</span>
            <div className="space-y-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-gray-900 font-serif">
                  Francophone Mastery
                </h3>
                <span className="text-xs text-gray-400">法语冲刺</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                冲刺 DELF 法语认证。打通除英语外的第二条核心跨文化通道，
                扩展自己对于不同文化的理解，进一步深入国别研究。
              </p>
            </div>
          </li>

          {/* 🕸️ Digital Garden Cultivation */}
          <li className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
            <span className="text-lg leading-none mt-0.5 shrink-0">🕸️</span>
            <div className="space-y-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-gray-900 font-serif">
                  Digital Garden Cultivation
                </h3>
                <span className="text-xs text-gray-400">知识库重构</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                持续构建与优化个人知识管理系统（PKM）。将碎片化的商科理论、
                语言学习笔记与生态保护文献，编织成一张随时可调用的数字网络。
              </p>
            </div>
          </li>

        </ul>
      </section>

      {/* ── 行动按钮 ── */}
      <div className="flex gap-3 flex-wrap">
        <ExternalLinkButton href="https://www.linkedin.com/in/xinyi-shi1015" label="LinkedIn Profile" />
      </div>

    </div>
  );
}
