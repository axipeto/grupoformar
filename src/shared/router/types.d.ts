import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import type { LayoutName } from '@/shared/layouts';
import 'vue-router';

type Awaitable<T> = T | Promise<T>;

export type RouteMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => Awaitable<boolean | string | RouteLocationRaw>;

declare module 'vue-router' {
  interface RouteMeta {
    layout?: LayoutName;
    middlewares?: RouteMiddleware[];
    title?: string;
    description?: string;
    image?: string;
  }
}
