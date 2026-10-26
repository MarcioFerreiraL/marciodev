# marciodev.com

Site pessoal de Márcio Ferreira Lima: portfólio de projetos e currículo.

Feito com [Astro](https://astro.build) e Tailwind CSS, gerado como HTML estático e publicado na Cloudflare (Workers com arquivos estáticos).

## Rodar localmente

```bash
nvm use        # Node 22
npm install
npm run dev    # http://localhost:4321
```

## Testes

```bash
npm test           # unitários (Vitest)
npm run build && npm run test:e2e   # navegador (Playwright) contra dist/ na porta 4322
npm run test:e2e:fixtures           # build com projeto fictício longo (dist-fixtures/, porta 4323)
npm run lighthouse                    # Lighthouse celular em dist/ (≥ 0.95); sem Chrome no sistema, use CHROME_PATH
```

O CI (`.github/workflows/ci.yml`) roda tudo isso em cada push e pull request.

## Como adicionar um projeto

1. Crie `src/content/projetos/<slug>.md` (o nome do arquivo vira a URL `/projetos/<slug>`).
2. Coloque a capa em `src/assets/projetos/<slug>/cover.webp` (1200x630). Ela é a imagem de compartilhamento (og:image) e aparece no card enquanto o projeto não tiver banner ilustrado.
   - Opcional: crie o banner 2D em `src/components/banners/<Nome>.astro` (usando `Frame.astro`) e registre o slug em `src/components/banners/index.ts`.
   - Prints vão em `gallery` no frontmatter e aparecem só na página do projeto.
3. Preencha o frontmatter (schema em `src/lib/projects.ts`) e escreva o corpo com as seções `## Contexto`, `## Problema`, `## Solução`, `## Arquitetura`, `## Infra e deploy`, `## Minha contribuição` e `## Desafios e aprendizados`.
4. Rode `npm test && npm run build` e faça o push: o deploy publica sozinho.

Frontmatter mínimo de um destaque:

```yaml
---
title: "Nome do projeto"
summary: "Uma frase de até 140 caracteres."
tags: ["Spring Boot", "Docker"] # 1 a 4
order: 5
status: "destaque"               # ou "em-construcao" (card sem página, capa opcional)
cover: "../../assets/projetos/<slug>/cover.webp"
---
```

Campos opcionais: `context`, `repo`, `demo`, `team` e `gallery` (lista de `{ src, alt }`).

## Deploy

O site é um Worker da Cloudflare só com arquivos estáticos (`wrangler.jsonc` aponta para `dist/`). O Workers Builds, ligado a este repositório, roda `npm run build` e `npx wrangler deploy` a cada push na `main`; pushes em outras branches geram só uma versão de prévia. O build lê a variável secreta `GITHUB_TOKEN` para listar os repositórios em "Outros projetos" e, sem ela, usa `src/data/repos-fallback.json`.

Se o build automático falhar, dá para publicar da própria máquina:

```bash
npm run build && npx wrangler deploy   # pede login na Cloudflare na primeira vez
```

O CI do GitHub Actions (`.github/workflows/ci.yml`) não publica: ele só roda os testes, o Lighthouse e o build.
