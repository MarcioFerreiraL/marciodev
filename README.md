# marciodev.com

Site pessoal de Márcio Ferreira Lima: portfólio de projetos e currículo.

Feito com [Astro](https://astro.build) e Tailwind CSS, gerado como HTML estático e publicado no Cloudflare Pages.

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
npx lhci autorun                    # Lighthouse celular em dist/ (≥ 0.95); sem Chrome no sistema, use CHROME_PATH
```

O CI (`.github/workflows/ci.yml`) roda tudo isso em cada push e pull request.

## Como adicionar um projeto

1. Crie `src/content/projetos/<slug>.md` (o nome do arquivo vira a URL `/projetos/<slug>`).
2. Coloque a capa em `src/assets/projetos/<slug>/cover.webp` (1200x630).
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

_Em construção._
