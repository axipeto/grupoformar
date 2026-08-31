<script lang="ts" setup>
import { cn } from '@/shared/utils/twmerge';

export interface Props {
  /** `onDeep` para uso sobre fundo escuro. */
  tone?: 'default' | 'onDeep';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { tone: 'default' });
</script>

<template>
  <!-- A entressilaba larga do "G R U P O" no logotipo vira o sistema de rótulos. -->
  <p
    :class="cn(
      'font-display text-[11px] font-bold uppercase tracking-[0.22em]',
      props.tone === 'onDeep' ? 'text-cyan' : 'text-blue',
      props.class,
    )"
  >
    <slot />
  </p>
</template>
