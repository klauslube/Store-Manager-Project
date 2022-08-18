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