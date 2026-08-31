<script lang="ts" setup>
import logoGrupoFormar from '@theme/imgs/logo-grupo-formar.png';
import { ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { labels } from '@/domain/theme/labels';
import BrandRule from '@/shared/components/BrandRule.vue';
import Button from '@/shared/components/Button.vue';
import ThemeToggle from '@/shared/components/ThemeToggle.vue';

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/unidades', label: 'Unidades' },
  { to: '/sobre', label: 'Sobre' },
];

const router = useRouter();
const route = useRoute();
const mobileOpen = ref(false);

function goToContact() {
  mobileOpen.value = false;
  router.push('/contato');
}

watch(() => route.fullPath, () => {
  mobileOpen.value = false;
});
</script>

<template>
  <header class="sticky top-0 z-sticky border-b border-border bg-surface/90 backdrop-blur-md">
    <BrandRule />

    <div class="container-max flex h-20 items-center justify-between gap-6">
      <RouterLink to="/" class="flex items-center" :aria-label="`${labels.BRAND.name} — início`">
        <img
          :src="logoGrupoFormar"
          :alt="labels.BRAND.name"
          class="logo-adaptive h-[38px] w-auto md:h-[43px]"
          width="1001"
          height="402"
        >
      </RouterLink>

      <nav aria-label="Principal" class="hidden items-center gap-8 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="font-display text-sm font-medium text-text-muted transition-colors hover:text-text"
          active-class="text-blue"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="primary" class="hidden md:inline-flex" @click="goToContact">
          Fale conosco
        </Button>
        <Button
          variant="neutral"
          size="icon"
          class="md:hidden"
          aria-label="Abrir menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :icon="mobileOpen ? 'material-symbols:close' : 'material-symbols:menu'" class="text-xl" />
        </Button>
      </div>
    </div>

    <nav v-if="mobileOpen" aria-label="Principal (mobile)" class="border-t border-border bg-surface md:hidden">
      <div class="container-max flex flex-col gap-1 py-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-2 py-3 font-display text-sm font-medium text-text hover:text-blue"
          active-class="text-blue"
        >
          {{ item.label }}
        </RouterLink>
        <Button variant="primary" class="mt-2 w-full" @click="goToContact">
          Fale conosco
        </Button>
      </div>
    </nav>
  </header>
</template>
