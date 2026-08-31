import type { RouteRecordRaw } from 'vue-router';

export const unitsRoutes: RouteRecordRaw[] = [
  {
    path: '/unidades',
    name: 'Units',
    component: () => import('../views/UnitsView.vue'),
    meta: {
      title: 'Unidades de negócio',
      description:
        'Editora Formar, Mar Produções Gráficas e Carvalho Distribuições: três empresas e um '
        + 'único fluxo de trabalho, do original ao ponto de venda.',
    },
  },
];
