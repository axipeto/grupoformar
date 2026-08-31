import { variables as themeVars } from '@theme/variables';
import { initColorMode } from '@/shared/composables/useColorMode';
import { applyThemeVariables } from './applyThemeVariables';
import { setThemeColor } from './theme';
import '@fontsource/archivo/500.css';
import '@fontsource/archivo/600.css';
import '@fontsource/archivo/700.css';
import '@fontsource/archivo/800.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@/style.css';

export function initUtils() {
  applyThemeVariables(themeVars.brand); // injeta as cores da marca em :root
  initColorMode(); // define data-theme (dark/light) antes do mount
  setThemeColor();
}
