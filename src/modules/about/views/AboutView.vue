<script lang="ts" setup>
import { esgPoints, timeline, values } from '@/domain/theme/content';
import { labels } from '@/domain/theme/labels';
import Hero from '@/shared/components/Hero.vue';
import Section from '@/shared/components/Section.vue';
import SectionHeading from '@/shared/components/SectionHeading.vue';
import ValueCard from '@/shared/components/ValueCard.vue';
import { useBrandAssets } from '@/shared/composables/useBrandAssets';

const { hero, sustentabilidade, logoFsc } = useBrandAssets();
</script>

<template>
  <div>
    <Hero :image="hero" eyebrow="Nossa história">
      <h1 class="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-5xl lg:text-[56px]">
        Tradição e inovação sob a mesma gestão.
      </h1>
      <p class="max-w-[60ch] text-lg text-white/80">
        {{ labels.BRAND.description }}
      </p>
    </Hero>

    <Section>
      <SectionHeading
        eyebrow="Evolução contínua"
        title="Uma trajetória construída etapa por etapa."
        description="Cada fase do grupo respondeu a uma necessidade concreta dos nossos clientes — e trouxe mais uma parte do processo para dentro de casa."
        class="mb-14"
      />

      <!--
        Timeline: a numeração é o próprio ano, então a ordem carrega informação real.
        O filete da marca à esquerda amarra os marcos visualmente.
      -->
      <ol class="relative flex flex-col gap-10 border-l-2 border-border pl-8 md:pl-11">
        <li v-for="item in timeline" :key="item.year" class="relative">
          <span
            aria-hidden="true"
            class="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full bg-blue ring-4 ring-bg md:-left-[53px]"
          />
          <div class="flex flex-col gap-2">
            <span class="font-display text-sm font-bold uppercase tracking-[0.16em] text-blue">
              {{ item.year }}
            </span>
            <h3 class="text-xl font-bold text-text md:text-2xl">
              {{ item.title }}
            </h3>
            <p class="max-w-[60ch] text-text-muted">
              {{ item.description }}
            </p>
          </div>
        </li>
      </ol>
    </Section>

    <Section id="valores" tone="alt">
      <SectionHeading
        eyebrow="Nossos valores"
        title="O que sustenta cada entrega."
        description="Excelência não é meta isolada — é consequência de princípios aplicados todos os dias, em todas as operações do grupo."
        class="mb-14"
      />
      <div class="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        <ValueCard
          v-for="value in values"
          :key="value.index"
          :index="value.index"
          :title="value.title"
          :description="value.description"
        />
      </div>
    </Section>

    <section
      id="sustentabilidade"
      class="relative isolate overflow-hidden bg-navy py-16 text-white md:py-24 lg:py-28"
    >
      <div
        class="absolute inset-0 -z-20 bg-cover bg-center"
        :style="{ backgroundImage: `url(${sustentabilidade})` }"
      />
      <div
        class="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(8,22,38,0.94)_0%,rgba(8,22,38,0.78)_55%,rgba(8,22,38,0.45)_100%)]"
      />

      <div class="container-max grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div class="flex flex-col gap-5">
          <SectionHeading
            eyebrow="Compromisso ambiental"
            title="Cada página impressa é uma decisão sobre o futuro."
            description="Nossas práticas ambientais atravessam toda a cadeia: origem do papel, consumo de energia da planta e destino dos resíduos de produção."
            tone="onDeep"
          />
          <ul class="mt-2 flex flex-col">
            <li
              v-for="point in esgPoints"
              :key="point.title"
              class="flex flex-col gap-1 border-t border-white/15 py-4"
            >
              <strong class="font-display text-[15px] font-semibold text-white">
                {{ point.title }}
              </strong>
              <span class="text-[15px] text-white/70">{{ point.description }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-center gap-3.5 rounded-xl border border-white/20 bg-white/5 p-8 text-center">
          <img
            :src="logoFsc"
            alt="Selo FSC — Forests For All Forever"
            class="w-[150px]"
            loading="lazy"
          >
          <p class="text-[13px] text-white/70">
            Madeira e papel de florestas certificadas e fontes controladas.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
