<script lang="ts" setup>
import { stats } from '@/domain/theme/content';
import StatCard from '@/shared/components/StatCard.vue';
</script>

<template>
  <section class="border-b border-border bg-bg" aria-label="O grupo em números">
    <div class="container-max">
      <!-- gap-px sobre o fundo da borda desenha as divisórias sem 1px duplicado -->
      <div class="grid grid-cols-2 gap-px border-x border-border bg-border lg:grid-cols-4">
        <StatCard
          v-for="stat in stats"
          :key="stat.label"
          :value="stat.value"
          :label="stat.label"
        />
      </div>
    </div>
  </section>
</template>
