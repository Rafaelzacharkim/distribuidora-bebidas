# Distribuidora de Bebidas API

Esta é uma API RESTful para gerenciamento de uma distribuidora de bebidas. Ela permite gerenciar bebidas, fornecedores, estoque, clientes, vendas e carrinho de compras.

## Funcionalidades

- Gerenciamento de bebidas (criar, listar, buscar, atualizar, deletar)
- Gerenciamento de fornecedores (criar, listar, buscar, atualizar, deletar)
- Gerenciamento de estoque (criar, listar, buscar, atualizar, deletar)
- Gerenciamento de clientes (criar, listar, buscar)
- Gerenciamento de vendas (criar, listar, buscar, deletar, atualizar status)
- Gerenciamento de carrinho de compras (adicionar, listar, remover, esvaziar)

## Tecnologias Utilizadas

- Node.js
- Express.js
- UUID para geração de IDs únicos
- Crypto para geração de IDs únicos (em alguns casos)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor estará rodando na porta 3000 por padrão.

## Uso

### Endpoints

#### Bebidas

- **POST /bebidas**: Criar uma nova bebida
- **GET /bebidas**: Listar todas as bebidas
- **GET /bebidas/:id**: Buscar uma bebida por ID
- **PUT /bebidas/:id**: Atualizar uma bebida
- **DELETE /bebidas/:id**: Deletar uma bebida

#### Fornecedores

- **POST /fornecedores**: Criar um novo fornecedor
- **GET /fornecedores**: Listar todos os fornecedores
- **GET /fornecedores/:id**: Buscar um fornecedor por ID
- **PUT /fornecedores/:id**: Atualizar um fornecedor
- **DELETE /fornecedores/:id**: Deletar um fornecedor

#### Estoque

- **POST /estoque**: Criar um novo item de estoque
- **GET /estoque**: Listar todos os itens de estoque
- **GET /estoque/:id**: Buscar um item de estoque por ID
- **PUT /estoque/:id**: Atualizar um item de estoque
- **DELETE /estoque/:id**: Deletar um item de estoque

#### Clientes

- **POST /clientes**: Criar um novo cliente
- **GET /clientes**: Listar todos os clientes
- **GET /clientes/:id**: Buscar um cliente por ID

#### Vendas

- **POST /vendas**: Criar uma nova venda
- **GET /vendas**: Listar todas as vendas
- **GET /vendas/:id**: Buscar uma venda por ID
- **DELETE /vendas/:id**: Deletar uma venda
- **PATCH /vendas/:id/status**: Atualizar o status de uma venda

#### Carrinho

- **POST /carrinho**: Adicionar uma bebida ao carrinho
- **GET /carrinho**: Listar o carrinho
- **DELETE /carrinho/:id**: Remover um item do carrinho
- **DELETE /carrinho**: Esvaziar o carrinho

### Exemplos de Requisições

#### Criar uma Bebida

```bash
curl -X POST http://localhost:3000/bebidas -H "Content-Type: application/json" -d '{
  "nome": "Guaraná",
  "marca": "Antarctica",
  "volume": "350ml",
  "valor": 5.0,
  "idFornecedor": "id-do-fornecedor"
}'
```

#### Listar Bebidas

```bash
curl -X GET http://localhost:3000/bebidas
```

#### Criar uma Venda

```bash
curl -X POST http://localhost:3000/vendas -H "Content-Type: application/json" -d '{
  "clienteId": "id-do-cliente",
  "itens": [
    {
      "bebidaId": "id-da-bebida",
      "quantidade": 3
    }
  ]
}'
```

## BPMN
![New BPMN diagram](https://github.com/user-attachments/assets/3fac9466-40bf-4e78-b7ed-6ddaa118b79b)


## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
