'use client';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

interface Props {
  reduced?: boolean;
}

export function PostFX({ reduced }: Props) {
  if (reduced) {
    return (
      <EffectComposer>
        <Vignette offset={0.25} darkness={0.55} />
      </EffectComposer>
    );
  }
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.75} intensity={0.4} luminanceSmoothing={0.9} />
      <Vignette offset={0.25} darkness={0.65} />
    </EffectComposer>
  );
}
