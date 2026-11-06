---
title: "Lanchonete da Gordinha"
summary: "Site em produção para a lanchonete da minha tia: o cliente monta a encomenda da festa e envia o pedido pronto pelo WhatsApp."
tags: ["Astro", "JavaScript", "CSS", "Cloudflare"]
order: 5
status: "destaque"
cover: "../../assets/projetos/lanchonete-gordinha/cover.webp"
context: "Cliente real · lanchonete da minha tia em Surubim-PE"
demo: "https://lanchonete-gordinha.marciodev.com"
demoLabel: "Ver site"
gallery:
  - src: "../../assets/projetos/lanchonete-gordinha/inicio.webp"
    alt: "Topo do site no celular, com a logo da lanchonete, o título Encomendas para festas e eventos e o início do cardápio"
  - src: "../../assets/projetos/lanchonete-gordinha/itens.webp"
    alt: "Cardápio de salgados fritos com botões de quantidade e o total do pedido fixo no fim da tela"
  - src: "../../assets/projetos/lanchonete-gordinha/pedido.webp"
    alt: "Revisão do pedido com data, entrega, forma de pagamento e a prévia da mensagem que será enviada"
---

## Contexto

Fiz este site para a lanchonete da minha tia, no Sítio Tatus, em Surubim-PE. Ele atende encomendas de salgados, doces e pães para festas e eventos, além do aluguel de mesas e cadeiras. Diferente dos outros projetos daqui, não é trabalho de disciplina nem demonstração: é o site de um negócio de verdade, em produção.

## Problema

Uma encomenda de festa tem muitos itens, quantidades altas e detalhes que precisam estar certos: data, horário, endereço e forma de pagamento. Por mensagem solta, alguém precisa fazer as contas à mão e voltar a perguntar o que faltou.

## Solução

- Cardápio por categoria, pensado para o celular, com botões de quantidade e atalho de +10.
- Total sempre visível enquanto o cliente escolhe, e o pedido em andamento continua salvo se a página for recarregada.
- Formulário de revisão que confere nome, data com pelo menos 24 horas de antecedência e endereço de entrega.
- Prévia da mensagem antes do envio, com os itens, o total e o sinal de 30%. Um link do WhatsApp abre a conversa com o pedido já escrito.
- Mesas e cadeiras entram no pedido com o valor a combinar, sem somar no total.

O site não guarda pedidos nem agenda e não recebe pagamentos. A confirmação continua na conversa com a lanchonete.

## Arquitetura

- Site estático em Astro, com JavaScript puro no navegador e sem back-end.
- `cardapio.js` concentra produtos, preços em centavos e regras do negócio: alterar o cardápio é editar um único arquivo.
- `pedido.js` reúne a lógica sem depender da tela: cálculo do total e do sinal, validação da data e montagem da mensagem.
- CSS próprio com tema claro e escuro, que acompanha a preferência do celular.
- Logo, favicon e imagem de compartilhamento gerados por um script.

## Infra e deploy

- Publicado na Cloudflare, como Worker com arquivos estáticos, em domínio próprio. A configuração está em `wrangler.jsonc`, e o deploy é feito com `npm run deploy`.
- A lógica do pedido tem testes automatizados com o executor de testes do Node, e um roteiro com Playwright percorre o fluxo em tela de celular, nos dois temas.
- O repositório é privado. O resultado pode ser visto no próprio site.

## Minha contribuição

Fiz o projeto sozinho: telas, cardápio, lógica do pedido, testes e publicação.

## Desafios e aprendizados

Aqui o desafio foi escolher o que não construir. Um sistema com login, banco de dados e painel custaria mais para manter e não ajudaria a lanchonete a fechar pedidos, então a solução ficou em um site estático que entrega o pedido pronto no canal que ela e os clientes já usam. A prévia da mensagem trouxe um cuidado de segurança: ela mostra o negrito como no WhatsApp, mas sem interpretar como HTML o que o cliente digita.
