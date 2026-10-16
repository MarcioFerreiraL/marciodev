---
title: "Assistência Técnica"
summary: "Gestão de ordens de serviço com API Spring Boot, máquina de estados (State), Template Method e front-end em Vue.js."
tags: ["Spring Boot", "Vue.js", "PostgreSQL", "Padrões GoF"]
order: 3
status: "destaque"
cover: "../../assets/projetos/assistencia-tecnica/cover.webp"
repo: "https://github.com/MarcioFerreiraL/sistema-assistencia-tecnica"
context: "Disciplina de Programação III (padrões de projeto) · UPE"
gallery:
  - src: "../../assets/projetos/assistencia-tecnica/tecnico.webp"
    alt: "Área técnica: fila de ordens de serviço disponíveis e reparos em andamento com laudo"
  - src: "../../assets/projetos/assistencia-tecnica/atendente.webp"
    alt: "Painel de atendimento com cadastro de clientes e últimas solicitações por status"
  - src: "../../assets/projetos/assistencia-tecnica/cliente.webp"
    alt: "Área do cliente com a solicitação aberta e opção de cancelar"
  - src: "../../assets/projetos/assistencia-tecnica/login.webp"
    alt: "Tela de acesso por tipo de usuário e CPF"
---

## Contexto

Sistema para gerenciar uma assistência técnica de equipamentos eletrônicos, com uma API REST em Spring Boot e uma interface em Vue.js. O foco do projeto foi aplicar padrões de projeto clássicos (GoF) num domínio com regras de fluxo bem definidas.

## Problema

Uma ordem de serviço (OS) passa por várias etapas: abertura, diagnóstico, orçamento, aprovação do cliente, reparo e entrega. Sem controle, é fácil pular etapas, como finalizar uma OS cujo orçamento não foi aprovado, ou executar reparos sem seguir os passos obrigatórios de diagnóstico e teste.

## Solução

O sistema cobre o ciclo de vida da OS para quatro perfis:

- **Atendente:** cadastra clientes (com validação de CPF e idade), abre OS e consulta status.
- **Técnico:** vê a fila de OS abertas, assume uma OS, registra orçamento, executa o reparo e finaliza.
- **Cliente:** vê o histórico de equipamentos, aprova ou recusa orçamentos e cancela solicitações.
- **Administrador:** acessa relatórios (financeiro, estoque e OS) e exclui registros.

## Arquitetura

- **State:** cada status da OS (`ABERTA`, `AGUARDANDO_ORCAMENTO`, `AGUARDANDO_APROVACAO`, `EM_REPARO`, `FINALIZADA`, `CANCELADA`) é uma classe que implementa `StateInterface` e só permite as transições válidas.
- **Template Method:** a classe abstrata `TemplateMethod` define o roteiro de reparo com um método `final`, garantindo diagnóstico e testes; `ReparoNotebook`, `ReparoCelular`, `ReparoComputador` e `ReparoOutros` mudam só a etapa específica de cada equipamento.
- **Singleton:** `DatabaseConnector` mantém uma instância única de conexão, implementado para fins didáticos ao lado do Spring Data JPA.
- Back-end em Java 21, Spring Boot 3.5 e Spring Data JPA, com PostgreSQL e H2 em memória para testes.
- Front-end em Vue.js 3 (Composition API), Vite, Vue Router e Axios, com CSS próprio baseado em variáveis.

## Infra e deploy

Este projeto não tem deploy público. Ele roda localmente: a API sobe com `./mvnw spring-boot:run` na porta 8080 e o front-end é gerado com o Vite e servido com `npm run preview`. O banco pode ser PostgreSQL, configurado no `application.properties`, ou H2 em memória.

## Minha contribuição

- Construí a API REST em Spring Boot, com os endpoints de clientes e de OS (abrir, assumir, orçar, aprovar e executar).
- Implementei a máquina de estados da OS com o padrão State e o roteiro de reparo com Template Method.
- Desenvolvi o front-end em Vue.js 3 integrado à API com Axios.
- Mapeei os casos de uso dos quatro perfis de usuário.

## Desafios e aprendizados

O desafio foi modelar o fluxo da OS de forma que uma transição inválida fosse impossível no código, e não só barrada por um `if` espalhado pelos services. Com o padrão State, cada estado sabe para onde pode ir, e adicionar um novo status não exige mexer nos outros. O Template Method mostrou como fixar os passos obrigatórios de um processo e deixar variar só o que é específico de cada tipo de equipamento.
