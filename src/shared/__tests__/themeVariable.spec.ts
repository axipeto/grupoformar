import { describe, expect, it } from 'vitest';
import { themeVariable } from '@/shared/utils/themeVariable';

describe('themeVariable', () => {
  it('cai no realm padrão quando vazio', () => {
    expect(themeVariable('')).toBe('grupoformar');
  });

  it('cai no realm padrão para o realm genérico', () => {
    expect(themeVariable('Uppersoft')).toBe('grupoformar');
  });

  it('preserva um realm informado', () => {
    expect(themeVariable('outrocliente')).toBe('outrocliente');
  });
});
