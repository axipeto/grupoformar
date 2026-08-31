import logoCarvalho from '@theme/imgs/logo-carvalho.png';
import logoEditora from '@theme/imgs/logo-editora.png';
import logoFsc from '@theme/imgs/logo-fsc.png';
import logoMar from '@theme/imgs/logo-mar.png';
import imgGrafica from '@theme/imgs/grafica.jpg';
import imgHero from '@theme/imgs/hero.jpg';
import imgImpressao from '@theme/imgs/impressao.jpg';
import imgMaquinario from '@theme/imgs/maquinario.jpg';
import imgSustentabilidade from '@theme/imgs/sustentabilidade.jpg';
import type { Unit } from '@/domain/theme/content';

/**
 * Resolve os assets do tema para o conteúdo institucional.
 *
 * Fica em `shared/` porque `home` e `units` precisam das mesmas imagens — um módulo
 * não pode importar do outro (seção 4), e duplicar os imports em cada módulo faria
 * o Vite emitir a mesma imagem sob dois nomes.
 */
export interface UnitAssets {
  logo: string;
  image: string;
  logoClass: string;
}

const UNIT_ASSETS: Record<Unit['key'], UnitAssets> = {
  editora: { logo: logoEditora, image: imgImpressao, logoClass: 'h-11' },
  mar: { logo: logoMar, image: imgGrafica, logoClass: 'h-10' },
  // O logotipo da Carvalho é empilhado (símbolo acima do nome): precisa de mais altura
  // para ter o mesmo peso óptico dos outros dois.
  carvalho: { logo: logoCarvalho, image: imgMaquinario, logoClass: 'h-16' },
};

export function useBrandAssets() {
  function unitAssets(key: Unit['key']): UnitAssets {
    return UNIT_ASSETS[key];
  }

  return {
    unitAssets,
    hero: imgHero,
    maquinario: imgMaquinario,
    sustentabilidade: imgSustentabilidade,
    logoFsc,
  };
}
