import type { RouteLocationNormalized } from 'vue-router';
import type { RouteMiddleware } from '../types';
import { labels } from '@/domain/theme/labels';

const SEPARATOR = ' | ';

export const documentTitle: RouteMiddleware = async (to: RouteLocationNormalized): Promise<boolean> => {
  const pageTitle = String(to.meta.title || labels.DOCUMENT_TITLE.default);
  document.title = `${pageTitle}${SEPARATOR}${labels.DOCUMENT_TITLE.base}`;
  return true;
};
