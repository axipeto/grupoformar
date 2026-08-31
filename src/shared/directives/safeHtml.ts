import type { Directive, DirectiveBinding } from 'vue';
import { sanitizeHtml } from '@/shared/services/sanitizeHtml';

export const safeHtml: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.innerHTML = sanitizeHtml(typeof binding.value === 'string' ? binding.value : '');
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.innerHTML = sanitizeHtml(typeof binding.value === 'string' ? binding.value : '');
  },
};
