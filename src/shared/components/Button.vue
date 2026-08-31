<script lang="ts" setup>
import { computed } from 'vue';
import { cn } from '@/shared/utils/twmerge';

export interface Props {
  variant?: 'primary' | 'secondary' | 'neutral' | 'ghost-light' | 'danger' | 'tertiary';
  disabled?: boolean;
  class?: string;
  size?: 'icon';
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'primary',
  type: 'button',
});

const classes = computed(() =>
  cn(
    'cursor-pointer px-6 py-3 rounded-md flex items-center gap-2 justify-center min-w-[120px] min-h-12 font-display font-semibold text-sm transition-all disabled:cursor-not-allowed',
    props.size === 'icon' ? 'p-2 min-h-12 min-w-12' : '',
    {
      'bg-blue text-white hover:bg-cyan active:bg-cyan-dark disabled:bg-gray-200 disabled:text-gray-400': props.variant === 'primary',
      'bg-white text-navy hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400': props.variant === 'secondary',
      'bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white': props.variant === 'ghost-light',
      'bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:text-gray-400': props.variant === 'neutral',
      'bg-red text-white hover:bg-red/90 disabled:bg-red-light disabled:text-gray-400': props.variant === 'danger',
      'text-blue hover:text-cyan hover:underline p-0 min-h-auto min-w-0 disabled:text-gray-400': props.variant === 'tertiary',
    },
    props.class,
  ),
);
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
