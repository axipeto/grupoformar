import { createRouter, createWebHistory } from 'vue-router';
import { aboutRoutes } from '@/modules/about/routes';
import { contactRoutes } from '@/modules/contact/routes';
import { homeRoutes } from '@/modules/home/routes';
import { unitsRoutes } from '@/modules/units/routes';
import { defaultMiddlewares } from './middlewares/default';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...aboutRoutes,
    ...unitsRoutes,
    ...contactRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth' };
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach(async (to, from) => {
  const routeMiddlewares = to.matched.flatMap(r => r.meta.middlewares || []).filter(Boolean);
  const middlewares = [...defaultMiddlewares, ...routeMiddlewares];
  for (const middleware of middlewares) {
    const result = await middleware(to, from);
    if (result !== true) {
      return result;
    }
  }
  return true;
});

export default router;
