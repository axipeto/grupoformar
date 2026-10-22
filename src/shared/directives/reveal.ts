import type { Directive, DirectiveBinding } from 'vue';

/**
 * `v-reveal` — revela o elemento quando ele entra na viewport.
 *
 * Uso:
 *   v-reveal               → sobe 24px e aparece
 *   v-reveal.fade          → só aparece, sem deslocamento
 *   v-reveal.left/.right   → desliza na horizontal
 *   v-reveal.zoom          → cresce de 96% para 100% e aparece (cards e blocos de destaque)
 *   v-reveal="120"         → mesma coisa, com 120ms de atraso (para escalonar listas)
 *
 * Uma imagem com a classe `.reveal-media` dentro do elemento revelado "assenta":
 * entra levemente ampliada e volta ao tamanho real junto com a revelação.
 *
 * Um único IntersectionObserver atende a página inteira — um observer por
 * elemento seria desperdício numa home com dezenas de blocos. Cada elemento é
 * desobservado assim que revela: a animação acontece uma vez, não a cada
 * passagem de scroll.
 */

const VARIANTS = ['fade', 'left', 'right', 'zoom', 'up'] as const;
type Variant = typeof VARIANTS[number];

let observer: IntersectionObserver | null = null;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function reveal(el: HTMLElement) {
  const delay = Number(el.dataset.revealDelay || 0);
  // Vira `animation-delay` no CSS, não `transition-delay`: o atraso vale só para a
  // entrada, sem atrasar o hover. Custom property porque uma `.reveal-media`
  // dentro do elemento também precisa dele (ver `.reveal` em style.css).
  if (delay > 0) {
    el.style.setProperty('--reveal-delay', `${delay}ms`);
  }
  el.classList.add('is-in');
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
        reveal(entry.target as HTMLElement);
        observer?.unobserve(entry.target);
      }
    },
    // Dispara um pouco antes de o elemento encostar na borda inferior, para que
    // ele termine de aparecer enquanto o leitor ainda está chegando nele.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  );
  return observer;
}

function resolveVariant(modifiers: Partial<Record<string, boolean>>): Variant {
  return VARIANTS.find(v => modifiers[v]) ?? 'up';
}

export const reveal_: Directive<HTMLElement, number | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    el.classList.add('reveal', `reveal--${resolveVariant(binding.modifiers)}`);

    const delay = Number(binding.value);
    if (Number.isFinite(delay) && delay > 0)
      el.dataset.revealDelay = String(delay);

    // Sem suporte a IntersectionObserver ou com movimento reduzido, o conteúdo
    // aparece de imediato — nunca fica invisível esperando uma animação que não vem.
    const io = prefersReducedMotion() ? null : getObserver();
    if (!io) {
      el.classList.add('is-in');
      return;
    }
    io.observe(el);
  },

  unmounted(el: HTMLElement) {
    observer?.unobserve(el);
  },
};

export { reveal_ as vReveal };
