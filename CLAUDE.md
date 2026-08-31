# Instruções do Projeto — Site Institucional Grupo Formar

> **Este documento é a ÚNICA referência.** Ele contém tudo — arquitetura, convenções, código de fundação, paleta e regras. Não existe repositório externo para consultar: se algo não estiver aqui, siga os princípios descritos e mantenha coerência com os exemplos.
>
> **Regra de ouro:** ESTRUTURA, PADRÕES DE CÓDIGO e NOMES seguem exatamente o que está definido aqui. O DESIGN (paleta, tipografia, formas) segue o **Manual da Marca do Grupo Formar** (seção **7**).

---

## 1. Objetivo

Construir o **site institucional multi-página do Grupo Formar** — holding que reúne três operações: **Editora Formar** (curadoria e publicação), **Mar Produções Gráficas** (parque gráfico próprio) e **Carvalho Distribuições** (logística e distribuição).

Site de marketing/institucional **sem autenticação**, com as rotas `/`, `/sobre`, `/unidades` e `/contato`. Requisitos de primeira classe: **dark/light mode**, **SEO** e **Microsoft Clarity** configurado.

Princípios: separação clara de responsabilidades, arquitetura modular desacoplada, TypeScript estrito, tudo tipado, componentes de UI "burros" (só UI) e lógica em composables.

---

## 2. Stack e Tooling

| Item | Escolha |
|------|---------|
| Framework | **Vue 3** (`<script setup lang="ts">`, Composition API) |
| Build | **Vite** (`target: esnext`) |
| Linguagem | **TypeScript** estrito |
| Estilo | **Tailwind CSS v4** (plugin `@tailwindcss/vite`, diretiva `@theme`) |
| Estado | **Pinia** |
| Rotas | **vue-router** (`createWebHistory`, lazy loading por módulo) |
| HTTP | **axios** encapsulado em `AxiosHttpClient` |
| Validação | **Zod** (todo formulário — seção 8) |
| SEO / meta | **@unhead/vue** (`useHead`) — seção 9 |
| Ícones | **@iconify/vue** (`<Icon>` global) |
| Classes CSS | **clsx + tailwind-merge** via helper `cn()` |
| Sanitização HTML | sanitizador próprio + directive `v-safe-html` (sem dependência externa) |
| Lint | **ESLint** `@antfu/eslint-config` (indent 2, aspas simples, semi) |
| Testes | **Vitest** + `@vue/test-utils` (jsdom) |
| Git hooks | **Husky** (pre-commit: lint + **testes** + build — seção 11) |
| Gerenciador | **yarn** |
| Fontes | **Archivo** (display/UI) + **Hanken Grotesk** (corpo), self-hosted via `@fontsource` |
| Deploy | **Docker + nginx** (gzip + SPA fallback) |

O `package.json` completo está na raiz do repositório. Dois pontos merecem explicação:

> **`resolutions.vite`** existe porque `vitest` declara sua própria dependência de `vite` (`^5 || ^6 || ^7`) e o Yarn Classic pode instalar uma cópia duplicada em major diferente do `vite` de `devDependencies` — isso quebra a checagem de tipos entre `vite.config.ts` e `vitest.config.ts` (tipos de `Plugin`/`PluginOption` incompatíveis). Forçar uma única versão resolve.
>
> **`eslint-plugin-import-x`**, **`eslint-import-resolver-node`** e **`@types/jsdom`** são exigidos pelo `eslint.config.js` e pelo `tsconfig.vitest.json` — sem eles o lint e o type-check quebram.

**Fontes.** Diferente de projetos que dependem da system font stack, aqui as duas famílias são empacotadas via `@fontsource` (dependências de produção, não de desenvolvimento) e importadas em `src/shared/utils/index.ts`. **Archivo** é um grotesco de contraste baixo e caixa alta compacta, escolhido por conversar com o desenho geométrico do logotipo; **Hanken Grotesk** é mais aberta e sustenta bem texto corrido. Pesos empacotados: Archivo 500/600/700/800, Hanken Grotesk 400/500/600 — são os únicos usados, não adicione outros sem necessidade real.

> Se adotar pré-renderização estática para SEO (recomendado, seção 9), adicionar `vite-ssg` e `@unhead/addons`.

---

## 3. Arquitetura e Estrutura de Pastas

```
.
├── index.html                  # SEO base + script anti-FOUC de tema
├── package.json / yarn.lock
├── vite.config.ts / vitest.config.ts
├── tsconfig*.json / env.d.ts / eslint.config.js
├── .env.example / .env.production
├── Dockerfile / nginx.conf / .dockerignore
├── .husky/pre-commit
├── public/                     # robots.txt, sitemap.xml, favicon.ico/-16x16/-32x32,
│                               # apple-touch-icon.png, android-chrome-192x192/512x512.png,
│                               # og-default.jpg
├── theme/                      # tema por realm/cliente
│   └── grupoformar/
│       ├── variables.ts        # cores da marca (paleta do Manual)
│       ├── config.ts           # config da marca (contato, sites das marcas)
│       ├── labels.ts           # textos institucionais
│       └── imgs/               # logotipos das 4 marcas + selo FSC + fotos
└── src/
    ├── main.ts                 # boot: createApp → initUtils → initServices → initPlugins → mount
    ├── App.vue                 # escolhe layout por route.meta.layout + <RouterView/>
    ├── globalComponents.ts     # registra componentes globais (Icon, ...)
    ├── style.css               # tailwind + @theme + tokens light/dark + @layer base
    │
    ├── modules/                # UMA pasta por página/feature (regras de desacoplamento — seção 4)
    │   ├── home/               # routes/ + views/HomeView.vue + components/HomeStats.vue
    │   ├── about/              # routes/ + views/AboutView.vue
    │   ├── units/              # routes/ + views/UnitsView.vue
    │   └── contact/            # routes/ + views/ContactView.vue + components/ContactForm.vue
    │
    ├── shared/                 # transversal a QUALQUER módulo
    │   ├── components/         # PageHeader, PageFooter, Button, Section, Hero, UnitCard, ...
    │   ├── composables/        # useColorMode, useSeo, useOrganizationSchema, useContact,
    │   │                       # useBrandAssets
    │   ├── schemas/            # contactSchema.ts (usado por mais de um módulo — seção 8)
    │   ├── layouts/            # DefaultLayout.vue, EmptyLayout.vue, index.ts
    │   ├── directives/         # safeHtml.ts (v-safe-html)
    │   ├── plugins/            # index.ts (initPlugins)
    │   ├── services/           # index.ts (initServices), clarity.ts, sanitizeHtml.ts, contactApi.ts
    │   ├── router/             # index.ts + types.d.ts + middlewares/
    │   └── utils/              # index.ts (initUtils), twmerge.ts, theme.ts,
    │                           # applyThemeVariables.ts, themeVariable.ts
    │
    ├── domain/                 # regra de negócio / conhecimento transversal (não-UI)
    │   └── theme/              # entities/variables.ts (env), labels.ts, config.ts, content.ts
    │
    └── networking/             # client.ts (AxiosHttpClient) + types/
```

**Pastas criadas sob demanda.** `shared/store/`, `shared/types/`, `domain/theme/types/` e as pastas `composables/`/`components/`/`api/`/`store/` de cada módulo fazem parte da estrutura canônica mas **só existem quando têm conteúdo** — diretórios vazios não sobrevivem ao Git. Crie a pasta no momento em que for adicionar o primeiro arquivo, seguindo os nomes acima.

**Camadas de dependência (uma direção só):**
`modules/` → `domain/`, `shared/`, `networking/`.
`shared/`, `domain/`, `networking/` **nunca** dependem de `modules/`.

> **Exceção única e conhecida:** `shared/router/index.ts` importa as rotas de cada módulo. É o ponto de agregação do roteamento e a única inversão permitida — a zona correspondente do ESLint não cobre esse arquivo.

---

## 4. Regras de Desacoplamento de Módulos (OBRIGATÓRIO)

1. **Um módulo NUNCA importa de outro módulo.** `modules/<A>` não importa nada de `modules/<B>`.
   - Um módulo só importa de: **seus próprios arquivos**, `@/shared/*`, `@/domain/*`, `@/networking/*`.
2. **`shared/`, `domain/` e `networking/` NUNCA importam de `modules/`** (salvo o router, acima).
3. **Comunicação entre módulos** só via transversal: `shared/store` (Pinia), `shared/services`, o router ou `domain/`. Nunca import direto entre módulos.
4. **Submódulos** (`modules/<A>/shared/submodules/<sub>`) seguem o MESMO princípio:
   - Um submódulo **nunca importa de um submódulo irmão**.
   - Só importa de: seus próprios arquivos, `modules/<A>/shared/*` e o transversal global.
   - Precisou compartilhar entre dois submódulos? Suba para `modules/<A>/shared/`.
5. **Regra prática:** se precisou importar de outro módulo, o que você precisa está no lugar errado — mova para `shared/` ou `domain/`.

**Enforcement no ESLint.** O `eslint.config.js` usa `import-x/no-restricted-paths` com zonas em duas direções: transversal→módulo (3 zonas) **e** módulo→módulo (12 zonas, todos os pares entre `home`, `about`, `units` e `contact`). Ao criar um módulo novo, **adicione os pares dele nas zonas** — a lista é explícita, não automática.

### Como isso aparece na prática neste projeto

Três casos reais em que a regra 5 foi aplicada:

- **`domain/theme/content.ts`** — unidades, valores, indicadores, linha do tempo e pontos de ESG. `home` e `units` renderizam as mesmas unidades; `home` e `about` renderizam os mesmos valores. Como é conhecimento de negócio e não UI, vive em `domain/`.
- **`shared/composables/useBrandAssets.ts`** — resolve logotipos e fotos do tema. `home` e `units` precisam das mesmas imagens; duplicar os `import` em cada módulo faria o Vite emitir o mesmo arquivo sob dois nomes.
- **`shared/schemas/contactSchema.ts` + `shared/composables/useContact.ts` + `shared/services/contactApi.ts`** — ver seção 8.

---

## 5. Camadas — responsabilidades

- **View** (`views/*.vue`): página completa. Orquestra componentes + composables. É o "controlador".
- **Component** (`components/*.vue`): **só UI**. Recebe `props`, emite `events`. Sem lógica de negócio, sem API.
- **Composable** (`composables/use*.ts`): lógica reutilizável (estado `ref`, funções de negócio, orquestra store/api). Camada de serviço.
- **Store** (`store/use*Store.ts`): estado global Pinia. Só estado + getters + actions simples.
- **API** (`api/*Api.ts`): abstrai HTTP. Um método por endpoint, tipado. Usa o client de `networking/`.
- **Schemas** (`schemas/*.ts`): schemas Zod + tipos inferidos (`z.infer`). Se o schema for usado por mais de um módulo, ele vive em `shared/schemas/` — nunca duplicado, nunca importado de módulo para módulo (regra 4).
- **Content** (`domain/theme/content.ts`): conteúdo institucional tipado, consumido por mais de um módulo.
- **Entities/Types** (`*.d.ts`): interfaces de dados.
- **Routes** (`routes/index.ts`): `RouteRecordRaw[]` com lazy loading e `meta` (`title`, `description`, `layout`).

---

## 6. Convenções de Código

### Componentes Vue
- Sempre `<script setup lang="ts">`.
- Props tipadas com `interface Props` + `withDefaults(defineProps<Props>(), {...})`.
- Variantes via prop `variant` (union de strings) resolvidas com `cn()` + objeto de classes condicionais (ver `Button.vue`).
- UI aceita `class?: string` na Props, mesclada com `cn()`.
- Ícones: `<Icon icon="material-symbols:..." />` (global).
- HTML dinâmico só via `v-safe-html` (nunca `v-html` cru).
- `interface` sempre em PascalCase. Nada de `any` solto.
- Imports com alias `@/` → `src/`, `@theme` → `theme/grupoformar`.

### Boot — `src/main.ts`

```ts
const app = createApp(App);

initUtils();        // cores da marca em :root, dark/light antes do mount, theme-color, CSS
initServices(app);  // pinia, router, unhead, directives, componentes globais, clarity
initPlugins();      // integrações externas de UI (vazio até haver necessidade)

app.mount('#app');
```

`useSeo()` (seção 9) e `useOrganizationSchema()` (JSON-LD) são chamados uma vez no `App.vue`, sitewide.

### Componentes de shell

**`PageHeader.vue`** — logo + nav real (`/`, `/unidades`, `/sobre`) + `ThemeToggle` + CTA "Fale conosco" + menu hambúrguer no mobile. O filete do gradiente da marca (`<BrandRule />`) fica no topo, acima da barra.

**`PageFooter.vue`** — quatro colunas (marca, navegação, institucional, contato), depois a faixa **"Marcas do grupo"** com os três logotipos linkando para os sites de cada empresa, e a linha de copyright. Os endereços vêm de `theme/grupoformar/config.ts` (`brands`).

**Logotipos em fundo escuro.** Os logotipos das quatro marcas são pretos com símbolo em gradiente — ilegíveis sobre fundo escuro. Duas classes resolvem isso (definidas em `style.css`):

- `.logo-adaptive` — inverte para branco sólido **só no tema escuro**. Use no header e em cards de superfície.
- `.logo-invert` — inverte sempre. Use no rodapé e em qualquer lugar que já seja escuro nos dois temas.

A inversão descarta o gradiente e entrega o logo em branco chapado, que é o comportamento correto para aplicação monocromática. Nunca aplique `.logo-invert` a um logo sobre fundo claro.

**Alturas por marca.** Os quatro logotipos têm proporções diferentes: o da Carvalho é empilhado (símbolo de folhas acima do nome) e precisa de mais altura para ter o mesmo peso óptico dos horizontais. As alturas estão em `useBrandAssets.ts` (`logoClass`) e no `PageFooter.vue` (`brands[].class`). Sempre `w-auto` — nunca fixe largura, distorce.

---

## 7. Sistema de Design (Manual da Marca do Grupo Formar)

Mecanismo: tokens de cor em CSS custom properties. As **cores da marca** ficam em `theme/grupoformar/variables.ts` (injetadas em `:root` no boot via `applyThemeVariables`). Os **tokens semânticos de superfície** (que mudam entre claro/escuro) ficam em `style.css`. Tudo é exposto ao Tailwind via `@theme` como utilitários (`bg-blue`, `text-text`, etc.). **Nunca usar hex cru no template.**

### 7.1 Paleta — origem

As quatro cores da marca foram extraídas dos arquivos do **Manual da Marca do Grupo Formar** (`Manual - Grupo Formar-11.svg`, `-12.svg` e `_CAPA.svg`), que contêm exatamente estes valores e nenhum outro. Não são cores inferidas de screenshot nem herdadas de outro projeto.

| Papel | Hex | HSL | Uso |
|-------|-----|-----|-----|
| **Azul (primary)** | `#286db9` | `210 64% 44%` | Botões primários, links, rótulos de seção, marcadores da linha do tempo |
| Azul escuro | — | `210 66% 34%` | `active` do botão primário |
| **Ciano (accent)** | `#009ee2` | `198 100% 44%` | Hover de botões e links, rótulos sobre fundo escuro, foco de campos |
| Ciano escuro | — | `198 100% 36%` | `active` |
| **Violeta** | `#56388c` | `265 44% 39%` | Exclusivo do gradiente da marca — nunca como cor sólida de UI |
| **Preto da marca** | `#1d1d1b` | `60 3% 11%` | Cor do wordmark nos arquivos originais |
| Navy institucional | — | `212 53% 12%` | Fundo de seções escuras, rodapé, scrim de hero |
| Navy secundário | — | `212 53% 17%` | Segundo nível de fundo escuro |

O **gradiente da marca** (`violeta → azul → ciano`, o mesmo do símbolo "F") é a assinatura visual do site. Ele aparece **só como filete de 3px**: no topo do header, no topo dos cards de destaque e de formulário. Nunca como fundo chapado de seção, nunca atrás de texto — um hero com lavagem de gradiente roxo-azul é justamente o clichê que a marca real não pede.

Use o componente `<BrandRule />` ou a classe `.brand-rule`, nunca escreva o `linear-gradient` à mão.

**Neutros.** Os cinzas não são neutros puros: todos carregam viés frio (matiz `213`), puxado do azul da marca. Um cinza `0 0% x%` ao lado dessa paleta lê como descuido.

### 7.2 Cores da marca — `theme/grupoformar/variables.ts`

```ts
export const variables: { brand: ThemeCssVariables } = {
  brand: {
    '--gf-violet': '265 44% 39%',      /* #56388c */
    '--gf-blue': '210 64% 44%',        /* #286db9 */
    '--gf-blue-dark': '210 66% 34%',
    '--gf-cyan': '198 100% 44%',       /* #009ee2 */
    '--gf-cyan-dark': '198 100% 36%',
    '--gf-navy': '212 53% 12%',
    '--gf-navy-soft': '212 53% 17%',
    '--gf-ink': '60 3% 11%',           /* #1d1d1b */
  },
};
```

Formato **HSL sem `hsl()`** para permitir `hsl(var(--gf-blue) / 0.4)` com opacidade arbitrária.

### 7.3 Tokens semânticos — `src/style.css`

O arquivo completo está em `src/style.css`. Estrutura:

- `:root` — superfícies, texto, bordas e cinzas do **tema claro**.
- `[data-theme='dark']` — redefine **só** esses tokens para o tema escuro.
- `@theme` — expõe tudo ao Tailwind (`--color-blue`, `--color-text`, `--font-display`, `--shadow-0X`, `--z-index-*`).
- `@layer base` — reset de altura, `.container-max`, `.brand-rule`, `.section-dark`, `.logo-invert`, `.logo-adaptive` e o bloco `prefers-reduced-motion`.

**Regra dura:** nenhum componente pode declarar cor dentro de um bloco `[data-theme]`. Toda cor sai de um token. Um valor cuja única definição está atrás do seletor de tema não se aplica no estado padrão e produz texto de um tema sobre fundo do outro.

O dark mode é acionado por atributo:

```css
@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));
```

### 7.4 Dark / Light mode

`src/shared/composables/useColorMode.ts` — três estados (`light`, `dark`, `system`), persistidos em `localStorage` sob a chave `grupoformar-theme`. `initColorMode()` roda no boot (`initUtils`), antes do mount. O `index.html` tem um script inline que aplica o tema salvo **antes** do JS do app carregar, evitando o flash de tema errado (FOUC) — a chave do `localStorage` é a mesma nos dois lugares; se mudar uma, mude a outra.

`ThemeToggle.vue` fica no `PageHeader`.

### 7.5 Tipografia

Escala em duas famílias, com papéis separados:

- **Archivo** (`font-display`) — todos os títulos, botões, rótulos, navegação, números de indicadores. Pesos 500/600/700/800.
- **Hanken Grotesk** (`font-sans`, padrão do `body`) — texto corrido, descrições, itens de lista. Pesos 400/500/600.

**Sistema de rótulos.** A entressilaba larga do "G R U P O" no logotipo vira o sistema de rótulos do site: Archivo 700, 11–12px, caixa alta, `tracking-[0.22em]`. É o componente `<Eyebrow />` — use ele, não reconstrua a mão.

Títulos usam `tracking-tight` e `text-balance` (aplicados globalmente em `h1..h4` no `@layer base`). Texto corrido fica perto de 60–65 caracteres por linha (`max-w-[54ch]`, `max-w-[60ch]`).

### 7.6 Diretrizes visuais

- **Ritmo de seções.** Alterna claras (`bg-bg`, `bg-surface-alt`) e escuras (`.section-dark` ou hero com scrim). O componente `<Section tone="default|alt|dark">` cuida do padding vertical e do container.
- **Heros.** `<Hero>` com foto de fundo e scrim diagonal: `rgba(14,28,46,.95)` à esquerda → `rgba(0,158,226,.28)` à direita. O ciano aparece só na borda, o texto fica sobre a parte opaca. `size="full"` na home, `size="compact"` nas internas.
- **Cards.** `bg-surface`, borda `1px` em `border-border`, `rounded-xl`, `shadow-03`. Sem efeito de "pop" no hover — só mudança sutil de fundo. Sombras têm tinta azulada (`rgb(20 40 70 / …)`), não preto puro.
- **Grades com divisórias.** Indicadores e valores usam `gap-px` sobre `bg-border` em vez de `border` em cada célula — evita a linha de 2px onde duas bordas se encontram.
- **Botões.** `Button.vue`, variantes `primary` (azul → ciano no hover), `secondary` (branco sobre escuro), `ghost-light` (contorno sobre escuro), `neutral`, `danger`, `tertiary`. Raio `rounded-md` (6px) — o desenho da marca é geométrico e reto; pílula não combina.
- **Fotos.** O acervo disponível é pequeno (275–363px de lado nas fotos de operação). Use sempre em moldura com proporção fixa e `object-fit: cover`; nunca em full-bleed, onde a baixa resolução aparece.
- **Responsivo:** mobile-first, breakpoints `md:`/`lg:`/`xxl:`.
- **Movimento:** discreto. Hover de link com sublinhado em gradiente, seta que desliza 4px, card que sobe 2px. O bloco `prefers-reduced-motion` em `@layer base` zera tudo.

---

## 8. Formulários com Zod (OBRIGATÓRIO)

Todo formulário valida com **Zod**. Schema em `modules/<x>/schemas/`, tipo via `z.infer`. Validação orquestrada no composable, nunca no componente de UI (que só renderiza campos + erros recebidos).

> **Exceção — formulário de contato:** schema, composable e API vivem em `shared/`, não em `modules/contact/`. Hoje só a `/contato` usa o formulário, mas o CTA da home já linka para ele e a intenção é embutir o formulário na home numa fase seguinte. Pela regra 4, algo usado por dois módulos precisa estar em `shared/` — deixar em `modules/contact/` obrigaria `home` a importar de `contact`.

`shared/schemas/contactSchema.ts` — campos `nome`, `sobrenome`, `email`, `telefone`, `empresa`, `assunto` (enum das três unidades + "outro") e `mensagem`. O `assunto` existe para rotear o contato para a unidade certa; as opções ficam em `assuntoOptions`, exportadas do mesmo arquivo para o `<select>` não duplicar os rótulos.

`shared/composables/useContact.ts` expõe `{ form, errors, loading, status, submit, reset }`. O `status` (`idle | success | error`) alimenta a mensagem de retorno; em sucesso o formulário é limpo.

**Acessibilidade do formulário** (`ContactForm.vue`): todo campo tem `<label for>`, `aria-invalid` e `aria-describedby` apontando para a mensagem de erro. A mensagem de sucesso usa `role="status"`, a de falha `role="alert"`.

> **Sem backend definido.** `contactApi.send()` faz `POST /contact` no `VITE_CONTACT_API_ROUTE`. Com a variável vazia a requisição falha e o formulário mostra o estado de erro — comportamento correto e honesto, mas o endpoint precisa existir antes de publicar.

---

## 9. SEO (prioridade alta — o site precisa ranquear)

- **Meta tags:** `shared/composables/useSeo.ts` aplica `title`, `description`, canonical, Open Graph e Twitter Card a partir de `route.meta`. Chamado uma vez no `App.vue`.
- **`index.html`:** `lang="pt-BR"`, title/description default, OG default, favicons completos, `theme-color` (`#286db9`) e o script anti-FOUC.
- **HTML semântico:** `<header> <nav> <main> <section> <article> <footer>`; um só `<h1>` por página; `alt` descritivo; `aria-*` quando necessário.
- **Dados estruturados (JSON-LD):** `useOrganizationSchema()` injeta `Organization` sitewide, com `subOrganization` para as três marcas — é assim que o Google entende a relação entre holding e empresas do grupo. `sameAs` fica de fora até haver URLs de redes sociais confirmadas.
  > **`innerHTML`, não `children`:** a propriedade do `@unhead/vue` v2 para conteúdo inline de `<script>` é `innerHTML` — `children` não existe no tipo `ResolvableScript` e quebra o type-check.
- **Arquivos** (em `public/`): `robots.txt` (permitir indexação + apontar sitemap) e `sitemap.xml` com as 4 rotas. **Ao criar uma rota nova, adicione no `sitemap.xml`** — hoje ele é estático; se as rotas crescerem, gere no build.
- **URLs:** amigáveis, pt-BR, com canonical; sem hash routing.
- **Performance:** imagens com `loading="lazy"` fora da dobra; code-splitting por rota (lazy); gzip no nginx; `aspect-ratio` nas molduras de imagem para evitar CLS.
- **Renderização (RECOMENDADO):** por ser SPA Vite, considerar **pré-renderização estática com `vite-ssg`** (gera HTML por rota no build; integra com `@unhead/vue`). Sem SSG, o conteúdo depende de JS para ser indexado — aceitável para o Google hoje, mas pior para outros crawlers e para pré-visualização de link.

---

## 10. Analytics — Microsoft Clarity (o código vem da env)

`VITE_CLARITY_ID` está em `env.d.ts`, `.env.example` e `.env.production`. **O código do Clarity fica SEMPRE na variável de ambiente**, nunca hardcoded. `src/shared/services/clarity.ts` é chamado em `initServices(app)` e sai cedo se o id estiver vazio — então em desenvolvimento, com a env em branco, nada é carregado.

`VITE_GOOGLE_ANALYTICS_ID` está declarada mas ainda não é consumida por nenhum código. Ou implemente, ou remova de `env.d.ts` e dos `.env` — variável declarada e não usada vira ruído.

---

## 11. Qualidade — pre-commit e testes (OBRIGATÓRIO)

`.husky/pre-commit` roda lint + **todos os testes** + build. Qualquer falha (exit ≠ 0) **bloqueia o commit**:

```sh
yarn lint && yarn test && yarn build
```

- `test` = `vitest run` (não-interativo). **Testes são obrigatórios e todos devem passar** para commitar.
- Cobertura mínima esperada: validações Zod, `useColorMode`, `sanitizeHtml`, `cn()`, `themeVariable` e componentes de UI com variantes.
- Suítes já existentes: `src/modules/contact/__tests__/contactSchema.spec.ts`, `src/shared/__tests__/{useColorMode,sanitizeHtml,Button,twmerge,themeVariable}.spec.ts`.
- `vitest.config.ts` estende `vite.config.ts` (environment `jsdom`).

---

## 12. Arquivos de configuração

Todos completos na raiz: `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `env.d.ts`, `tsconfig*.json`, `.editorconfig`, `index.html`, `Dockerfile`, `nginx.conf`, `.husky/pre-commit`, `.env.example`, `.env.production`.

Pontos que costumam gerar dúvida:

- **`vite.config.ts`** resolve o alias `@theme` a partir de `VITE_THEME_REALM` via `themeVariable()`, com fallback para `grupoformar`. É o gancho de white-label: um segundo cliente entra como nova pasta em `theme/`, sem tocar em `src/`.
- **`tsconfig.app.json`** fixa `@theme/*` em `theme/grupoformar/*`. O TypeScript não lê env, então esse caminho é estático — se um dia houver segundo realm, o path do tsconfig precisa acompanhar.
- **`eslint.config.js`** restringe o bloco de regras a `**/*.{ts,mts,tsx,vue}` porque `@typescript-eslint/naming-convention` exige parser services; aplicado a json/md ele quebra o lint inteiro.
- **`nginx.conf`** tem `try_files $uri $uri/ /index.html` — obrigatório, o router usa `createWebHistory`. Sem isso, recarregar `/sobre` dá 404.
- **`Dockerfile`** usa `yarn install --frozen-lockfile` e **exige o `yarn.lock` commitado**. Rode `yarn install` uma vez e faça commit do lockfile.

---

## 13. Mapa de Páginas e Módulos

| Rota | Módulo | View | Seções |
|------|--------|------|--------|
| `/` | `home` | `HomeView.vue` | **Hero** (foto da fachada, headline com o ciano em destaque, dois CTAs) → **Indicadores** (faixa de 4 números) → **Unidades** (3 `UnitCard` alternando lado da imagem) → **Valores** (grade de 6) → **Sustentabilidade** (foto de painéis solares + 3 pontos ESG + selo FSC) → **CTA final** (card com filete da marca) |
| `/sobre` | `about` | `AboutView.vue` | **Hero compacto** → **Linha do tempo** (2000 → 2015 → hoje) → **Valores** (grade de 6, âncora `#valores`) → **Sustentabilidade** completa (âncora `#sustentabilidade`) |
| `/unidades` | `units` | `UnitsView.vue` | **Hero compacto** → **3 unidades** detalhadas → **Parque gráfico** (seção escura com specs + foto, âncora `#parque`) |
| `/contato` | `contact` | `ContactView.vue` | Canais de contato (e-mail, telefone, WhatsApp) + formulário Zod completo |

**Âncoras.** O rodapé linka `/sobre#valores`, `/unidades#parque` e `/sobre#sustentabilidade`. O `scrollBehavior` do router trata `to.hash` com `behavior: 'smooth'` — ao adicionar uma âncora nova, o `id` precisa existir na view de destino.

**Sobreposição deliberada.** Valores e Sustentabilidade aparecem na home **e** em `/sobre`; as unidades aparecem na home **e** em `/unidades`. Na home são resumos que levam à página completa. O conteúdo vem do mesmo `domain/theme/content.ts` — nunca duplique o texto para "ajustar" uma das versões; ajuste a fonte única ou passe uma fatia (`units.slice(0, 2)`, por exemplo).

### Conteúdo pendente de confirmação

O layout e a estrutura estão fechados; **estes dados foram preenchidos com valores de trabalho** e precisam ser confirmados com o cliente antes de publicar:

- **`theme/grupoformar/config.ts`** — e-mail, telefone e WhatsApp; e os três endereços em `brands`, que alimentam os links da faixa "Marcas do grupo" no rodapé.
- **`src/domain/theme/content.ts`** — os 4 indicadores ("25 anos", "3 unidades", "+2.000 títulos", "FSC"), as specs do parque gráfico (formato de folha, número de cores, tipos de acabamento) e os marcos da linha do tempo (2000, 2015).
- **Fotos das unidades** — hoje as três unidades usam fotos genéricas de operação gráfica. A Carvalho Distribuições, em particular, está ilustrada com uma foto de maquinário de impressão, que não representa logística.

### Decisão de escopo registrada

Uma proposta de layout anterior descrevia a terceira unidade como **"Formar.Tech" (tecnologia e distribuição)**. Não existe logotipo nem qualquer material dessa marca no acervo da marca; o que existe é o da **Carvalho Distribuições**. O site foi construído com a Carvalho como terceira unidade. Se a Formar.Tech existir de fato, ela precisa de logotipo próprio e entra como quarta unidade em `content.ts` — sem trocar a Carvalho.

---

## 14. Ordem de construção — estado atual

1. ✅ **Scaffold + fundação:** projeto Vite Vue+TS, todos os arquivos de configuração, `shared/utils`, `shared/services`, `networking`, `globalComponents.ts`, `main.ts`, `App.vue`.
2. ✅ **Design system + tema:** `theme/grupoformar/*`, `style.css`, fontes self-hosted, `useColorMode`, `cn()`, `Button.vue`, `ThemeToggle.vue`.
3. ✅ **Shell:** layouts, `PageHeader` (com toggle), `PageFooter` (com faixa de marcas), router central, `useSeo`, `robots.txt`/`sitemap.xml`, JSON-LD `Organization`.
4. ✅ **Home, Sobre, Unidades, Contato** — as quatro rotas implementadas, com conteúdo real de estrutura e os dados pendentes marcados acima.
5. ✅ **Testes** — 5 suítes cobrindo schema, tema, sanitização, `cn()` e `Button`.
6. ⬜ **Refino:** substituir os dados pendentes, plugar o endpoint do formulário, avaliar `vite-ssg`, revisar contraste em ambos os temas com ferramenta de acessibilidade, gerar `yarn.lock`.

> **Verificação ainda não executada.** O código deste repositório **não foi rodado** — a máquina onde ele foi gerado não tinha Node instalado, então `yarn install`, `yarn lint`, `yarn test` e `yarn build` nunca executaram. O que foi verificado estaticamente: todos os `import` resolvem para arquivos existentes ou pacotes declarados no `package.json` (63 arquivos), nenhum componente é usado sem import, todos os assets de `@theme/imgs/` existem, e nenhuma regra de desacoplamento da seção 4 é violada. **Rode os três comandos antes do primeiro commit** — o pre-commit vai exigir isso de qualquer forma. Se `yarn lint` reclamar de regra desconhecida em `@typescript-eslint/naming-convention`, o `@antfu/eslint-config` da sua versão renomeou o namespace: troque por `ts/naming-convention`.

> Ao pedir cada etapa: "siga as instruções do projeto: estrutura e convenções da seção correspondente, regras de desacoplamento (seção 4), tokens/tema dark-light (seção 7), formulários com Zod (seção 8), SEO (seção 9) e Clarity (seção 10)."
