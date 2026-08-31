// Favicons (favicon.ico, apple-touch-icon, android-chrome-*) são estáticos em public/ e
// referenciados via <link> direto no index.html (seção 12) — não dependem de JS.

/** Aplica o <meta name="theme-color"> (cor da barra do navegador). */
export function setThemeColor(color = '#286db9') {
  const meta: HTMLMetaElement
    = document.querySelector('meta[name*=\'theme-color\']') || document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = color;
  document.getElementsByTagName('head')[0].appendChild(meta);
}
