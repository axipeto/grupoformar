<script lang="ts" setup>
import PageFooter from '@/shared/components/PageFooter.vue';
import PageHeader from '@/shared/components/PageHeader.vue';
import TopBar from '@/shared/components/TopBar.vue';
</script>

<template>
  <div class="page min-h-screen flex flex-col bg-bg text-text">
    <TopBar />
    <PageHeader />
    <main class="main flex-grow">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>
