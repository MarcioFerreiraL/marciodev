# marciodev.com — especificação (entendimento confirmado em 16/10/2026)

## Objetivo e público
- Conseguir estágio ou primeira vaga em **Backend · DevOps · Infraestrutura** (áreas de interesse, não título).
- Público: recrutadores e tech leads, comunidade dev; em segundo plano, comércios de Surubim (fase 2).
- Sem blog. Nunca usar "full-stack".

## Identidade
- Nome: **Márcio Ferreira Lima**.
- Linha de apresentação: "Técnico de Informática e estudante de Engenharia de Software (5º período) na UPE · Surubim, PE".
- Áreas de interesse: Backend · DevOps · Infraestrutura.
- Tom: primeira pessoa, direto e técnico ("Construí a API em Spring Boot…").
- Foto: recortada (cabeça e ombros), fundo removido localmente e trocado por cor lisa do tema; aprovada pelo Márcio antes de publicar.

## Visual
- Paleta harmônica (complementar + análogo), dentro de cada tema:
  - roxo **260°** — cor principal (botões, "Ver detalhes", destaques)
  - azul **220°** — links e anel de foco
  - marrom **40°** — tags e bordas (alternativa 32° a avaliar lado a lado)
  - neutros (fundo, superfícies, texto) tingidos a 40°
- Temas escuro (café) e claro (papel) **espelhados**: mesmos ângulos e papéis, luminosidade invertida. Padrão = preferência do sistema; botão de troca.
- Valores iniciais (contraste mínimo medido 5,4:1):
  - Escuro: fundo `#15130F`, superfície `#201D18`, tag `#2F291E`, borda `#3A352C`, texto `#EEEAE2`, secundário `#B1ABA0`, roxo `#B797F7`, azul `#7BA3F4`, marrom `#CAAD72`, texto sobre roxo `#211736`.
  - Claro: fundo `#F9F6F1`, superfície `#F1EDE4`, tag `#E8DFCF`, borda `#DBD4C7`, texto `#1E1B15`, secundário `#655F53`, roxo `#6231C4`, azul `#194CB3`, marrom `#6B5324`, texto sobre roxo `#FFFFFF`.
- Fontes: Space Grotesk (títulos), Inter (texto), JetBrains Mono (tags, detalhes de terminal). Auto-hospedadas.
- Sem verde.

## Mapa do site
| Rota | Conteúdo |
|---|---|
| `/` | Topo (nome, linha, interesses, foto, "Baixar currículo" PT/EN, GitHub, LinkedIn); Sobre (bio, menção à Márcio Tec, publicação com DOI); destaques; link "ver todos os projetos"; contato |
| `/projetos` | Destaques + "Outros projetos" puxados do GitHub |
| `/projetos/<nome>` | Case study |
| `/servicos` | Fase 2 (plano separado) |
| `/curriculo-pt.pdf`, `/curriculo-en.pdf` | Downloads (plano separado gera os PDFs) |
| 404 | No tema do site |

## Projetos
- Destaques, nesta ordem: **Clinics**, **Sistema Barbearia**, **Assistência Técnica**, **UrbanSense**; depois o card **Observatório UPE**.
- Card: imagem, nome, uma frase, 3–4 tags, "Ver detalhes →".
- Case study: contexto (disciplina/equipe), problema, solução, arquitetura (diagrama), infra e deploy, minha contribuição, desafios e aprendizados, galeria de prints, links (repo/demo), créditos.
- Clinics: demo `https://clinics.marciodev.com` (no ar); equipe Márcio Ferreira Lima e Lucas Nascimento Barros.
- UrbanSense: projeto de equipe para os óculos Meta; colegas citados só pelo nome: Carlos Henrique e Gabriel Lopes; contribuição do Márcio: captura de frame via PixelCopy, visualizador em tela cheia, mapa de ocorrências, integração com a API YOLO na VPS, releases de APK.
- Observatório UPE: card "em construção", sem link e sem stack. Texto: "Centralizando dados dos departamentos da Universidade de Pernambuco." / "Projeto da PROPEGI · mais detalhes em breve". Visual bloqueado (borda tracejada, cadeado).
- Outros projetos: repositórios públicos de MarcioFerreiraL via API do GitHub a cada build, ocultando: python, php, javascript, html-css, programacao-I, programacao-II, programacao-III, perfil-web, projeto-vue-js, diario_bot, MarcioFerreiraL, e os repos já em destaque.

## Contato
- Site: `contactmarcioflima@gmail.com`, GitHub `MarcioFerreiraL`, LinkedIn `marcioflima`.
- WhatsApp só em `/servicos`. E-mail da UPE fora do site. Sem Instagram. Sem formulário.

## Técnica
- Astro + Tailwind, HTML estático; repositório público `MarcioFerreiraL/marciodev`.
- Cloudflare Pages, domínio `marciodev.com` (www redireciona), Cloudflare Web Analytics.
- Adicionar projeto = um arquivo Markdown em `src/content/projetos/` + imagens; push publica.
- Critérios de pronto no CI: Lighthouse ≥ 95 (performance e acessibilidade, celular), WCAG AA, teclado, `prefers-reduced-motion`, layout 360–1440 px sem rolagem horizontal, SEO (título/descrição por página, Open Graph por projeto, sitemap, JSON-LD Person).

## Fora deste plano (planos próprios)
- Currículo LaTeX PT (com foto) e EN (sem foto), até 2 páginas, chamativo, texto selecionável; `.tex` não vai para o site.
- Limpeza dos repositórios (descrições, fixados, prints, `bin/`/`.class`, APKs → Releases, README do perfil) — cada mudança aprovada antes do commit.
- `/servicos` com 8 soluções: site para o negócio; cardápio/catálogo com pedido no WhatsApp; agendamento online; estoque e vendas; ordens de serviço e orçamentos; automações; painéis de dados; hospedagem e manutenção mensal. Sem preço, sem Maps.
