'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MetricCard {
  label: string;
  value: string;
  prefix?: string;
  unit?: string;
  suffix?: string;
}

interface Experience {
  id: string;
  type: 'internship' | 'education';
  org: string;
  orgEn: string;
  role: string;
  direction?: string;
  period: string;
  periodShort: string;
  logoSrc: string;
  tag?: string;
  metrics?: MetricCard[];
  quote?: string;
  bullets: string[];
  skills?: string[];
  markdownContent?: string;
  galleryImages?: string[];
}

interface InternshipsApiResponse {
  internships: Experience[];
}

interface HonorItem {
  date: string;
  title: string;
  issuer: string;
  level?: string;
}

const educationExperiences: Experience[] = [
  {
    id: 'lingnan',
    type: 'education',
    org: '������ϴ�ѧ',
    orgEn: 'Lingnan University, Hong Kong',
    role: '������  ��ѧԺ Global Business Focus',
    period: '2026.01  2026.06',
    periodShort: '2026',
    logoSrc: '/assets/icons/ln.svg',
    tag: '������Ŀ',
    quote: '���������˹��������ֻ����׿γ̣��̿���Ұ�� AI ���������ڴ�����ںϡ�',
    bullets: [
      '��ѧԺ���Ŀγ̣�ȫ����ҵս�ԡ������г�Ӫ�������������������ҵ����ͳ�Ʒ��������ֻ�����·���о���',
      '���������˹��������ֻ����׿γ̣�̽�� AI ��������ҵ����������ںϡ�',
      '����ѧ������У�ʽ����������Ļ���ͨ������Ӧ�����õ��Ͽɡ�',
    ],
    skills: ['Global Business', '���Ļ���ͨ', 'FinTech', '����'],
  },
  {
    id: 'minzu',
    type: 'education',
    org: '���������ѧ',
    orgEn: 'Minzu University of China',
    role: '����ѧ�����ƣ� ���ʾ�����ó��',
    period: '2024.09  2028.06',
    periodShort: '2024 ',
    logoSrc: '/assets/icons/muc.svg',
    tag: '��У',
    quote: '���ʾ�ó��ɫ�����������о���㡣������̤���������Լ��Ĵ�ѧ֮��',
    bullets: [
      '���޹��ʾ�����ó�ס�',
      '��������ѧУ����������ѧ�����С�����������̽����ͬ�����¶��ڸ���������Ҫ������һ�����',
      '������������ѧԺרҵһ�Ƚ���ѧ��ǰ 5%����ѧҵ�������졣',
    ],
    skills: ['����ѧ', '����ó��', 'Stata', 'Python', 'ѧ��д��'],
  },
];

const honors: HonorItem[] = [
  {
    date: '2026.04',
    title: 'ѧ������У�ʽ�����',
    issuer: '������ϴ�ѧ ��ѧԺ',
    level: 'У��',
  },
  {
    date: '2026.04',
    title: 'ȫ����Դ���ô���  �������о�������һ�Ƚ�',
    issuer: '�й���Դ�о���',
    level: '���Ҽ�',
  },
  {
    date: '2026.03',
    title: '��ʮ����ȫ����ѧ��������  ȫ�����Ƚ�',
    issuer: 'ȫ����ѧ�����´�ҵ������ί��',
    level: '���Ҽ�',
  },
  {
    date: '2025.11',
    title: 'ȫ�� AI ����˾������������ս��  �������Ƚ�',
    issuer: '˾����',
    level: '���Ҽ�',
  },
  {
    date: '2025.09',
    title: '����ѧԺרҵһ�Ƚ���ѧ��ǰ 5%��',
    issuer: '���������ѧ ����ѧԺ',
    level: 'Ժ��',
  },
];

function MobileHonorsMarquee() {
  const loopItems = [...honors, ...honors];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-seed-shadow/40 uppercase tracking-widest">
          Honours & Awards  ��������
        </p>
        <span className="text-[10px] text-seed-shadow/30">�Զ�ѭ��</span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-seed-shadow/10 bg-milk-white/55 py-3">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-milk-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-milk-white to-transparent pointer-events-none z-10" />

        <motion.div
          className="flex gap-2.5 w-max px-3"
          initial={{ x: '-50%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        >
          {loopItems.map((honor, index) => (
            <article
              key={`${honor.title}-${index}`}
              className="w-56 shrink-0 rounded-lg border border-seed-shadow/10 bg-cream-pour/45 p-3"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] text-seed-shadow/40">{honor.date}</span>
                {honor.level ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded border border-seed-shadow/12 text-seed-shadow/55">
                    {honor.level}
                  </span>
                ) : null}
              </div>
              <p className="text-xs font-medium text-seed-shadow/80 leading-relaxed">{honor.title}</p>
              <p className="text-[11px] text-seed-shadow/50 mt-1.5">{honor.issuer}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ExperienceCard({ exp, onClick }: { exp: Experience; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border border-seed-shadow/12 bg-cream-pour/45 p-4 active:scale-[0.99] transition"
    >
      <div className="flex items-start gap-3">
        <img src={exp.logoSrc} alt="" aria-hidden="true" className="w-7 h-7 object-contain mt-0.5" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-seed-shadow truncate">{exp.org}</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-seed-shadow/15 text-seed-shadow/55 shrink-0">{exp.type === 'internship' ? 'Internship' : 'Education'}</span>
          </div>
          <p className="text-xs text-seed-shadow/70 mt-1 leading-relaxed">{exp.role}</p>
          <p className="text-[11px] text-seed-shadow/45 mt-1.5">{exp.period}</p>
        </div>
      </div>
    </button>
  );
}

function MetricItem({ metric }: { metric: MetricCard }) {
  return (
    <div className="rounded-lg border border-seed-shadow/10 bg-milk-white/70 px-3 py-2.5">
      <p className="text-[11px] text-seed-shadow/45 mb-1">{metric.label}</p>
      <p className="text-lg font-serif text-seed-shadow leading-none">
        {metric.prefix ?? ''}
        {metric.value}
        {metric.suffix ?? ''}
        {metric.unit ? <span className="ml-1 text-sm text-seed-shadow/60">{metric.unit}</span> : null}
      </p>
    </div>
  );
}

export function MobileCareerSection() {
  const [internships, setInternships] = useState<Experience[]>([]);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadInternships() {
      try {
        const response = await fetch('/api/career-internships');
        if (!response.ok) return;
        const data = (await response.json()) as InternshipsApiResponse;
        if (!mounted) return;
        setInternships(data.internships ?? []);
      } catch {
        if (mounted) setInternships([]);
      }
    }

    loadInternships();
    return () => {
      mounted = false;
    };
  }, []);

  const cardList = useMemo(() => {
    return [
      ...internships.map((item) => ({ ...item, type: 'internship' as const })),
      ...educationExperiences.map((item) => ({ ...item, type: 'education' as const })),
    ];
  }, [internships]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-serif text-seed-shadow mb-1">Career Journey</h2>
        <p className="text-xs text-seed-shadow/40">�����뾭��</p>
      </div>

      <div className="space-y-2.5">
        {cardList.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} onClick={() => setSelectedExp(exp)} />
        ))}
      </div>

      <MobileHonorsMarquee />

      <AnimatePresence>
        {selectedExp && (
          <>
            <motion.div
              className="fixed inset-0 bg-seed-shadow/30 backdrop-blur-sm z-[80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
            />

            <motion.aside
              className="fixed inset-x-0 bottom-0 top-[8%] z-[81] rounded-t-2xl bg-milk-white border-t border-seed-shadow/12 overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sticky top-0 bg-milk-white/95 backdrop-blur border-b border-seed-shadow/10 px-4 py-3 flex items-center justify-between">
                <button
                  onClick={() => setSelectedExp(null)}
                  className="text-sm text-seed-shadow/75 hover:text-seed-shadow"
                >
                   ���ؿ�Ƭ
                </button>
                <span className="text-[11px] text-seed-shadow/45 uppercase tracking-widest">
                  {selectedExp.type === 'internship' ? 'Internship' : 'Education'}
                </span>
              </div>

              <div className="px-4 py-4 space-y-4">
                <div className="flex items-start gap-3">
                  <img src={selectedExp.logoSrc} alt="" aria-hidden="true" className="w-10 h-10 object-contain mt-0.5" />
                  <div>
                    <h3 className="text-lg font-serif text-seed-shadow leading-snug">{selectedExp.org}</h3>
                    <p className="text-xs text-seed-shadow/65 mt-1">{selectedExp.role}</p>
                    <p className="text-[11px] text-seed-shadow/45 mt-1.5">{selectedExp.period}</p>
                  </div>
                </div>

                {selectedExp.quote ? (
                  <div className="rounded-lg border border-seed-shadow/10 bg-cream-pour/40 px-3.5 py-3">
                    <p className="text-sm text-seed-shadow/75 leading-relaxed">{selectedExp.quote}</p>
                  </div>
                ) : null}

                {selectedExp.metrics && selectedExp.metrics.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    {selectedExp.metrics.map((metric) => (
                      <MetricItem key={metric.label} metric={metric} />
                    ))}
                  </div>
                ) : null}

                {selectedExp.markdownContent ? (
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:text-seed-shadow/75 prose-li:text-seed-shadow/75 prose-strong:text-seed-shadow">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedExp.markdownContent}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedExp.bullets.map((bullet, idx) => (
                      <div key={idx} className="rounded-lg border border-seed-shadow/8 bg-milk-white/70 px-3 py-2.5">
                        <p className="text-sm text-seed-shadow/75 leading-relaxed">{bullet}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedExp.skills && selectedExp.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.skills.map((skill) => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded-full border border-seed-shadow/15 bg-cream-pour/45 text-seed-shadow/75">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
