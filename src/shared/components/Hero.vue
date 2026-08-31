<script lang="ts" setup>
import Eyebrow from '@/shared/components/Eyebrow.vue';

export interface Props {
  eyebrow: string;
  image: string;
  /** `full` para a home; `compact` para páginas internas. */
  size?: 'full' | 'compact';
}

const props = withDefaults(defineProps<Props>(), { size: 'compact' });
</script>

<template>
  <section class="relative isolate overflow-hidden bg-navy text-white">
    <div
      class="absolute inset-0 -z-20 bg-cover bg-center"
      :style="{ backgroundImage: `url(${props.image})` }"
    />
    <!--
      Scrim diagonal: mantém o texto legível sobre a foto e deixa o ciano da marca
      aparecer só na borda direita, em vez de lavar a imagem inteira de azul.
    -->
    <div
      class="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(14,28,46,0.95)_0%,rgba(14,28,46,0.72)_48%,rgba(0,158,226,0.28)_100%)]"
    />

    <div
      class="container-max flex max-w-[780px] flex-col items-start gap-6"
      :class="props.size === 'full' ? 'py-24 md:py-32 lg:py-36' : 'py-20 md:py-24'"
    >
      <Eyebrow tone="onDeep">
        {{ props.eyebrow }}
      </Eyebrow>
      <slot />
    </div>
  </section>
</template>
