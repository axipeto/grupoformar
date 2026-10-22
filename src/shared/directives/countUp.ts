import type { Directive } from 'vue';

/**
 * `v-count-up` — conta de zero até o número do texto quando o elemento entra na viewport.
 *
 * Uso: `<b v-count-up>+2.000</b>`. Prefixo e sufixo ("+", "anos") ficam parados; só o
 * número anima. Texto sem número ("FSC") fica como está.
 *
 * O texto final é o que vai no HTML: crawlers, leitores de tela e quem não tem
 * IntersectionObserver ou pede movimento reduzido veem o valor real, sem animação.
 * A contagem só começa quando o elemento aparece, e termina restaurando o texto original.
 */

const DURATION = 1400;
// "2.000" (milhar com ponto, como em pt-BR) ou um inteiro simples
const NUMBER_PATTERN = /\d{1,3}(?:\.\d{3})+|\d+/;

export interface CountUpParts {
  prefix: string;
  target: number;
  suffix: string;
  /** o original usa separador de milhar, então a contagem também usa */
  grouped: boolean;
}

export function parseCountUp(text: string): CountUpParts | null {
  const match = NUMBER_PATTERN.exec(text);
  if (!match)
    return null;
  const raw = match[0];
  return {
    prefix: text.slice(0, match.index),
    target: Number(raw.replace(/\./g, '')),
    suffix: text.slice(match.index + raw.length),
    grouped: raw.includes('.'),
  };
}

export function formatCountUp(parts: CountUpParts, value: number): string {
  const number = parts.grouped ? value.toLocaleString('pt-BR') : String(value);
  return `${parts.prefix}${number}${parts.suffix}`;
}

const frames = new WeakMap<Element, number>();
let observer: IntersectionObserver | null = null;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function run(el: HTMLElement) {
  const original = el.textContent ?? '';
  const parts = parseCountUp(original);
  if (!parts)
    return;

  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / DURATION, 1);
    if (progress >= 1) {
      el.textContent = original;
      frames.delete(el);
      return;
    }
    el.textContent = formatCountUp(parts, Math.round(parts.target * easeOutCubic(progress)));
    frames.set(el, requestAnimationFrame(step));
  };
  el.textContent = formatCountUp(parts, 0);
  frames.set(el, requestAnimationFrame(step));
}

function getObserver(): IntersectionObserver | null {
  if (observer)
    return observer;
  if (typeof IntersectionObserver === 'undefined')
    return null;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting)
          continue;
        run(entry.target as HTMLElement);
        observer?.unobserve(entry.target);
      }
    },
    // mesma margem do `v-reveal`: a contagem começa junto com a revelação do card
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  );
  return observer;
}

export const vCountUp: Directive<HTMLElement> = {
  mounted(el: HTMLElement) {
    if (prefersReducedMotion() || typeof requestAnimationFrame === 'undefined')
      return;
    getObserver()?.observe(el);
  },

  unmounted(el: HTMLElement) {
    observer?.unobserve(el);
    const frame = frames.get(el);
    if (frame !== undefined)
      cancelAnimationFrame(frame);
    frames.delete(el);
  },
};
