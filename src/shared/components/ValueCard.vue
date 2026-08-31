<script lang="ts" setup>
export interface Props {
  index: string;
  title: string;
  description: string;
}

const props = defineProps<Props>();
</script>

<template>
  <article class="flex flex-col gap-2.5 bg-surface p-8 transition-colors hover:bg-surface-alt">
    <span class="font-display text-xs font-bold tracking-[0.16em] text-blue">
      {{ props.index }}
    </span>
    <h3 class="text-xl font-bold text-text">
      {{ props.title }}
    </h3>
    <p class="text-[15px] text-text-muted">
      {{ props.description }}
    </p>
  </article>
</template>
