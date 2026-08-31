<script lang="ts" setup>
import { computed } from 'vue';
import Button from '@/shared/components/Button.vue';
import { useColorMode } from '@/shared/composables/useColorMode';

const { mode, toggle } = useColorMode();

const isDark = computed(() => {
  if (mode.value === 'system')
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  return mode.value === 'dark';
});

const icon = computed(() => (isDark.value ? 'material-symbols:light-mode-outline' : 'material-symbols:dark-mode-outline'));
const label = computed(() => (isDark.value ? 'Ativar tema claro' : 'Ativar tema escuro'));
</script>

<template>
  <Button
    variant="neutral"
    size="icon"
    :aria-label="label"
    :aria-pressed="isDark"
    @click="toggle"
  >
    <Icon :icon="icon" class="text-xl" />
  </Button>
</template>
