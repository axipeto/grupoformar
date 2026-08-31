import { ref } from 'vue';

export type ColorMode = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'grupoformar-theme';
const mode = ref<ColorMode>('system');

function resolve(m: ColorMode): 'light' | 'dark' {
  if (m === 'system')
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return m;
}

function apply(m: ColorMode) {
  document.documentElement.dataset.theme = resolve(m);
}

/** Chamado no boot (initUtils) — evita flash de tema errado (FOUC). */
export function initColorMode() {
  const saved = (localStorage.getItem(STORAGE_KEY) as ColorMode) || 'system';
  mode.value = saved;
  apply(saved);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (mode.value === 'system')
      apply('system');
  });
}

export function useColorMode() {
  function setMode(m: ColorMode) {
    mode.value = m;
    localStorage.setItem(STORAGE_KEY, m);
    apply(m);
  }
  function toggle() {
    setMode(resolve(mode.value) === 'dark' ? 'light' : 'dark');
  }
  return { mode, setMode, toggle };
}
