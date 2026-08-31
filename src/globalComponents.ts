import type { App } from 'vue';
import { Icon } from '@iconify/vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Icon: typeof Icon;
  }
}

export function registerGlobalComponents(app: App) {
  const components = { Icon };
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
