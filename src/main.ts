import { createApp } from 'vue';
import App from '@/App.vue';
import { initPlugins } from '@/shared/plugins';
import { initServices } from '@/shared/services';
import { initUtils } from '@/shared/utils';

const app = createApp(App);

initUtils(); // tema (cores da marca, dark/light, theme-color), imports de CSS
initServices(app); // pinia, router, unhead, directives, componentes globais, clarity
initPlugins(); // integrações externas de UI

app.mount('#app');
