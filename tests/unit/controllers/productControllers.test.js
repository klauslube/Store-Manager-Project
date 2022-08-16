const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productController = require('../../../models/productModel');
const productService = require('../../../services/productService')

// const mockProducts = [
// 	{
// 		"id": 1,
// 		"name": "Martelo de Thor"
// 	},
// 	{
// 		"id": 2,
// 		"name": "Traje de encolhimento"
// 	},
// 	{
// 		"id": 3,
// 		"name": "Escudo do Capitão América"
// 	}
// ]

const BASIC_REQ = {
  body: undefined,
  params: {},
  headers: {},
};

const testMyController = async (controller, request = BASIC_REQ) => {
  const result = {
    body: undefined,
    status: undefined
  }
  const response = {
    json: (obj) => {
      result.body = obj
      return null
    },
    status: (num)=> {
      result.status = num;
      return response
    }
  }
  const spyJson = sinon.spy(response, 'json');
  const spyStatus = sinon.spy(response, 'status')
  
  await controller(request, response)
  return {...result, spies: {json: spyJson, status: spyStatus}}
}

describe('Teste de product Controllers', () => {
  describe('Caso OK nas funcoes', () => {
    beforeEach(() => {
      const resultQuery = [];
      sinon.stub(productService, 'getAll').resolves(resultQuery);
      sinon.stub(productService, 'getById').resolves(resultQuery);
      sinon.stub(productService, 'create').resolves(resultQuery);
      sinon.stub(productService, 'update').resolves(resultQuery);
      sinon.stub(productService, 'delete').resolves(resultQuery);
    })
    afterEach(() => {
      sinon.restore();
    });
 
    it('status chamado com 200 na funcao getAll', async () => {
    const result = await testMyController(productService.getAll);
      
    expect(result.status).to.be.equal(200);
    })
    it('status chamado com 200 na funcao getById', async () => {
    const result = await testMyController(productService.getById, {params: 1});
      
    expect(result.status).to.be.equal(200);
    })
  
    it('status chamado com 201 na funcao create', async () => {
    const result = await testMyController(productService.create, {body: {name: 'ProdutoX'}});

    expect(result.status).to.be.equal(201);
    })
    it('status chamado com 201 na funcao update', async () => {
    const result = await testMyController(productService.update, {params: 1} , {body: {name: 'Martelo do Batman'}}, );

    expect(result.status).to.be.equal(200);
    })
    it('status chamado com 200 na funcao delete', async () => {
    const result = await testMyController(productService.delete, {params: 1});

    expect(result.status).to.be.equal(204);
    })
  })

  describe('Caso NAO OK nas funcoes', () => {
    beforeEach(() => {
      const resultQuery = [];
      sinon.stub(productService, 'getAll').resolves(resultQuery);
      sinon.stub(productService, 'getById').resolves(resultQuery);
      sinon.stub(productService, 'create').resolves(resultQuery);
      sinon.stub(productService, 'update').resolves(resultQuery);
      sinon.stub(productService, 'delete').resolves(resultQuery);
    })
    afterEach(() => {
      sinon.restore();
    });

    // it('status chamado com 200 na funcao getAll', async () => {
    // const result = await testMyController(productService.getAll);
      
    // expect(result.status).to.be.equal(200);
    // })
    it('status chamado com 404 na funcao getById', async () => {
    const result = await testMyController(productService.getById, {params: 999});
      
      expect(result.status).to.be.equal(404);
      expect(result.spies.json).to.be.equal('Product not Found');
    })
  
    // it('status chamado com 404 na funcao create', async () => {
    // const result = await testMyController(productService.create, {body: {name: 'ProdutoX'}});

    // expect(result.status).to.be.equal(201);
    // })
    it('status chamado com 404 na funcao update', async () => {
    const result = await testMyController(productService.update, {params: 999} , {body: {name: 'Martelo do Batman'}}, );

      expect(result.status).to.be.equal(404);
      expect(result.spies.json).to.be.equal('Product not Found');
    })
    it('status chamado com 404 na funcao delete', async () => {
    const result = await testMyController(productService.delete, {params: 999});

      expect(result.status).to.be.equal(404);
      expect(result.spies.json).to.be.equal('Product not Found');
    })
  })
})