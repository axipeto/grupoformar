import { describe, expect, it } from 'vitest';
import { sanitizeHtml } from '@/shared/services/sanitizeHtml';

describe('sanitizeHtml', () => {
  it('mantém tags de formatação permitidas', () => {
    expect(sanitizeHtml('<p>Olá <strong>mundo</strong></p>')).toBe('<p>Olá <strong>mundo</strong></p>');
  });

  it('remove <script> por completo', () => {
    expect(sanitizeHtml('<p>oi</p><script>alert(1)</script>')).not.toContain('alert');
  });

  it('remove atributos de evento', () => {
    expect(sanitizeHtml('<p onclick="alert(1)">oi</p>')).toBe('<p>oi</p>');
  });

  it('remove href com javascript:', () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">clique</a>');
    expect(out).not.toContain('javascript:');
  });

  it('preserva href http e adiciona rel em target _blank', () => {
    const out = sanitizeHtml('<a href="https://grupoformar.com.br" target="_blank">site</a>');
    expect(out).toContain('href="https://grupoformar.com.br"');
    expect(out).toContain('noopener');
    expect(out).toContain('noreferrer');
  });

  it('desembrulha tags não permitidas mantendo o texto', () => {
    expect(sanitizeHtml('<marquee>texto</marquee>')).toBe('texto');
  });

  it('retorna string vazia para entrada não textual', () => {
    expect(sanitizeHtml('')).toBe('');
    expect(sanitizeHtml(null as unknown as string)).toBe('');
  });
});
