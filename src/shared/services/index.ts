import type { App } from 'vue';
import { createHead } from '@unhead/vue/client'; // @unhead/vue v2: createHead vem do subpath /client
import { createPinia } from 'pinia';
import { registerGlobalComponents } from '@/globalComponents';
import { safeHtml } from '@/shared/directives/safeHtml';
import router from '@/shared/router';
import { initClarity } from '@/shared/services/clarity';

export function initServices(app: App) {
  app.use(createPinia());
  app.use(router);
  app.use(createHead());
  app.directive('safe-html', safeHtml);
  registerGlobalComponents(app);
  initClarity();
}
