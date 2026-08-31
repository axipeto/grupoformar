import type { RouteRecordRaw } from 'vue-router';

export const aboutRoutes: RouteRecordRaw[] = [
  {
    path: '/sobre',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'Sobre o grupo',
      description:
        'A história do Grupo Formar, os valores que sustentam cada entrega e o compromisso '
        + 'ambiental da operação gráfica.',
    },
  },
];
