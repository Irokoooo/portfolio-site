'use client';

import { useState } from 'react';
import type { Annotation, EditableObject, TransformMode, Vec3 } from './RoomEditorCanvas';

type EditorPanelProps = {
  objects: EditableObject[];
  annotations: Annotation[];
  selectedObject: EditableObject | null;
  selectedId: string | null;
  mode: TransformMode;
  isAddingAnnotation: boolean;
  onSelect: (id: string | null) => void;
  onModeChange: (mode: TransformMode) => void;
  onUpdateObject: (id: string, patch: Partial<Pick<EditableObject, 'position' | 'rotation' | 'scale'>>) => void;
  onUpdateAnnotation: (id: string, patch: Partial<Pick<Annotation, 'text' | 'position'>>) => void;
  onDeleteAnnotation: (id: string) => void;
  onStartAddAnnotation: () => void;
  onCancelAddAnnotation: () => void;
};

type Vec3Field = 'position' | 'rotation' | 'scale';

const axisLabels = ['X', 'Y', 'Z'] as const;
const modeLabels: Record<TransformMode, string> = {
  translate: '移动',
  rotate: '旋转',
  scale: '缩放',
};

function updateVec3(vec: Vec3, index: number, value: number): Vec3 {
  const next: Vec3 = [...vec] as Vec3;
  next[index] = value;
  return next;
}

function NumberVecInput({
  label,
  value,
  step,
  onChange,
}: {
  label: string;
  value: Vec3;
  step: number;
  onChange: (next: Vec3) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8a96e]/75">{label}</div>
      <div className="grid grid-cols-3 gap-2">
        {axisLabels.map((axis, index) => (
          <label key={axis} className="space-y-1 text-[10px] uppercase tracking-widest text-[#f5e0bc]/45">
            {axis}
            <input
              type="number"
              step={step}
              value={Number(value[index].toFixed(3))}
              onChange={(event) => onChange(updateVec3(value, index, Number(event.target.value)))}
              className="w-full rounded border border-[#c8a96e]/25 bg-[#2a1a08]/90 px-2 py-1.5 text-xs text-[#f5e0bc] outline-none focus:border-[#c8a96e]"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export function EditorPanel({
  objects,
  annotations,
  selectedObject,
  selectedId,
  mode,
  isAddingAnnotation,
  onSelect,
  onModeChange,
  onUpdateObject,
  onUpdateAnnotation,
  onDeleteAnnotation,
  onStartAddAnnotation,
  onCancelAddAnnotation,
}: EditorPanelProps) {
  const [copyStatus, setCopyStatus] = useState('');

  const updateSelectedVec = (field: Vec3Field, value: Vec3) => {
    if (!selectedObject) return;
    onUpdateObject(selectedObject.id, { [field]: value });
  };

  const exportJson = async () => {
    const payload = JSON.stringify({ objects, annotations }, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setCopyStatus('已复制到剪贴板');
    } catch {
      setCopyStatus(payload);
    }
  };

  return (
    <aside className="absolute right-4 top-4 z-20 flex max-h-[calc(100vh-2rem)] w-[340px] flex-col overflow-hidden rounded-2xl border border-[#c8a96e]/25 bg-[#1a1209]/90 text-[#f5e0bc] shadow-2xl backdrop-blur-md">
      <div className="border-b border-[#c8a96e]/20 p-4">
        <div className="text-xs uppercase tracking-[0.35em] text-[#c8a96e]/75">Room Editor</div>
        <h1 className="mt-1 font-serif text-xl text-[#f5e0bc]">房间摆放编辑器</h1>
        <p className="mt-2 text-xs leading-relaxed text-[#f5e0bc]/60">
          过程页，不会出现在最终个人网站。点击物件后拖拽轴，或在这里输入数值精调。
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <section className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8a96e]/75">选择物件</div>
          <div className="grid grid-cols-1 gap-1.5">
            {objects.map((object) => (
              <button
                key={object.id}
                type="button"
                onClick={() => onSelect(object.id)}
                className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                  selectedId === object.id
                    ? 'border-[#c8a96e] bg-[#c8a96e]/18 text-[#f5e0bc]'
                    : 'border-[#c8a96e]/15 bg-[#2a1a08]/45 text-[#f5e0bc]/65 hover:border-[#c8a96e]/45 hover:text-[#f5e0bc]'
                }`}
              >
                {object.label}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8a96e]/75">变换模式</div>
          <div className="grid grid-cols-3 gap-2">
            {(['translate', 'rotate', 'scale'] as TransformMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onModeChange(item)}
                className={`rounded-lg border px-2 py-2 text-xs transition ${
                  mode === item
                    ? 'border-[#c8a96e] bg-[#c8a96e]/20 text-[#f5e0bc]'
                    : 'border-[#c8a96e]/15 bg-[#2a1a08]/45 text-[#f5e0bc]/55 hover:border-[#c8a96e]/45'
                }`}
              >
                {modeLabels[item]}
              </button>
            ))}
          </div>
        </section>

        {selectedObject ? (
          <section className="space-y-4 rounded-xl border border-[#c8a96e]/15 bg-[#2a1a08]/35 p-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#c8a96e]/75">当前选中</div>
              <div className="mt-1 text-sm font-semibold">{selectedObject.label}</div>
            </div>
            <NumberVecInput label="Position 位置" value={selectedObject.position} step={0.05} onChange={(value) => updateSelectedVec('position', value)} />
            <NumberVecInput label="Rotation 旋转（弧度）" value={selectedObject.rotation} step={0.05} onChange={(value) => updateSelectedVec('rotation', value)} />
            <NumberVecInput label="Scale 大小" value={selectedObject.scale} step={0.05} onChange={(value) => updateSelectedVec('scale', value)} />
          </section>
        ) : (
          <div className="rounded-xl border border-dashed border-[#c8a96e]/25 p-4 text-xs text-[#f5e0bc]/55">
            还没选中物件。点击场景中的家具，或从上方列表选择。
          </div>
        )}

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8a96e]/75">文字标注</div>
              <div className="mt-1 text-[11px] text-[#f5e0bc]/50">记录你想添加的东西或摆放想法</div>
            </div>
            <button
              type="button"
              onClick={isAddingAnnotation ? onCancelAddAnnotation : onStartAddAnnotation}
              className={`rounded-lg border px-3 py-2 text-xs transition ${
                isAddingAnnotation
                  ? 'border-red-300/50 bg-red-500/20 text-red-100'
                  : 'border-[#c8a96e]/40 bg-[#c8a96e]/15 text-[#f5e0bc] hover:bg-[#c8a96e]/25'
              }`}
            >
              {isAddingAnnotation ? '取消' : '+ 添加'}
            </button>
          </div>

          {annotations.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#c8a96e]/20 p-3 text-xs text-[#f5e0bc]/45">
              暂无标注。点击「添加」后，再点地板放置。
            </div>
          ) : (
            <div className="space-y-2">
              {annotations.map((annotation) => (
                <div key={annotation.id} className="space-y-2 rounded-lg border border-[#c8a96e]/15 bg-[#2a1a08]/35 p-3">
                  <textarea
                    value={annotation.text}
                    onChange={(event) => onUpdateAnnotation(annotation.id, { text: event.target.value })}
                    rows={2}
                    className="w-full resize-none rounded border border-[#c8a96e]/20 bg-[#1a1209]/80 px-2 py-2 text-xs text-[#f5e0bc] outline-none focus:border-[#c8a96e]"
                  />
                  <NumberVecInput
                    label="标注位置"
                    value={annotation.position}
                    step={0.05}
                    onChange={(position) => onUpdateAnnotation(annotation.id, { position })}
                  />
                  <button
                    type="button"
                    onClick={() => onDeleteAnnotation(annotation.id)}
                    className="text-[11px] text-red-200/75 hover:text-red-100"
                  >
                    删除这条标注
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="space-y-2 border-t border-[#c8a96e]/20 p-4">
        <button
          type="button"
          onClick={exportJson}
          className="w-full rounded-xl border border-[#c8a96e]/50 bg-[#c8a96e]/20 px-4 py-3 text-sm font-semibold text-[#f5e0bc] transition hover:bg-[#c8a96e]/30"
        >
          导出 JSON / Copy Layout
        </button>
        {copyStatus && (
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-[#2a1a08]/70 p-2 text-[10px] leading-relaxed text-[#f5e0bc]/60">
            {copyStatus}
          </pre>
        )}
      </div>
    </aside>
  );
}
