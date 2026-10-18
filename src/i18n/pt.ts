export const site = {
  name: "Márcio Ferreira Lima",
  url: "https://marciodev.com",
  email: "contato@marciodev.com",
  github: "https://github.com/MarcioFerreiraL",
  linkedin: "https://www.linkedin.com/in/marcioflima/",
  doi: "https://doi.org/10.55034/smrv6n2-005",
  whatsapp: "5581999069172",
  // Instagram profissional ainda não existe; com null o botão fica escondido em /links.
  instagram: null as string | null,
  // Ligue quando public/curriculo-pt.pdf e public/curriculo-en.pdf forem os currículos de verdade.
  cvReady: true,
} as const;

export const t = {
  nav: { projetos: "Projetos", servicos: "Serviços", sobre: "Sobre", contato: "Contato", skip: "Pular para o conteúdo" },
  meta: {
    title: "Márcio Ferreira Lima · Backend, DevOps e Infraestrutura",
    description:
      "Técnico de Informática e estudante de Engenharia de Software na UPE. Projetos com Spring Boot, Docker, CI/CD e deploy em VPS.",
  },
  hero: {
    prompt: "~/marciodev $ whoami",
    line: "Técnico de Informática e estudante de Engenharia de Software (5º período) na UPE",
    place: "Surubim, PE",
    interestsLabel: "Áreas de interesse",
    interests: "Backend · DevOps · Infraestrutura",
    cvPt: "Baixar currículo",
    cvEn: "Resume (EN)",
  },
  about: {
    title: "Sobre",
    paragraphs: [
      "Trabalho como técnico de informática na Universidade de Pernambuco, no campus Surubim, e curso Engenharia de Software na mesma universidade. Antes disso, passei por provedores de internet da região, onde aprendi na prática como redes e equipamentos se comportam fora do laboratório.",
      "No desenvolvimento, gosto do que fica atrás da tela: APIs bem testadas, bancos de dados, containers, pipelines de CI/CD e servidores que continuam de pé. Meus projetos mais recentes rodam numa VPS que eu mesmo configuro, com Docker e Cloudflare Tunnel.",
      "No tempo livre, trabalho como autônomo na Márcio Tec, com manutenção de computadores e configuração de redes.",
    ],
    publicationLabel: "Publicação",
    publication:
      "Coautor de “Os impactos da falta do letramento digital na educação pública estadual na cidade de Surubim PE durante a pandemia da COVID-19” (Studies in Multidisciplinary Review, 2025).",
  },
  projects: {
    title: "Projetos em destaque",
    details: "Ver detalhes",
    all: "Ver todos os projetos",
    building: "em construção",
  },
  servicos: {
    title: "Serviços · Márcio Ferreira Lima",
    description:
      "Sites e sistemas sob medida para negócios de Surubim e região: agendamento, estoque, ordens de serviço, catálogo online e mais.",
    prompt: "~/marciodev $ ./servicos",
    hero: "Tem um problema no seu negócio? Me conte e eu proponho uma solução.",
    heroText:
      "Agenda no caderno, estoque que ninguém sabe ao certo, pedido que se perde no meio das conversas. Eu crio sites e sistemas sob medida para organizar o dia a dia do seu negócio.",
    cta: "Conversar no WhatsApp",
    ctaShort: "Pedir uma solução",
    message: "Olá, Márcio! Vim pelo seu site e quero uma solução para o meu negócio.",
    solutionsTitle: "O que eu posso fazer por você",
    exampleLabel: "Veja um exemplo",
    solutions: [
      { icon: "globe", title: "Site para o seu negócio", text: "Seu negócio aparece no Google com os serviços, horários e contato, e passa mais confiança para quem ainda não te conhece." },
      { icon: "menu", title: "Cardápio ou catálogo online", text: "Seu cliente vê produtos e preços pelo celular e, com um toque, te chama no WhatsApp com o pedido já escrito.", example: { label: "Clinics: preços lado a lado", href: "/projetos/clinics" } },
      { icon: "calendar", title: "Agendamento online", text: "Seus clientes marcam horário sozinhos, a qualquer hora, sem conflito de agenda e sem depender de você responder mensagem.", example: { label: "Sistema de barbearia", href: "/projetos/barbearia" } },
      { icon: "box", title: "Controle de estoque e vendas", text: "Saiba o que tem na prateleira, o que vendeu e o que precisa repor, sem planilha bagunçada." },
      { icon: "wrench", title: "Ordens de serviço e orçamentos", text: "Cada equipamento ou serviço com status, orçamento e histórico, do recebimento até a entrega.", example: { label: "Sistema de assistência técnica", href: "/projetos/assistencia-tecnica" } },
      { icon: "bolt", title: "Automação de tarefas repetitivas", text: "Troque planilhas e contas feitas à mão por um sistema que faz o trabalho chato e gera relatórios sozinho." },
      { icon: "chart", title: "Painel com os números do negócio", text: "Vendas, atendimentos e serviços em gráficos simples, para decidir com base no que realmente acontece." },
      { icon: "server", title: "Hospedagem e manutenção", text: "Eu deixo seu site ou sistema no ar, com backup, segurança e atualizações, e você não precisa se preocupar com a parte técnica." },
    ],
    stepsTitle: "Como funciona",
    steps: [
      { title: "Você me conta o problema", text: "Pelo WhatsApp, do seu jeito, sem precisar saber nada de tecnologia." },
      { title: "Eu proponho a solução", text: "Explico o que dá para fazer, o prazo e o orçamento, sem compromisso." },
      { title: "Eu construo e deixo no ar", text: "Você acompanha o andamento e recebe tudo funcionando, com suporte depois da entrega." },
    ],
    closing: "Não achou o que precisa? Me conte mesmo assim: a maioria dos problemas tem solução.",
    fixedCta: "Falar no WhatsApp",
  },
  links: {
    title: "Links · Márcio Ferreira Lima",
    description: "Pedir uma solução para o seu negócio, ver os serviços e o portfólio de Márcio Ferreira Lima.",
    tagline: "Sistemas e sites para negócios de Surubim",
    message: "Olá, Márcio! Vim pelo Instagram e quero uma solução para o meu negócio.",
    whatsapp: "Pedir uma solução",
    servicos: "Ver serviços",
    portfolio: "Portfólio",
    instagram: "Instagram",
  },
  contact: {
    title: "Contato",
    text: "Estou buscando estágio ou primeira vaga em Backend, DevOps ou Infraestrutura. Se quiser conversar, me escreva.",
  },
} as const;
