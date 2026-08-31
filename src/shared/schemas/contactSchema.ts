import { z } from 'zod';

export const contactSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome.'),
  sobrenome: z.string().min(2, 'Informe seu sobrenome.'),
  email: z.string().email('E-mail inválido.'),
  telefone: z.string().min(10, 'Telefone inválido.'),
  empresa: z.string().min(2, 'Informe a instituição ou empresa.'),
  assunto: z.enum(['editorial', 'grafica', 'distribuicao', 'outro'], {
    errorMap: () => ({ message: 'Selecione o assunto.' }),
  }),
  mensagem: z.string().min(10, 'Conte um pouco mais sobre o projeto (mín. 10 caracteres).'),
});

export type ContactForm = z.infer<typeof contactSchema>;

export const assuntoOptions: { value: ContactForm['assunto']; label: string }[] = [
  { value: 'editorial', label: 'Projeto editorial (Editora Formar)' },
  { value: 'grafica', label: 'Impressão e acabamento (Mar Produções Gráficas)' },
  { value: 'distribuicao', label: 'Distribuição e logística (Carvalho Distribuições)' },
  { value: 'outro', label: 'Outro assunto' },
];
