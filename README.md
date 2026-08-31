# Site Institucional — Grupo Formar

Site institucional multi-página do Grupo Formar (Editora Formar · Mar Produções Gráficas ·
Carvalho Distribuições). Vue 3 + Vite + TypeScript + Tailwind CSS v4, com dark/light mode,
SEO e Microsoft Clarity.

As instruções completas de arquitetura, convenções e design estão em
[`CLAUDE.md`](./CLAUDE.md) — **esse arquivo é a única referência do projeto.**

---

## Primeiros passos

```bash
yarn install
```

> ⚠️ **O `yarn.lock` ainda não existe.** Rode `yarn install` uma vez e **faça commit do
> `yarn.lock` gerado** — o `Dockerfile` usa `--frozen-lockfile` e falha sem ele.

Copie as variáveis de ambiente:

```bash
cp .env.example .env
```

Suba o servidor de desenvolvimento em `http://localhost:8080`:

```bash
yarn dev
```

## Scripts

| Script | O que faz |
|--------|-----------|
| `yarn dev` | Servidor de desenvolvimento (porta 8080) |
| `yarn build` | Checagem de tipos + build de produção em `dist/` |
| `yarn preview` | Serve o `dist/` localmente |
| `yarn type-check` | Só a checagem de tipos (`vue-tsc`) |
| `yarn test` | Roda os testes uma vez (Vitest) |
| `yarn test:unit` | Testes em modo watch |
| `yarn lint` | ESLint |
| `yarn lint:fix` | ESLint com correção automática |

## Variáveis de ambiente

| Variável | Para que serve |
|----------|----------------|
| `VITE_BASE_URL` | URL base da aplicação |
| `VITE_SITE_URL` | URL pública — usada em canonical, Open Graph e JSON-LD |
| `VITE_THEME_REALM` | Realm do tema (`grupoformar`) |
| `VITE_CLARITY_ID` | ID do Microsoft Clarity. Vazio = analytics desligado |
| `VITE_GOOGLE_ANALYTICS_ID` | Reservado; ainda não consumido pelo código |
| `VITE_CONTACT_API_ROUTE` | Endpoint do formulário de contato |

Nenhuma dessas variáveis guarda segredo — tudo em `VITE_*` vai para o bundle e fica
visível no navegador. Não coloque chaves privadas aqui.

## Publicar

### GitHub

```bash
git init
git add .
git commit -m "Site institucional do Grupo Formar"
git branch -M main
git remote add origin git@github.com:SUA-ORG/site-grupo-formar.git
git push -u origin main
```

O Husky instala o hook de pre-commit no primeiro `yarn install`. Ele roda
`yarn lint && yarn test && yarn build` — qualquer falha bloqueia o commit.

### Docker + nginx

```bash
docker build -t grupoformar-site .
docker run -p 8080:80 grupoformar-site
```

O nginx já vem com gzip e fallback de SPA (`try_files … /index.html`), necessário porque
o router usa `createWebHistory` (URLs sem hash).

### Hospedagem estática (Vercel, Netlify, Cloudflare Pages)

Build `yarn build`, diretório de saída `dist`. Configure o *rewrite* de todas as rotas
para `/index.html`, senão `/sobre` dá 404 no refresh.

---

## Pendências antes de ir ao ar

Estes pontos foram preenchidos com valores de trabalho e precisam ser confirmados:

- **Dados de contato** (`theme/grupoformar/config.ts`) — e-mail, telefone e WhatsApp.
- **Sites das três marcas** (`theme/grupoformar/config.ts`, `brands`) — hoje apontam para
  caminhos presumidos em `grupoformar.com.br`; os links do rodapé dependem deles.
- **Indicadores e specs** (`src/domain/theme/content.ts`) — "25 anos", "+2.000 títulos",
  formato de folha, número de cores, marcos da linha do tempo.
- **Endpoint do formulário** (`VITE_CONTACT_API_ROUTE`) — sem ele o envio sempre falha.
- **Domínio** — `robots.txt`, `sitemap.xml` e `.env.production` assumem
  `https://www.grupoformar.com.br`.
