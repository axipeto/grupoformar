<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { esgPoints, units, values } from '@/domain/theme/content';
import { labels } from '@/domain/theme/labels';
import ArrowLink from '@/shared/components/ArrowLink.vue';
import Button from '@/shared/components/Button.vue';
import Eyebrow from '@/shared/components/Eyebrow.vue';
import Hero from '@/shared/components/Hero.vue';
import Section from '@/shared/components/Section.vue';
import SectionHeading from '@/shared/components/SectionHeading.vue';
import UnitCard from '@/shared/components/UnitCard.vue';
import ValueCard from '@/shared/components/ValueCard.vue';
import { useBrandAssets } from '@/shared/composables/useBrandAssets';
import HomeStats from '../components/HomeStats.vue';

const router = useRouter();
const { hero, sustentabilidade, logoFsc, unitAssets } = useBrandAssets();
</script>

<template>
  <div>
    <Hero :image="hero" eyebrow="Tradição & Inovação" size="full">
      <h1 class="text-4xl font-extrabold leading-[1.03] tracking-[-0.03em] text-white md:text-6xl lg:text-[70px]">
        25 anos formando<br>
        conhecimento em
        <span class="bg-gradient-to-r from-[#7fd8ff] to-cyan bg-clip-text text-transparent">
          papel,<br>tinta e tecnologia.
        </span>
      </h1>
      <p class="max-w-[60ch] text-lg text-white/80 md:text-xl">
        {{ labels.BRAND.description }}
      </p>
      <div class="mt-2 flex flex-wrap gap-3.5">
        <Button variant="secondary" @click="router.push('/unidades')">
          Conheça as unidades
        </Button>
        <Button variant="ghost-light" @click="router.push('/contato')">
          Solicitar orçamento
        </Button>
      </div>
    </Hero>

    <HomeStats />

    <Section id="unidades">
      <SectionHeading
        eyebrow="Unidades de negócio"
        title="Três empresas, um único fluxo de trabalho."
        description="Editar, imprimir e distribuir sob a mesma gestão elimina intermediários, encurta prazos e mantém o padrão de qualidade do original ao ponto de venda."
        class="mb-14"
      />

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
            <ArrowLink to="/unidades">
              Ver a unidade
            </ArrowLink>
          </template>
        </UnitCard>
      </div>
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

    <!-- Sustentabilidade: resumo; a versão completa vive em /sobre#sustentabilidade -->
    <section id="sustentabilidade" class="relative isolate overflow-hidden bg-navy py-16 text-white md:py-24 lg:py-28">
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

    <Section tone="alt">
      <div class="overflow-hidden rounded-xl border border-border bg-surface shadow-03">
        <span aria-hidden="true" class="block h-[3px] w-full brand-rule" />
        <div class="grid items-center gap-9 p-9 md:p-12 lg:grid-cols-[1.3fr_0.7fr] lg:p-16">
          <div class="flex flex-col gap-3">
            <Eyebrow>Vamos conversar</Eyebrow>
            <h2 class="text-2xl font-bold text-text md:text-3xl lg:text-[38px] lg:leading-[1.1]">
              Conte seu projeto — nós cuidamos do resto.
            </h2>
            <p class="max-w-[52ch] text-text-muted">
              Da avaliação do original à entrega dos exemplares, nossa equipe monta a solução
              editorial, gráfica e logística sob medida para o seu projeto.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <Button variant="primary" class="w-full" @click="router.push('/contato')">
              Falar com a equipe
            </Button>
            <Button variant="neutral" class="w-full" @click="router.push('/unidades')">
              Ver as unidades
            </Button>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
