<script lang="ts" setup>
import PageFooter from '@/shared/components/PageFooter.vue';
import PageHeader from '@/shared/components/PageHeader.vue';
</script>

<template>
  <div class="page min-h-screen flex flex-col bg-bg text-text">
    <PageHeader />
    <main class="main flex-grow">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>
