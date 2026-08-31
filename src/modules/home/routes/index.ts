import type { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Início',
      description:
        'O Grupo Formar reúne Editora Formar, Mar Produções Gráficas e Carvalho Distribuições: '
        + 'editar, imprimir e distribuir sob a mesma gestão.',
    },
  },
];
