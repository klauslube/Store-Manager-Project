const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService')

const mockAllProducts = [
	{
		"id": 1,
		"name": "Martelo de Thor"
	},
	{
		"id": 2,
		"name": "Traje de encolhimento"
	},
	{
		"id": 3,
		"name": "Escudo do Capitão América"
	}
]

describe('testa productControllers', () => {
  beforeEach(sinon.restore);
  describe('testa getAll', () => {
    it('caso OK', async () => {
      sinon.stub(productService, 'getAll').resolves(mockAllProducts);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockAllProducts)).to.be.true;
    })
  })
  describe('testa getById', () => {
    it('caso OK', async () => {
      const productObj = { id: mockAllProducts[0].id, name: mockAllProducts[0].name}
      sinon.stub(productService, 'getById').resolves(productObj);

      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(productObj)).to.be.true;
    })
    it('caso NAO OK', async () => {
      sinon.stub(productService, 'getById').resolves(null);

      const req = {};
      const res = {};

      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found'})).to.be.true;
    })
  })
  describe('testa create', () => {
    it('caso OK', async () => {
      const productObj = { name: 'ProdutoX' };
      sinon.stub(productService, 'create').resolves(productObj);

      const req = {};
      const res = {};

      req.body = { name: 'ProdutoX'}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(productObj)).to.be.true;
    })
  })
  describe('testa update', () => {
    it('caso OK', async () => {
      const productObj = { id: 1, name: 'produtoX' };
      sinon.stub(productService, 'update').resolves(productObj);

      const req = {};
      const res = {};

      req.params = { id: 1 };
      req.body = { name: 'ProdutoX' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.update(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(productObj)).to.be.true;
    })
    it('caso NAO OK', async () => {
      sinon.stub(productService, 'update').resolves(null);

      const req = {};
      const res = {};
      req.body = { name: "produtoX" };
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    })
  })
  describe('testa delete', () => {
    it('caso OK', async () => {
      sinon.stub(productService, 'delete').resolves({id: 1});

      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      await productController.delete(req, res);
      expect(res.status.calledWith(204)).to.be.true;
      expect(res.send.calledWith()).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    })
    it('caso NAO OK', async () => {
      sinon.stub(productService, 'delete').resolves(null);

      const req = {};
      const res = {};
  
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.delete(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found'})).to.be.true;
    })
  })
})




//////// TESTES ZAMBELLI WAY ///////
// const BASIC_REQ = {
//   body: undefined,
//   params: {},
//   headers: {},
// };

// const testMyController = async (controller, request = BASIC_REQ) => {
//   const result = {
//     body: undefined,
//     status: undefined
//   }
//   const response = {
//     json: (obj) => {
//       result.body = obj
//       return null
//     },
//     status: (num)=> {
//       result.status = num;
//       return response
//     }
//   }
//   const spyJson = sinon.spy(response, 'json');
//   const spyStatus = sinon.spy(response, 'status');
  
//   await controller(request, response)
//   return {...result, spies: {json: spyJson, status: spyStatus}}
// }

// describe('Teste de product Controllers', () => {
//   afterEach(sinon.restore)
//   describe('Caso OK nas funcoes', () => {
    
//     it('status chamado com 200 na funcao getAll', async () => {
//       sinon.stub(productService, 'getAll').resolves([]);
//       const result = await testMyController(productController.getAll);
//       expect(result.spies.status.calledOnce).to.be.equal(true);
//       expect(result.status).to.be.equal(200);
//     })
//     it('status chamado com 200 na funcao getById', async () => {
//       sinon.stub(productService, 'getById').resolves([]);
//       const result = await testMyController(productController.getById, {params: 1});
      
//       expect(result.status).to.be.equal(200);
//     })
  
//     it('status chamado com 201 na funcao create', async () => {
//       sinon.stub(productService, 'create').resolves([]);
//       const result = await testMyController(productController.create, {body: {name: 'ProdutoX'}});

//       expect(result.status).to.be.equal(201);
//     })
//     it('status chamado com 200 na funcao update', async () => {
//       sinon.stub(productService, 'update').resolves({id: 1, name: 'teste'});
//       const result = await testMyController(productController.update, {params: 1} , {body: {name: 'Martelo do Batman'}});
//       // console.log(result);
//       expect(result.status).to.be.equal(200);
//     })
//     it('status chamado com 204 na funcao delete', async () => {
//       sinon.stub(productService, 'delete').resolves([]);
//       const result = await testMyController(productController.delete, {params: 1});

//       expect(result.status).to.be.equal(204);
//     })
//   })

//   describe('Caso NAO OK nas funcoes', () => {

//     it('status chamado com 200 na funcao getAll', async () => {
//       sinon.stub(productService, 'getAll').resolves([]);
//       const result = await testMyController(productController.getAll);
      
//       expect(result.status).to.be.equal(200);
//     })
//     it('status chamado com 404 na funcao getById', async () => {
//       sinon.stub(productService, 'getById').resolves([]);
//       const result = await testMyController(productController.getById, {params: 999});
      
//       expect(result.status).to.be.equal(404);
//       expect(result.spies.json).to.be.equal('Product not Found');
//     })
  
//     it('status chamado com 404 na funcao create', async () => {
//       sinon.stub(productService, 'create').resolves([]);
//       const result = await testMyController(productController.create, {body: {name: 'ProdutoX'}});

//       expect(result.status).to.be.equal(201);
//     })
//     it('status chamado com 404 na funcao update', async () => {
//       sinon.stub(productService, 'update').resolves([]);
//       const result = await testMyController(productController.update, {params: 999} , {body: {name: 'Martelo do Batman'}}, );

//       expect(result.status).to.be.equal(404);
//       expect(result.spies.json).to.be.equal('Product not Found');
//     })
//     it('status chamado com 404 na funcao delete', async () => {
//       sinon.stub(productService, 'delete').resolves();
//       const result = await testMyController(productController.delete);

//       expect(result.status).to.be.equal(404);
//       // expect(result.spies.json).to.be.equal('Product not Found');
//     })
//   })
// })