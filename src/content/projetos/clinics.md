---
title: "Clinics"
summary: "API em Spring Boot que compara preços de exames em Surubim-PE, com CI/CD, Docker e deploy em VPS atrás de Cloudflare Tunnel."
tags: ["Spring Boot", "PostgreSQL", "Docker", "CI/CD"]
order: 1
status: "destaque"
cover: "../../assets/projetos/clinics/cover.webp"
context: "Disciplina de Programação para Dispositivos Móveis · UPE"
repo: "https://github.com/MarcioFerreiraL/clinics-backend"
demo: "https://clinics.marciodev.com"
team: ["Márcio Ferreira Lima", "Lucas Nascimento Barros"]
---

## Contexto

Projeto em dupla da disciplina de Programação para Dispositivos Móveis da UPE. O sistema tem dois repositórios: o back-end em Spring Boot (`clinics-backend`) e o aplicativo em Flutter (`clinics-mobile`), que roda no Android e como PWA instalável no iPhone.

## Problema

Em Surubim-PE, descobrir quanto cada clínica cobra por um exame exige ligar ou ir de uma em uma. Não existe um lugar que reúna preços, preparo e horários para o paciente comparar antes de decidir.

## Solução

O Clinics reúne os preços dos exames e consultas, compara as clínicas lado a lado (média local, economia, distância e nota) e abre a conversa no WhatsApp da clínica com a mensagem pronta. O app não agenda nem cobra: ele aproxima o paciente da clínica. A API cobre 12 casos de uso do paciente, como cadastro, busca e comparação, favoritos, avaliações e histórico de economia, sobre 9 tabelas no PostgreSQL.

## Arquitetura

- Arquitetura hexagonal (portas e adaptadores), organizada por funcionalidade em três módulos: `identity`, `catalog` e `engagement`.
- O domínio não depende de Spring, JPA nem HTTP; um teste com ArchUnit quebra o build se essa regra for violada.
- Escrita com Spring Data JPA e consultas de leitura com `JdbcClient` e SQL nativo; migrações versionadas com Flyway.
- Autenticação com Spring Security, JWT (OAuth2 Resource Server) e BCrypt; erros no formato RFC 9457 e contrato publicado com springdoc-openapi.
- Testes com JUnit 5, MockMvc e Testcontainers, usando PostgreSQL real.

## Infra e deploy

- `Dockerfile` em duas etapas: compila com JDK 25 e roda só com o JRE.
- Pipeline no GitHub Actions: a cada push roda `./mvnw verify` e confere se a imagem compila; no push na `develop`, gera o app web em Flutter, embute na imagem e faz o deploy por SSH numa VPS com `docker compose`.
- A API escuta só em `127.0.0.1` na VPS e é exposta com HTTPS pelo Cloudflare Tunnel, sem porta aberta para a internet. O banco e as fotos de perfil ficam em volumes Docker.
- O mesmo domínio serve a página de download (APK e PWA), o app web em `/app/` e a documentação da API em `/docs`.
- Testes de carga com k6 (smoke, load, stress, spike, soak): em produção, a busca ficou com p95 de 227 ms, abaixo da meta de 300 ms.

## Minha contribuição

- Construí a API em Spring Boot com a arquitetura hexagonal, as migrações e os testes de integração com Testcontainers.
- Montei a imagem Docker, os arquivos do Compose de desenvolvimento e produção e o pipeline de CI/CD no GitHub Actions.
- Fiz o deploy na VPS, configurei o Cloudflare Tunnel e o firewall só com SSH, e escrevi o smoke test pós-deploy.
- Escrevi e rodei os testes de carga com k6 e documentei os resultados.

## Desafios e aprendizados

O Docker ignora o `ufw` ao publicar portas, então publicar `8080:8080` deixaria a API exposta mesmo com o firewall ativo; ligar a porta em `127.0.0.1` e usar o túnel resolveu. A VPS tem pouca memória para compilar, por isso a imagem é construída fora dela e enviada pronta. Também precisei diagnosticar uma queda do domínio causada por um token do túnel rejeitado, com a API e a VPS funcionando normalmente. Aprendi a tratar testes, deploy e observação de desempenho como parte do projeto, não como etapa final.
