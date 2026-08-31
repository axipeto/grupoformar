<script lang="ts" setup>
export interface Props {
  value: string;
  label: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-1 bg-bg p-7 md:p-8">
    <b class="font-display text-3xl font-extrabold tracking-tight tabular-nums text-text md:text-4xl lg:text-[40px]">
      {{ props.value }}
    </b>
    <span class="text-sm leading-snug text-text-muted">{{ props.label }}</span>
  </div>
</template>
