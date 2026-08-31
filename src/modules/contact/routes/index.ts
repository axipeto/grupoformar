import type { RouteRecordRaw } from 'vue-router';

export const contactRoutes: RouteRecordRaw[] = [
  {
    path: '/contato',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contato',
      description:
        'Fale com a equipe do Grupo Formar sobre seu projeto editorial, gráfico ou logístico.',
    },
  },
];
