import { describe, expect, it } from 'vitest';
import { cn } from '@/shared/utils/twmerge';

describe('cn', () => {
  it('junta classes', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolve conflitos do Tailwind mantendo a última', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('aceita objeto condicional', () => {
    expect(cn({ 'bg-blue': true, 'bg-red': false })).toBe('bg-blue');
  });

  it('ignora valores falsy', () => {
    expect(cn('px-4', undefined, null, false, '')).toBe('px-4');
  });
});
