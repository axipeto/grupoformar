<script lang="ts" setup>
export interface Props {
  id: string;
  label: string;
  error?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="props.id" class="font-display text-sm font-semibold text-text">
      {{ props.label }}
    </label>
    <slot :invalid="Boolean(props.error)" />
    <p v-if="props.error" :id="`${props.id}-error`" class="text-sm text-red">
      {{ props.error }}
    </p>
  </div>
</template>
