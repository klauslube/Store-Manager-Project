const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');


const saleAllMock = [
	{
		"saleId": 1,
		"date": "2022-08-17T23:41:17.000Z",
		"productId": 1,
		"quantity": 5
	},
	{
		"saleId": 1,
		"date": "2022-08-17T23:41:17.000Z",
		"productId": 2,
		"quantity": 10
	},
	{
		"saleId": 2,
		"date": "2022-08-17T23:41:17.000Z",
		"productId": 3,
		"quantity": 15
	}
]

const saleUpdatedMock = {
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity":10
    },
    {
      "productId": 2,
      "quantity":50
    }
  ]
}

const saleCreateMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity":1
    },
    {
      "productId": 2,
      "quantity":5
    }
  ]
}

describe('teste de salesController', () => {
beforeEach(sinon.restore);
  
  describe("teste de createSale", () => {
    it('caso OK', async () => {
      const saleObj = { id: saleCreateMock.id, itemsSold: saleCreateMock.itemsSold };
      sinon.stub(salesService, 'createSale').resolves(saleObj);

      const req = {};
      const res = {};
      req.body = [
      {
        "productId": 1,
        "quantity":1
      },
      {
        "productId": 2,
        "quantity":5
      }
      ]

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.createSale(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(saleObj)).to.be.true;
    })
  })
    describe("teste de getAll", () => {
    it('caso OK', async () => {
      sinon.stub(salesService, 'getAll').resolves(saleAllMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(saleAllMock)).to.be.true;
    })
  })
    describe("teste de getById", () => {
    it('caso OK', async () => {
      sinon.stub(salesService, 'getById').resolves(saleAllMock[2]);

      const req = {};
      const res = {};
      
      req.params = { id: 2 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(saleAllMock[2])).to.be.true;
    })
      it('caso NAO OK', async () => {
      sinon.stub(salesService, 'getById').resolves(null);
      
      const req = {};
      const res = {};
      
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    })
  })
    describe("teste de delete", () => {
    it('caso OK', async () => {
      sinon.stub(salesService, 'delete').resolves(saleAllMock[0].saleId);

      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      await salesController.delete(req, res);
      expect(res.status.calledWith(204)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    })
    it('caso NAO OK', async () => {
      sinon.stub(salesService, 'delete').resolves(null);
      
      const req = {};
      const res = {};
      
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.delete(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    })
  })
  describe("teste de update", () => {
    it('caso OK', async () => {
      const objSale = { saleId:saleAllMock[2].saleId, itemsUpdated: saleUpdatedMock.itemsUpdated }
      sinon.stub(salesService, 'update').resolves(objSale);

      const req = {};
      const res = {};
      req.params = { id: 2 };
      req.body = [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.update(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(objSale)).to.be.true;
    })
    it('caso NAO OK', async () => {
      sinon.stub(salesService, 'update').resolves(null);
      
      const req = {};
      const res = {};
      
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.update(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    })
  })
})
