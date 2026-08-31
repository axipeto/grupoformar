import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initColorMode, useColorMode } from '@/shared/composables/useColorMode';

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  })));
}

describe('useColorMode', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
  });

  it('sem preferência salva, segue o sistema (claro)', () => {
    initColorMode();
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('sem preferência salva, segue o sistema (escuro)', () => {
    mockMatchMedia(true);
    initColorMode();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('respeita a preferência salva mesmo contra o sistema', () => {
    mockMatchMedia(true);
    localStorage.setItem('grupoformar-theme', 'light');
    initColorMode();
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('toggle alterna o tema e persiste a escolha', () => {
    initColorMode();
    const { toggle } = useColorMode();

    toggle();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('grupoformar-theme')).toBe('dark');

    toggle();
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('grupoformar-theme')).toBe('light');
  });

  it('setMode grava o modo escolhido', () => {
    const { setMode, mode } = useColorMode();
    setMode('dark');
    expect(mode.value).toBe('dark');
    expect(localStorage.getItem('grupoformar-theme')).toBe('dark');
  });
});
