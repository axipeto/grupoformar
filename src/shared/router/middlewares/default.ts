import type { RouteMiddleware } from '../types';
import { documentTitle } from './documentTitle';

export const defaultMiddlewares: RouteMiddleware[] = [
  documentTitle,
];
