import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, withDirectives } from 'vue';
import { formatCountUp, parseCountUp, vCountUp } from '@/shared/directives/countUp';

describe('parseCountUp', () => {
  it('separa prefixo, número e sufixo', () => {
    expect(parseCountUp('+2.000 títulos')).toEqual({
      prefix: '+',
      target: 2000,
      suffix: ' títulos',
      grouped: true,
    });
  });

  it('inteiro simples não usa separador de milhar', () => {
    expect(parseCountUp('26')).toEqual({ prefix: '', target: 26, suffix: '', grouped: false });
  });

  it('texto sem número não anima', () => {
    expect(parseCountUp('FSC')).toBeNull();
  });
});

describe('formatCountUp', () => {
  it('mantém prefixo, sufixo e o separador de milhar pt-BR', () => {
    const parts = parseCountUp('+2.000')!;
    expect(formatCountUp(parts, 1234)).toBe('+1.234');
    expect(formatCountUp(parts, 0)).toBe('+0');
  });
});

describe('v-count-up', () => {
  const Comp = defineComponent({
    render: () => withDirectives(h('b', '+2.000'), [[vCountUp]]),
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('com movimento reduzido, mostra o valor final sem animar', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    const observe = vi.fn();
    vi.stubGlobal('IntersectionObserver', vi.fn().mockImplementation(() => ({ observe, unobserve: vi.fn() })));

    const wrapper = mount(Comp);
    expect(wrapper.text()).toBe('+2.000');
    expect(observe).not.toHaveBeenCalled();
  });

  it('sem IntersectionObserver, o texto fica intacto', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    vi.stubGlobal('IntersectionObserver', undefined);

    const wrapper = mount(Comp);
    expect(wrapper.text()).toBe('+2.000');
  });
});
