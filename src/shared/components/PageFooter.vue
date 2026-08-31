<script lang="ts" setup>
import logoCarvalho from '@theme/imgs/logo-carvalho.png';
import logoEditora from '@theme/imgs/logo-editora.png';
import logoGrupoFormar from '@theme/imgs/logo-grupo-formar.png';
import logoMar from '@theme/imgs/logo-mar.png';
import { RouterLink } from 'vue-router';
import { config } from '@/domain/theme/config';
import { labels } from '@/domain/theme/labels';

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/unidades', label: 'Unidades' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

const institucional = [
  { to: '/sobre#valores', label: 'Valores' },
  { to: '/unidades#parque', label: 'Parque gráfico' },
  { to: '/sobre#sustentabilidade', label: 'Sustentabilidade' },
];

/**
 * Marcas do grupo — cada uma leva ao site da respectiva empresa.
 * Alturas diferentes por marca para equilibrar o peso óptico: o logotipo da
 * Carvalho é empilhado (símbolo acima do nome), então precisa de mais altura.
 */
const brands = [
  { name: labels.UNITS.editora, src: logoEditora, href: config.brands.editora, class: 'h-8 md:h-9' },
  { name: labels.UNITS.mar, src: logoMar, href: config.brands.mar, class: 'h-7 md:h-8' },
  { name: labels.UNITS.carvalho, src: logoCarvalho, href: config.brands.carvalho, class: 'h-11 md:h-12' },
];

const year = new Date().getFullYear();
</script>

<template>
  <footer class="section-dark">
    <div class="container-max flex flex-col py-16">
      <div class="grid gap-10 pb-11 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div class="flex flex-col gap-4">
          <img
            :src="logoGrupoFormar"
            :alt="labels.BRAND.name"
            class="logo-invert h-10 w-auto self-start"
            width="1001"
            height="402"
          >
          <p class="max-w-[34ch] text-sm text-white/70">
            {{ labels.BRAND.tagline }}
          </p>
        </div>

        <nav aria-label="Rodapé — navegação">
          <h4 class="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
            Navegação
          </h4>
          <ul class="flex flex-col gap-3 text-sm text-white/70">
            <li v-for="item in navItems" :key="item.to">
              <RouterLink :to="item.to" class="transition-colors hover:text-white">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Rodapé — institucional">
          <h4 class="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
            Institucional
          </h4>
          <ul class="flex flex-col gap-3 text-sm text-white/70">
            <li v-for="item in institucional" :key="item.to">
              <RouterLink :to="item.to" class="transition-colors hover:text-white">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div>
          <h4 class="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
            Contato
          </h4>
          <ul class="flex flex-col gap-3 text-sm text-white/70">
            <li>
              <a :href="`mailto:${config.contact.email}`" class="transition-colors hover:text-white">
                {{ config.contact.email }}
              </a>
            </li>
            <li>
              <a
                :href="`tel:${config.contact.phone.replace(/\D/g, '')}`"
                class="transition-colors hover:text-white"
              >
                {{ config.contact.phone }}
              </a>
            </li>
            <li>
              <a
                :href="config.contact.whatsappLink"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Icon icon="mdi:whatsapp" class="text-base" />
                {{ config.contact.whatsapp }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/15 py-8">
        <h4 class="mb-5 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/60">
          Marcas do grupo
        </h4>
        <ul class="flex flex-wrap items-center gap-8 md:gap-11">
          <li v-for="brand in brands" :key="brand.name">
            <a
              :href="brand.href"
              target="_blank"
              rel="noopener"
              class="inline-flex opacity-80 transition-all hover:-translate-y-0.5 hover:opacity-100"
            >
              <img :src="brand.src" :alt="brand.name" :class="['logo-invert w-auto', brand.class]">
            </a>
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap justify-between gap-3 border-t border-white/15 pt-7 text-sm text-white/55">
        <p>© {{ year }} {{ labels.BRAND.name }}. Todos os direitos reservados.</p>
        <p>Política de privacidade · Termos de uso · Compliance</p>
      </div>
    </div>
  </footer>
</template>
