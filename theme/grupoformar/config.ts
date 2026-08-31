/** Configuração da marca — dados institucionais do realm `grupoformar`. */
export const config = {
  realm: 'grupoformar',
  siteName: 'Grupo Formar',
  /** TODO: confirmar os dados de contato reais antes de publicar. */
  contact: {
    email: 'comercial@grupoformar.com.br',
    phone: '(27) 3328-4686',
    whatsapp: '(27) 99942-4686',
    whatsappLink: 'https://wa.me/5527999424686',
  },
  /** TODO: preencher com os endereços reais de cada marca. */
  brands: {
    editora: 'https://www.grupoformar.com.br/editora',
    mar: 'https://www.grupoformar.com.br/mar',
    carvalho: 'https://www.grupoformar.com.br/carvalho',
  },
  social: {
    instagram: '',
    linkedin: '',
  },
};

export type BrandConfig = typeof config;
