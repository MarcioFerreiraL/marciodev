---
title: "Sistema Barbearia"
summary: "Agendamento online para barbearia: API Spring Boot com JWT e RBAC, front em Next.js e deploy com Docker, GHCR e GitHub Actions."
tags: ["Spring Boot", "Next.js", "Docker", "GitHub Actions"]
order: 2
status: "destaque"
cover: "../../assets/projetos/barbearia/cover.webp"
repo: "https://github.com/MarcioFerreiraL/sistema-barbearia"
demo: "https://sistema-barbearia-black.vercel.app"
context: "Disciplina de Programação para Dispositivos Móveis · UPE"
gallery:
  - src: "../../assets/projetos/barbearia/desktop.webp"
    alt: "Página inicial da Barbearia do Zé no computador"
  - src: "../../assets/projetos/barbearia/mobile.webp"
    alt: "Página inicial da Barbearia do Zé no celular"
---

## Contexto

A Barbearia do Zé é um sistema web de gestão e agendamento para uma barbearia. O projeto fica num monorepo com o back-end, o front-end e a documentação técnica (arquitetura, referência da API, esquema do banco e diagramas UML de casos de uso e de classes), partindo de um protótipo de baixa fidelidade no Figma.

## Problema

Reservas feitas por mensagem ou telefone geram sobreposição de horários e falhas de comunicação entre clientes e barbeiros. A equipe também não tinha um painel para acompanhar a agenda do dia.

## Solução

- Vitrine com o catálogo de serviços, preços e duração estimada.
- Agendamento em etapa única: o cliente escolhe serviço, profissional e horário entre os disponíveis.
- Painel do cliente com histórico e cancelamento; painel do barbeiro e do administrador com a agenda diária e a troca de status dos atendimentos.
- Três papéis com permissões distintas (`ROLE_ADMIN`, `ROLE_BARBER`, `ROLE_CUSTOMER`).

## Arquitetura

- API REST em Java 21 e Spring Boot 4, em camadas: controllers com DTOs (`record`), services com as regras de negócio e repositories JPA.
- Autenticação stateless com JWT: o `SecurityFilter` do Spring Security valida o token e aplica o controle de acesso por papel; senhas com BCrypt.
- Ao criar um agendamento, o service confere o horário de funcionamento do dia e consulta se já existe atendimento sobreposto para o barbeiro; a tabela de agendamentos tem coluna de versão para bloqueio otimista.
- PostgreSQL 16 com herança `JOINED`: `tb_user` é a tabela base de cliente, barbeiro e administrador.
- Front-end em Next.js 16, React 19, TypeScript e Tailwind CSS 4, com uma camada única de integração com a API.
- Documentação da API gerada com springdoc-openapi e exibida também com Redoc.

## Infra e deploy

- Toda configuração sensível vem de variáveis de ambiente; os arquivos `.env` não são versionados.
- O back-end tem `Dockerfile` multi-stage (Maven para compilar, JRE Alpine para rodar) e um Docker Compose com PostgreSQL e healthcheck.
- Um workflow no GitHub Actions, a cada push na `master`, constrói a imagem, publica no GitHub Container Registry e faz o deploy por SSH na VPS com `docker compose pull` e `up -d`.
- A API rodava numa VPS Oracle Free Tier atrás de nginx com certificado SSL; o front-end segue publicado na Vercel.

## Minha contribuição

- Construí a API em Spring Boot, com autenticação JWT, controle de acesso por papel e a validação de conflito de horários.
- Modelei o banco no PostgreSQL e escrevi a documentação técnica e os diagramas UML.
- Montei a imagem Docker, o Compose e o pipeline de build e deploy com GHCR e GitHub Actions.
- Publiquei o front-end em Next.js na Vercel.

## Desafios e aprendizados

O ponto central foi impedir dois agendamentos no mesmo horário para o mesmo barbeiro, combinando a consulta de sobreposição com bloqueio otimista. Separar o build da imagem (no GitHub Actions) do deploy (na VPS, só puxando a imagem pronta) deixou a VPS mais leve e o deploy repetível. Também aprendi a externalizar toda a configuração em variáveis de ambiente para usar o mesmo código em desenvolvimento e produção.
