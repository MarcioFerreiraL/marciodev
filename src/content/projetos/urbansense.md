---
title: "UrbanSense"
summary: "App Android para óculos Meta que fotografa a rua e detecta lixo e buracos com YOLO numa API remota. Projeto de equipe."
tags: ["Kotlin", "Android", "YOLO", "FastAPI"]
order: 4
status: "destaque"
cover: "../../assets/projetos/urbansense/cover.webp"
context: "Projeto em equipe · óculos inteligentes Meta Ray-Ban"
repo: "https://github.com/MarcioFerreiraL/urbansense-app"
team: ["Márcio Ferreira Lima", "Carlos Henrique", "Gabriel Lopes"]
gallery:
  - src: "../../assets/projetos/urbansense/painel.webp"
    alt: "Painel do UrbanSense com detecção de movimento, captura automática periódica e botão para registrar ocorrência"
  - src: "../../assets/projetos/urbansense/configuracoes.webp"
    alt: "Configurações do UrbanSense: intervalo de captura, voz nos óculos Meta Ray-Ban e simulador de óculos"
---

## Contexto

Projeto de equipe para os óculos inteligentes Meta Ray-Ban. O app partiu de um fork do Meta Wearables Device Access Toolkit para Android (`facebook/meta-wearables-dat-android`), adaptando o exemplo de acesso à câmera para o UrbanSense.

## Problema

Descarte irregular de lixo e buracos em vias públicas dependem de alguém parar, fotografar e relatar a ocorrência. A ideia foi usar os óculos para registrar isso enquanto a pessoa anda pela rua, sem precisar tirar o celular do bolso.

## Solução

O app recebe o vídeo da câmera dos óculos, captura uma imagem, anexa a localização e envia para uma API de detecção. A API responde se encontrou lixo e/ou buraco, com a lista de detecções, e o app mostra as caixas delimitadoras sobre a foto e as ocorrências num mapa.

## Arquitetura

- **Cliente leve (thin client):** nenhuma visão computacional roda no celular; o app só coleta imagem e coordenadas e envia por `multipart/form-data`.
- **App Android em Kotlin**, usando o SDK de wearables da Meta para conectar aos óculos e receber o streaming de vídeo.
- **API em FastAPI** com um modelo YOLO11 treinado para duas classes (`Trash` e `pothole`), carregado uma vez em memória e exposto em `POST /predict`.
- Mapa de ocorrências com OpenStreetMap (osmdroid).

## Infra e deploy

A API de detecção roda numa VPS, e o repositório traz `Dockerfile` e Docker Compose para ela (Python 3.12 com as dependências do OpenCV). O app aponta para o endpoint `/predict` da VPS. As versões do app foram distribuídas como APK para instalar direto no celular.

## Minha contribuição

- Implementei a captura instantânea de frame do vídeo dos óculos com `PixelCopy`, sem travar o streaming.
- Integrei o app à API de detecção YOLO na VPS, corrigindo a rota para `/predict`, e desenhei as caixas e etiquetas de lixo e buracos sobre a imagem.
- Criei o visualizador de foto em tela cheia e a centralização inicial do mapa nas ocorrências.
- Gerei e publiquei as versões de APK para testes da equipe.

## Desafios e aprendizados

Capturar uma foto a partir do streaming sem congelar o vídeo foi o principal desafio: copiar o frame direto da superfície de vídeo com `PixelCopy` resolveu sem interromper a transmissão. O SDK da Meta ainda está em developer preview, então o ponto de partida foi o app de exemplo do próprio toolkit. Integrar o app a um modelo de visão computacional servido remotamente deixou claro o valor de manter o celular leve e concentrar o processamento no servidor, e também a importância de validar a rota e o formato da resposta da API antes de gerar cada APK.
