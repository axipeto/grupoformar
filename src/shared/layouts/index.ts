import { defineAsyncComponent } from 'vue';

export const layouts = {
  default: defineAsyncComponent(() => import('./DefaultLayout.vue')),
  empty: defineAsyncComponent(() => import('./EmptyLayout.vue')),
};

export type LayoutName = keyof typeof layouts;
