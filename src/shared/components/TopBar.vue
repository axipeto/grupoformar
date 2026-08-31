<script lang="ts" setup>
import { config } from '@/domain/theme/config';
import { labels } from '@/domain/theme/labels';

/**
 * Barra de serviço acima do cabeçalho: atalhos para os sites das outras marcas
 * do grupo. Não é sticky — rola junto com a página e some, deixando só o
 * cabeçalho fixo no topo.
 */
const links = [
  { label: labels.UNITS.mar, href: config.brands.mar },
  { label: labels.UNITS.editora, href: config.brands.editora },
];
</script>

<template>
  <div class="bg-navy-soft text-white">
    <nav
      aria-label="Outras marcas do grupo"
      class="container-max flex h-9 items-center justify-center"
    >
      <ul class="flex items-center">
        <li
          v-for="(link, i) in links"
          :key="link.href"
          class="flex items-center"
        >
          <!-- separador entre os itens, não antes do primeiro -->
          <span v-if="i > 0" aria-hidden="true" class="px-3 text-white/35">·</span>
          <a
            :href="link.href"
            target="_blank"
            rel="noopener"
            class="text-[13px] text-white/75 transition-colors hover:text-white"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
