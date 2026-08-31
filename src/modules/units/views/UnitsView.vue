<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { parkSpecs, units } from '@/domain/theme/content';
import Button from '@/shared/components/Button.vue';
import Hero from '@/shared/components/Hero.vue';
import Section from '@/shared/components/Section.vue';
import SectionHeading from '@/shared/components/SectionHeading.vue';
import UnitCard from '@/shared/components/UnitCard.vue';
import { useBrandAssets } from '@/shared/composables/useBrandAssets';

const router = useRouter();
const { hero, maquinario, unitAssets } = useBrandAssets();
</script>

<template>
  <div>
    <Hero :image="hero" eyebrow="Unidades de negócio">
      <h1 class="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-5xl lg:text-[56px]">
        Três empresas, um único fluxo de trabalho.
      </h1>
      <p class="max-w-[60ch] text-lg text-white/80">
        Editar, imprimir e distribuir sob a mesma gestão elimina intermediários, encurta prazos
        e mantém o padrão de qualidade do original ao ponto de venda.
      </p>
    </Hero>

    <Section>
      <div class="flex flex-col gap-7">
        <UnitCard
          v-for="(unit, i) in units"
          :key="unit.key"
          :name="unit.name"
          :logo="unitAssets(unit.key).logo"
          :logo-class="unitAssets(unit.key).logoClass"
          :description="unit.description"
          :tags="unit.tags"
          :image="unitAssets(unit.key).image"
          :image-alt="unit.imageAlt"
          :flip="i % 2 === 1"
        >
          <template #action>
            <Button variant="tertiary" @click="router.push('/contato')">
              Falar sobre este serviço
            </Button>
          </template>
        </UnitCard>
      </div>
    </Section>

    <Section id="parque" tone="dark">
      <div class="grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
        <div class="flex flex-col items-start gap-5">
          <SectionHeading
            eyebrow="Parque gráfico"
            title="Capacidade instalada para tirar o projeto do papel."
            description="Investimos continuamente em maquinário para manter a produção dentro de casa. Isso significa controle de qualidade em cada folha e prazos que não dependem de terceiros."
            tone="onDeep"
          />
          <ul class="mt-1.5 flex w-full flex-col">
            <li
              v-for="spec in parkSpecs"
              :key="spec.label"
              class="flex items-baseline justify-between gap-5 border-b border-white/15 py-3.5 text-[15px] text-white/70"
            >
              <span>{{ spec.label }}</span>
              <b class="text-right font-display font-semibold tabular-nums text-white">
                {{ spec.value }}
              </b>
            </li>
          </ul>
          <Button variant="secondary" class="mt-3" @click="router.push('/contato')">
            Solicitar orçamento
          </Button>
        </div>

        <figure class="m-0 aspect-[4/3] overflow-hidden rounded-xl border border-white/15">
          <img
            :src="maquinario"
            alt="Conjunto de impressoras offset instaladas no parque gráfico"
            class="h-full w-full object-cover"
            loading="lazy"
          >
        </figure>
      </div>
    </Section>
  </div>
</template>
