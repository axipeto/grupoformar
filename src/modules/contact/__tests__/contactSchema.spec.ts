import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/shared/schemas/contactSchema';

const valid = {
  nome: 'Ana',
  sobrenome: 'Ribeiro',
  email: 'ana@escola.com.br',
  telefone: '27999424686',
  empresa: 'Rede Municipal de Ensino',
  assunto: 'editorial' as const,
  mensagem: 'Gostaria de um orçamento para 3.000 exemplares.',
};

describe('contactSchema', () => {
  it('aceita um formulário completo e válido', () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejeita e-mail inválido', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'ana@' });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.email?.[0]).toBe('E-mail inválido.');
  });

  it('rejeita telefone curto demais', () => {
    const result = contactSchema.safeParse({ ...valid, telefone: '2799' });
    expect(result.success).toBe(false);
  });

  it('rejeita mensagem com menos de 10 caracteres', () => {
    const result = contactSchema.safeParse({ ...valid, mensagem: 'oi' });
    expect(result.success).toBe(false);
  });

  it('rejeita assunto fora da lista', () => {
    const result = contactSchema.safeParse({ ...valid, assunto: 'financeiro' });
    expect(result.success).toBe(false);
  });

  it('acumula erros de todos os campos vazios', () => {
    const result = contactSchema.safeParse({
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      empresa: '',
      assunto: 'editorial',
      mensagem: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = Object.keys(result.error.flatten().fieldErrors);
      expect(fields).toEqual(
        expect.arrayContaining(['nome', 'sobrenome', 'email', 'telefone', 'empresa', 'mensagem']),
      );
    }
  });
});
