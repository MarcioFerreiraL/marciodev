export const site = {
  name: "Márcio Ferreira Lima",
  url: "https://marciodev.com",
  email: "contactmarcioflima@gmail.com",
  github: "https://github.com/MarcioFerreiraL",
  linkedin: "https://www.linkedin.com/in/marcioflima/",
  doi: "https://doi.org/10.55034/smrv6n2-005",
  // Ligue quando public/curriculo-pt.pdf e public/curriculo-en.pdf forem os currículos de verdade.
  cvReady: true,
} as const;

export const t = {
  nav: { projetos: "Projetos", sobre: "Sobre", contato: "Contato", skip: "Pular para o conteúdo" },
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
  contact: {
    title: "Contato",
    text: "Estou buscando estágio ou primeira vaga em Backend, DevOps ou Infraestrutura. Se quiser conversar, me escreva.",
  },
} as const;
