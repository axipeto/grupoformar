import type { ThemeCssVariables } from '@/shared/utils/applyThemeVariables';

/**
 * Cores da marca — constantes nos dois modos (claro/escuro).
 * Extraídas do Manual da Marca do Grupo Formar (arquivos .svg do manual):
 * #56388c (violeta) · #286db9 (azul) · #009ee2 (ciano) · #1d1d1b (preto da marca).
 */
export const variables: { brand: ThemeCssVariables } = {
  brand: {
    '--gf-violet': '265 44% 39%', /* #56388c */
    '--gf-blue': '210 64% 44%', /* #286db9 */
    '--gf-blue-dark': '210 66% 34%', /* hover do azul */
    '--gf-cyan': '198 100% 44%', /* #009ee2 */
    '--gf-cyan-dark': '198 100% 36%', /* hover do ciano */
    '--gf-navy': '212 53% 12%', /* fundo escuro institucional */
    '--gf-navy-soft': '212 53% 17%', /* fundo escuro secundário */
    '--gf-ink': '60 3% 11%', /* #1d1d1b — preto da marca */
  },
};
