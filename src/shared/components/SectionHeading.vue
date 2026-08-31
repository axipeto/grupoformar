<script lang="ts" setup>
import Eyebrow from '@/shared/components/Eyebrow.vue';

export interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: 'default' | 'onDeep';
}

const props = withDefaults(defineProps<Props>(), { tone: 'default' });
</script>

<template>
  <div class="flex max-w-[660px] flex-col gap-4">
    <Eyebrow v-if="props.eyebrow" :tone="props.tone">
      {{ props.eyebrow }}
    </Eyebrow>
    <h2
      class="text-3xl font-bold md:text-4xl lg:text-[44px] lg:leading-[1.1]"
      :class="props.tone === 'onDeep' ? 'text-white' : 'text-text'"
    >
      {{ props.title }}
    </h2>
    <p
      v-if="props.description"
      class="text-lg"
      :class="props.tone === 'onDeep' ? 'text-white/75' : 'text-text-muted'"
    >
      {{ props.description }}
    </p>
  </div>
</template>
