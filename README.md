# E-commerce API

Este documento fornece uma visão geral dos endpoints disponíveis na API de e-commerce.

## Endpoints

### Produtos

### Listar Todos os Produtos

#### Endpoint

```http
GET /api/produtos
```

Retorna uma lista de todos os produtos disponíveis.

#### Parâmetros de Solicitação com Paginação

- `page` - Número da página desejada (padrão é 0).
- `size` - Tamanho da página (padrão é 100).

#### Exemplo de Solicitação com Paginação

```http
GET /api/produtos?page=0&size=10
```

### Consultar Produto por ID

#### Endpoint

```http
GET /api/produtos/{id}
```

Retorna informações sobre um produto específico com base no ID fornecido.

#### Exemplo de Solicitação

```http
GET /api/produtos/8
```

### Consultar Produtos por Categoria

#### Endpoint

```http
GET /api/produtos/categoria/{categoria}
```

Retorna uma lista de produtos com base na categoria especificada.

#### Categorias Disponíveis

- WINDOWS,
- STEAM,
- PLAYSTATION,
- XBOX,
- OUTROS;

#### Exemplo de Solicitação

```http
GET /api/produtos/categoria/outros
```

### Consultar Produtos por Distribuidor

#### Endpoint

```http
GET /api/produtos/distribuidor/{distribuidor}
```

Retorna uma lista de produtos com base no distribuidor especificado.

#### Exemplo de Solicitação

```http
GET /api/produtos/distribuidor/PlayStation Publishing LLC
```

### Criar um Novo Produto

#### Endpoint

```http
POST /api/produtos
```

Cria um novo produto com base nos dados fornecidos no corpo da solicitação.

#### Exemplo de Corpo da Solicitação

```json
{
  "categoria": "WINDOWS",
  "nome": "Ghost of Tsushima Director's Cut",
  "distribuidor": "PlayStation Publishing LLC",
  "preco": 168.90,
  "temDesconto": false,
  "precoComDesconto": null,
  "parcelas": 3,
  "imgUrl": "https://assets.nuuvem.com/image/upload/t_banner_big/v1/products/65e8b6f485c94d0016610795/banners/clkteouysqmblit20ku1.jpg"
}
```

### Atualizar um Produto Existente

#### Endpoint

```http
PUT /api/produtos/{id}
```

Atualiza um produto existente com base no ID fornecido e nos dados fornecidos no corpo da solicitação.

#### Exemplo de Corpo da Solicitação

```json
{
    "id": 2,
    "categoria": "STEAM",
    "nome": "Ghost of Tsushima Director's Cut",
    "distribuidor": "PlayStation Publishing LLC",
    "preco": 168.90,
    "temDesconto": false,
    "precoComDesconto": null,
    "parcelas": 3,
    "imgUrl": "https://assets.nuuvem.com/image/upload/t_banner_big/v1/products/65e8b6f485c94d0016610795/banners/clkteouysqmblit20ku1.jpg"
}
```

### Excluir um Produto

#### Endpoint

```http
DELETE /api/produtos/{id}
```

Exclui um produto existente com base no ID fornecido.

## Respostas da API

A API retornará respostas com os seguintes códigos de status:

- `200 OK`: A solicitação foi bem-sucedida.
- `201 Created`: Um novo recurso foi criado com sucesso (usado para POST).
- `204 No Content`: A solicitação de exclusão foi bem-sucedida (usado para DELETE).
- `400 Bad Request`: A solicitação foi malformada ou contém dados inválidos.
- `403 Forbidden`: Recusa de acesso pelo servidor.
- `404 Not Found`: O recurso solicitado não foi encontrado.
- `500 Internal Server Error`: O servidor encontrou um erro interno.
---