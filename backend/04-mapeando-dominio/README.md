# Sistema de Gerenciamento de Estoque - Domain-Driven Design (DDD)

Este é um sistema de gerenciamento de estoque desenvolvido com base nos princípios do Domain-Driven Design (DDD). O objetivo deste documento é fornecer uma visão geral do domínio, as principais entidades, os casos de uso e os componentes do sistema.

## DDD (Domain-Driven Design)
O DDD é uma abordagem para o desenvolvimento de software que coloca o foco na criação de modelos de domínio ricos e precisos, utilizando uma **linguagem ubíqua** que todos os membros da equipe entendem. A comunicação entre desenvolvedores, designers e especialistas de domínio deve ser clara, utilizando o mesmo vocabulário.

## Domínio
O domínio central deste sistema é **Gerenciamento de Estoque**, com a principal responsabilidade de rastrear os produtos no estoque, garantir que os produtos tenham quantidades mínimas estabelecidas, gerenciar pedidos de compra e fornecer visibilidade histórica sobre vendas e tendências de estoque.

### Domain Experts
- **Gestor de Estoque**: Responsável por definir regras e operações relacionadas ao estoque de produtos.
- **Fornecedor**: Responsável por fornecer os produtos para o estoque.
- **Atendente**: Usuário que gerencia as operações de vendas e movimentação de produtos.

## Conversa
Durante a interação entre desenvolvedores e Domain Experts, foram levantados os seguintes requisitos para o sistema:

- **Rastreamento de Produtos**: Atribuição de números de identificação únicos aos produtos.
- **Quantidades Mínimas de Estoque**: Definir e monitorar as quantidades mínimas de produtos e alertas.
- **Histórico de Vendas e Estoque**: Analisar o histórico de vendas e tendências para melhorar as decisões de compra.
- **Pedidos de Compra Automáticos**: Gerar ordens de compra com base em regras de estoque mínimo e tendências de vendas.

## Linguagem Ubíqua
A comunicação deve ser feita utilizando os seguintes termos, que possuem significados específicos dentro do contexto do sistema:

- **Produto**: Itens armazenados no estoque, cada um com um identificador único.
- **Estoque**: Quantidade de produtos disponíveis no sistema.
- **Pedido de Compra**: Solicitação de compra de produtos feita ao fornecedor.
- **Alerta de Estoque**: Notificação enviada quando o estoque de um produto atinge o limite mínimo.

## Usuários e Papéis
O sistema tem os seguintes papéis de usuários:

- **Client**: Usuário que realiza compras ou visualiza o estoque.
- **Fornecedor**: Fornece os produtos e envia atualizações sobre os prazos de entrega.
- **Atendente**: Usuário que gerencia as vendas, o estoque e os alertas.

## Agregados
Agregados são objetos do sistema que garantem a consistência de seu estado. No contexto do nosso sistema, temos:

- **Produto**: Agregado que contém informações sobre um produto, como identificador único, quantidade e características (cor, tamanho).
- **Estoque**: Agregado que gerencia a quantidade de produtos e controla os alertas.

## Value Objects
- **Identificador de Produto**: Um valor imutável e único para identificar um produto.
- **Quantidade**: Um valor imutável que representa a quantidade de um produto no estoque.
- **Data de Vencimento**: Um valor imutável que representa a data em que um produto expira.

## Eventos de Domínio
- **ProdutoAdicionado**: Evento que ocorre quando um novo produto é adicionado ao estoque.
- **EstoqueAbaixoDoLimite**: Evento que ocorre quando a quantidade de um produto atinge o estoque mínimo.
- **VendaRealizada**: Evento que é disparado após a realização de uma venda.

## Subdomínios (Bounded Contexts)
- **Gestão de Estoque**: Responsável por gerenciar os produtos, quantidades e alertas.
- **Gestão de Compras**: Responsável por gerenciar pedidos de compra e interações com fornecedores.
- **Análise de Vendas**: Responsável por analisar o histórico de vendas e definir as melhores práticas de compra com base em dados históricos.

## Entidades
- **Produto**: Representa os itens no estoque, identificados por um número único. Pode ter atributos como nome, preço, categoria, etc.
- **Pedido de Compra**: Representa uma solicitação de reposição de estoque. Contém informações sobre os produtos e quantidades solicitadas.
- **Alerta de Estoque**: Representa uma notificação que é disparada quando o estoque de um produto atinge o limite mínimo.

## Casos de Uso
Os principais casos de uso do sistema são:

1. **Adicionar Produto**: Permite adicionar um novo produto ao estoque.
2. **Visualizar Estoque**: Permite visualizar a quantidade disponível de um produto no estoque.
3. **Definir Quantidade Mínima de Estoque**: Permite definir o limite mínimo de estoque para um produto.
4. **Gerar Alerta de Estoque Abaixo do Limite**: Dispara um alerta quando a quantidade de um produto atinge o limite mínimo.
5. **Visualizar Histórico de Vendas e Estoque**: Permite visualizar as vendas e o status de estoque ao longo do tempo.
6. **Gerar Pedido de Compra**: Gera automaticamente um pedido de compra com base no limite mínimo de estoque e nas tendências de vendas.
7. **Integrar com Fornecedor**: Permite enviar pedidos de compra para fornecedores e receber atualizações de entrega.

## Conclusão
Este sistema visa melhorar a eficiência no gerenciamento de estoque, facilitando o rastreamento dos produtos, garantindo que os estoques sejam mantidos dentro de limites adequados e ajudando a tomar decisões mais informadas com base no histórico de vendas.

