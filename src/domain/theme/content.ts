/**
 * Conteúdo institucional do Grupo Formar.
 *
 * Vive em `domain/` (e não dentro de um módulo) porque é consumido por mais de um
 * módulo — `home` e `units` usam as unidades, `home` e `about` usam valores e
 * indicadores. Pela regra de desacoplamento (seção 4), nada disso pode ser
 * importado de módulo para módulo.
 *
 * TODO: os indicadores e as especificações do parque gráfico são estimativas de
 * preenchimento — substituir pelos números reais antes de publicar.
 */

export interface Unit {
  key: 'editora' | 'mar' | 'carvalho';
  name: string;
  description: string;
  tags: string[];
  imageAlt: string;
}

export interface ValueItem {
  index: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface EsgPoint {
  title: string;
  description: string;
}

export const stats: Stat[] = [
  { value: '26', label: 'anos de operação contínua' },
  { value: '3', label: 'unidades de negócio integradas' },
  { value: '+2.000', label: 'títulos publicados e impressos' },
  { value: 'FSC', label: 'manejo florestal certificado' },
];

export const units: Unit[] = [
  {
    key: 'editora',
    name: 'Editora Formar',
    description:
      'Curadoria e publicação de obras didáticas e acadêmicas. Trabalhamos lado a lado com '
      + 'autores e pesquisadores em todas as etapas — seleção, revisão, projeto editorial e '
      + 'registro — para que o conteúdo chegue ao leitor com rigor.',
    tags: ['Curadoria', 'Revisão', 'ISBN & catalogação', 'Projeto editorial'],
    imageAlt: 'Impressão em quatro cores saindo da máquina',
  },
  {
    key: 'mar',
    name: 'Mar Produções Gráficas',
    description:
      'Parque gráfico próprio para tiragens de qualquer porte. Impressão offset e digital, '
      + 'acabamentos especiais e controle de cor em todas as etapas — da prova ao lote final.',
    tags: ['Offset', 'Digital', 'Acabamentos', 'Grandes tiragens'],
    imageAlt: 'Operador conferindo prova de cor na gráfica',
  },
  {
    key: 'carvalho',
    name: 'Carvalho Distribuições',
    description:
      'Logística e distribuição para todo o país. Armazenagem, separação e rastreamento de '
      + 'cada remessa, conectando a produção do grupo a livrarias, escolas e redes de ensino '
      + 'com previsibilidade de prazo.',
    tags: ['Armazenagem', 'Rastreamento', 'Cobertura nacional'],
    imageAlt: 'Linha de máquinas impressoras do Grupo Formar',
  },
];

export const values: ValueItem[] = [
  { index: '01', title: 'Integridade', description: 'Transparência em todas as ações e relações comerciais.' },
  { index: '02', title: 'Lealdade', description: 'Compromisso de longo prazo com o sucesso de nossos parceiros.' },
  { index: '03', title: 'Ética', description: 'Conduta irrepreensível em cada negociação e contrato.' },
  { index: '04', title: 'Respeito', description: 'Valorização do potencial humano em cada etapa do processo.' },
  { index: '05', title: 'Inovação', description: 'Busca contínua por processos e tecnologias mais eficientes.' },
  { index: '06', title: 'Qualidade', description: 'Padrão rigoroso em cada publicação, impressão e entrega.' },
];

export const parkSpecs: Spec[] = [
  { label: 'Impressão offset', value: '4 e 5 cores' },
  { label: 'Formato máximo de folha', value: '102 × 72 cm' },
  { label: 'Acabamento', value: 'Lombada quadrada e canoa' },
  { label: 'Controle de cor', value: 'Prova digital certificada' },
];

export const timeline: TimelineItem[] = [
  {
    year: '2000',
    title: 'Fundação da Editora Formar',
    description:
      'Início da produção própria com maquinário moderno, estabelecendo o padrão de '
      + 'qualidade que nos define.',
  },
  {
    year: '2015',
    title: 'Expansão e produção gráfica',
    description:
      'A Mar Produções Gráficas amplia o parque instalado, trazendo impressão e acabamento '
      + 'para dentro de casa.',
  },
  {
    year: 'Hoje',
    title: 'Ciclo completo integrado',
    description:
      'Com a Carvalho Distribuições, o grupo passa a cobrir todo o percurso de uma obra: '
      + 'do original ao ponto de venda.',
  },
];

export const esgPoints: EsgPoint[] = [
  {
    title: 'Certificação FSC',
    description: 'Papel de manejo florestal responsável e rastreável.',
  },
  {
    title: 'Energia solar própria',
    description: 'Geração fotovoltaica abastecendo a operação gráfica.',
  },
  {
    title: 'Gestão de resíduos',
    description: 'Reciclagem de aparas e destinação correta de insumos químicos.',
  },
];
