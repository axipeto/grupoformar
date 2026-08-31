<script lang="ts" setup>
import type { LayoutName } from '@/shared/layouts';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useOrganizationSchema } from '@/shared/composables/useOrganizationSchema';
import { useSeo } from '@/shared/composables/useSeo';
import { layouts } from '@/shared/layouts';

const route = useRoute();
const layout = computed(() => (route.meta.layout as LayoutName) || 'default');
const LayoutComponent = computed(() => layouts[layout.value]);

useSeo();
useOrganizationSchema();
</script>

<template>
  <component :is="LayoutComponent">
    <RouterView />
  </component>
</template>
