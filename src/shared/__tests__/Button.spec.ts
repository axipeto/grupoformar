import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button from '@/shared/components/Button.vue';

describe('button', () => {
  it('renderiza o conteúdo do slot', () => {
    const wrapper = mount(Button, { slots: { default: 'Fale conosco' } });
    expect(wrapper.text()).toBe('Fale conosco');
  });

  it('usa a variante primary por padrão', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('bg-blue');
  });

  it('aplica as classes da variante escolhida', () => {
    const wrapper = mount(Button, { props: { variant: 'ghost-light' } });
    expect(wrapper.classes()).toContain('border-white/40');
  });

  it('type é uma prop (default button) para não quebrar formulários', () => {
    expect(mount(Button).attributes('type')).toBe('button');
    expect(mount(Button, { props: { type: 'submit' } }).attributes('type')).toBe('submit');
  });

  it('mescla a classe recebida via prop', () => {
    const wrapper = mount(Button, { props: { class: 'w-full' } });
    expect(wrapper.classes()).toContain('w-full');
  });

  it('desabilita quando disabled', () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('emite click', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
