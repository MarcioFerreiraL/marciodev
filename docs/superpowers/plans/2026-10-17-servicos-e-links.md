# /servicos e /links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Página `/servicos` para donos de negócio que chegam pelo celular e página `/links` para a bio do Instagram, com contato pelo WhatsApp.

**Architecture:** Conteúdo em `src/i18n/pt.ts` (`servicos`, `links`); `src/lib/whatsapp.ts` monta links `wa.me` com mensagem pronta; páginas Astro estáticas reutilizando `Base.astro` (que ganha `chrome={false}` para esconder cabeçalho e rodapé em `/links`).

**Tech Stack:** o do site (Astro 7, Tailwind 4, Vitest, Playwright, axe, Lighthouse CI).

**Spec:** aprovado na conversa de 2026-10-17 (resumo abaixo em Global Constraints).

## Global Constraints

- Linguagem de dono de negócio: nada de "API", "Spring", "full-stack"; nenhum preço ("R$") nem mapa.
- O WhatsApp é só canal de contato: nenhuma solução promete integração/bot de WhatsApp. Exceção aprovada: o catálogo tem botão "Pedir pelo WhatsApp" (link `wa.me` com mensagem pronta).
- Número: `5581999069172`. Mensagem do Márcio: "Olá, Márcio! Vim pelo seu site e quero uma solução para o meu negócio." Na `/links`: "Olá, Márcio! Vim pelo Instagram e quero uma solução para o meu negócio."
- Instagram profissional ainda não existe: `site.instagram = null` esconde o botão.
- Márcio Tec só citada (já está no Sobre); não aparece em `/servicos`.
- Celular primeiro; botão de WhatsApp fixo no rodapé da tela em `/servicos` sem cobrir conteúdo; Lighthouse ≥ 0.95; axe sem violações sérias; sem rolagem horizontal em 360/768/1440 nos dois temas.
- Menu ganha "Serviços"; `/links` fica fora do menu.

## Review Focus

1. Mensagem com acentos e "!" no link `wa.me` → precisa estar codificada (`encodeURIComponent`) e abrir com o texto certo.
2. Botão fixo no rodapé cobrindo o último card ou o rodapé do site em 360 px.
3. Navegador do Instagram (WebView) sem `localStorage` → tema e página funcionando (já coberto pelo teste de tema).
4. `/links` sem o Instagram (null) não deve deixar botão vazio ou link `href="null"`.
5. Leitores de tela: ícones decorativos com `aria-hidden`; botões com texto que diz o destino.

---

### Task 1: `whatsappLink` e conteúdo

**Files:** Create `src/lib/whatsapp.ts`, `tests/unit/whatsapp.test.ts`; Modify `src/i18n/pt.ts`.

- `export function whatsappLink(phone: string, message: string): string` → `https://wa.me/${phone}?text=${encodeURIComponent(message)}`.
- Testes: `"monta wa.me com número e texto codificado"` (acentos, vírgula e "!" → `%C3%A1`… e `!` mantido conforme `encodeURIComponent`); `"rejeita número com caracteres não numéricos"` (lança erro).
- `pt.ts`: `site.whatsapp = "5581999069172"`, `site.instagram = null as string | null`; blocos `t.servicos` (title, description, hero, cta, message, solutions[8] {icon, title, text, example?}, steps[3], closing) e `t.links` (tagline, message, buttons).

### Task 2: `/servicos`

**Files:** Create `src/pages/servicos.astro`, `src/components/ServiceIcon.astro`, `tests/e2e/servicos.spec.ts`; Modify `src/components/Header.astro`, `tests/e2e/routes.ts`, `lighthouserc.json`.

- Testes (`servicos.spec.ts`): h1 com "problema no seu negócio"; 8 itens `[data-solution]`; link principal = `whatsappLink(site.whatsapp, t.servicos.message)`; exemplos linkam `/projetos/barbearia`, `/projetos/assistencia-tecnica`, `/projetos/clinics`; 3 passos; página não contém "R$", "API", "full-stack"; botão fixo `[data-whatsapp-fixo]` visível em 360 px e o último card visível acima dele após rolar até o fim; menu tem link "Serviços".
- `routes.ts` ganha `/servicos` e `/links`; Lighthouse ganha `/servicos.html`.

### Task 3: `/links`

**Files:** Create `src/pages/links.astro`, `tests/e2e/links.spec.ts`; Modify `src/layouts/Base.astro` (prop `chrome?: boolean`, padrão `true`).

- Testes: foto e nome; botões na ordem "Pedir uma solução" (wa.me com a mensagem do Instagram), "Ver serviços" (`/servicos`), "Portfólio" (`/`); sem link do Instagram enquanto `site.instagram` for null e nenhum `href="null"`; sem `header nav`.

### Task 4: Verificação e publicação

- `npm run check && npm test && npm run build && npm run test:e2e && npm run test:e2e:fixtures && npm run lighthouse` verdes; prévia visual ao Márcio em 390 px; merge na `main` e push; conferir no ar `/servicos` e `/links` com 200 e o link do WhatsApp.
