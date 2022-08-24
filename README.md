# Bem vindo ao Store Manager project!
Esse projeto é uma API RESTfull a qual gerência um sistema de vendas no formato dropshipping no qual é possivel criar, visualizar, deletar e atualizar produtos e vendas da loja. Desenvolvido na [Trybe](https://www.betrybe.com/) com uso de JavaScript, Node Js e Express.


# Sumário
- [Bem vindo ao Store Manager project!](#bem-vindo-ao-store-manager-project)
- [Sumário](#sumário)
- [Contexto](#contexto)
- [Tecnologias, bibliotecas e arquiteturas usadas](#tecnologias-bibliotecas-e-arquiteturas-usadas)
- [Instruções da aplicação](#instruções-da-aplicação)


# Contexto
 Esse projeto é um CRUD (create,read,update,delete) __Store API__ que se conecta a um banco de dados MySQL para gerenciar produtos e vendas de uma loja.  Para isso é utilizado de diversas ferramentas e implementado a arquitetura __MSC__ (model-service-controller).

# Tecnologias, bibliotecas e arquiteturas usadas
  * __Node.js, Express, Nodemon, Joi__ | [Create a HTTP API](http://expressjs.com/), [API routing](https://expressjs.com/en/guide/routing.html), [error handling](https://www.npmjs.com/package/express-async-errors), [improve API development](https://www.npmjs.com/package/nodemon), [data validation](https://joi.dev/api/?v=17.6.0).
  * __Mocha, Chai, Sinon__ | [TDD and unit testing for Node.js](https://mochajs.org/).
  * __MySQL__ | [Creating and managing databases](https://www.mysqltutorial.org/).
  * __MSC__ | [Improve code organization, maintenance and scalability](https://martinfowler.com/architecture/).
  * __REST__ | [Simple architecture and highly popular](https://restfulapi.net/).

# Instruções da aplicação
### Instalar dependências
```
cd store-manager
npm install
```
### Rodar aplicação sem Docker
Crie um arquivo `.env` com sua conexão ao MySQL.

```
cd store-manager
npm run debug
```

### Rodando aplicação com Docker (arquivo docker-compose foi criado pela Trybe)
```
cd store-manager
docker-compose up -d
docker exec -it store_manager bash
npm install
npm run debug
```

### Rodar Testes
```
npm run test:mocha
```

### Rodar Lint
```
npm run lint
```
