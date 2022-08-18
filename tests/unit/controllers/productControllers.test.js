const sinon = require('sinon');
const { expect } = require('chai');

// const connection = require('../../../models/connection');
const productController = require('../../../controllers/productController');
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
  afterEach(sinon.restore)
  describe('Caso OK nas funcoes', () => {
    
    it('status chamado com 200 na funcao getAll', async () => {
      sinon.stub(productService, 'getAll').resolves([]);
      const result = await testMyController(productController.getAll);
      expect(result.spies.status.calledOnce).to.be.equal(true);
      expect(result.status).to.be.equal(200);
    })
    it('status chamado com 200 na funcao getById', async () => {
      sinon.stub(productService, 'getById').resolves([]);
      const result = await testMyController(productController.getById, {params: 1});
      
      expect(result.status).to.be.equal(200);
    })
  
    it('status chamado com 201 na funcao create', async () => {
      sinon.stub(productService, 'create').resolves([]);
      const result = await testMyController(productController.create, {body: {name: 'ProdutoX'}});

      expect(result.status).to.be.equal(201);
    })
    it('status chamado com 200 na funcao update', async () => {
      sinon.stub(productService, 'update').resolves({name: 'teste'});
      const result = await testMyController(productController.update, {params: 1} , {body: {name: 'Martelo do Batman'}});
      // console.log(result);
      expect(result.status).to.be.equal(200);
    })
    it('status chamado com 204 na funcao delete', async () => {
      sinon.stub(productService, 'delete').resolves([]);
      const result = await testMyController(productController.delete, {params: 1});

      expect(result.status).to.be.equal(204);
    })
  })

  describe('Caso NAO OK nas funcoes', () => {

    it('status chamado com 200 na funcao getAll', async () => {
      sinon.stub(productService, 'getAll').resolves([]);
      const result = await testMyController(productController.getAll);
      
      expect(result.status).to.be.equal(200);
    })
    it('status chamado com 404 na funcao getById', async () => {
      sinon.stub(productService, 'getById').resolves([]);
      const result = await testMyController(productController.getById, {params: 999});
      
      expect(result.status).to.be.equal(404);
      expect(result.spies.json).to.be.equal('Product not Found');
    })
  
    it('status chamado com 404 na funcao create', async () => {
      sinon.stub(productService, 'create').resolves([]);
      const result = await testMyController(productController.create, {body: {name: 'ProdutoX'}});

      expect(result.status).to.be.equal(201);
    })
    it('status chamado com 404 na funcao update', async () => {
      sinon.stub(productService, 'update').resolves([]);
      const result = await testMyController(productController.update, {params: 999} , {body: {name: 'Martelo do Batman'}}, );

      expect(result.status).to.be.equal(404);
      expect(result.spies.json).to.be.equal('Product not Found');
    })
    it('status chamado com 404 na funcao delete', async () => {
      sinon.stub(productService, 'delete').resolves();
      const result = await testMyController(productController.delete);

      expect(result.status).to.be.equal(404);
      // expect(result.spies.json).to.be.equal('Product not Found');
    })
  })
})