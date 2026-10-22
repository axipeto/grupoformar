/** Textos institucionais do Grupo Formar — fonte única de copy da marca. */
export const labels = {
  DOCUMENT_TITLE: {
    base: 'Grupo Formar',
    default: 'Editora, produção gráfica e distribuição',
  },
  BRAND: {
    name: 'Grupo Formar',
    tagline: 'Formando conhecimento em papel, tinta e tecnologia.',
    description:
      'O Grupo Formar reúne três operações que cobrem o ciclo completo de uma obra: '
      + 'a curadoria editorial da Editora Formar, a produção gráfica da Mar e a distribuição '
      + 'nacional da Carvalho.',
  },
  UNITS: {
    editora: 'Editora Formar',
    mar: 'Mar Produções Gráficas',
    carvalho: 'Carvalho Distribuições',
  },
  /** Marcas do grupo que não são unidades de negócio do site — aparecem só no rodapé. */
  PARTNERS: {
    formarTech: 'Formar Tech',
  },
};

export type Labels = typeof labels;
