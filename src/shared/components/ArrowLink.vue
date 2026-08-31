<script lang="ts" setup>
import { RouterLink } from 'vue-router';

export interface Props {
  to: string;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="props.to"
    class="group inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-blue transition-colors hover:text-cyan"
  >
    <slot />
    <Icon
      icon="material-symbols:arrow-forward-rounded"
      class="text-base transition-transform group-hover:translate-x-1"
    />
  </RouterLink>
</template>
