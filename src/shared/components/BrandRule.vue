<script lang="ts" setup>
import { cn } from '@/shared/utils/twmerge';

export interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <!-- Filete do gradiente da marca (violeta → azul → ciano). Puramente decorativo. -->
  <span
    aria-hidden="true"
    :class="cn('block h-[3px] w-full brand-rule', props.class)"
  />
</template>
