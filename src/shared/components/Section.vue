<script lang="ts" setup>
import { cn } from '@/shared/utils/twmerge';

export interface Props {
  /** `alt` = fundo sutil; `dark` = seção escura institucional. */
  tone?: 'default' | 'alt' | 'dark';
  id?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { tone: 'default' });
</script>

<template>
  <section
    :id="props.id"
    :class="cn(
      'py-16 md:py-24 lg:py-28',
      { 'bg-bg': props.tone === 'default', 'bg-surface-alt': props.tone === 'alt', 'section-dark': props.tone === 'dark' },
      props.class,
    )"
  >
    <div class="container-max">
      <slot />
    </div>
  </section>
</template>
