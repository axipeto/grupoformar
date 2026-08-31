<script lang="ts" setup>
export interface Props {
  name: string;
  logo: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** `true` inverte a ordem (imagem à esquerda) no desktop. */
  flip?: boolean;
  /** Logotipos empilhados (Carvalho) precisam de mais altura. */
  logoClass?: string;
}

const props = withDefaults(defineProps<Props>(), { flip: false, logoClass: 'h-11' });
</script>

<template>
  <article
    class="grid overflow-hidden rounded-xl border border-border bg-surface shadow-03 lg:grid-cols-[1.15fr_0.85fr]"
  >
    <div
      class="flex flex-col items-start justify-center gap-5 p-8 md:p-10 lg:p-13"
      :class="props.flip ? 'lg:order-2' : ''"
    >
      <img
        :src="props.logo"
        :alt="props.name"
        :class="['logo-adaptive w-auto', props.logoClass]"
        loading="lazy"
      >
      <p class="max-w-[54ch] text-text-muted">
        {{ props.description }}
      </p>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="tag in props.tags"
          :key="tag"
          class="rounded-full border border-border-strong px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted"
        >
          {{ tag }}
        </li>
      </ul>
      <slot name="action" />
    </div>

    <div
      class="relative order-first min-h-[220px] bg-surface-alt lg:min-h-[300px]"
      :class="props.flip ? 'lg:order-1' : 'lg:order-none'"
    >
      <img
        :src="props.image"
        :alt="props.imageAlt"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      >
    </div>
  </article>
</template>
