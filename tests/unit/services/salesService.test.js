const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');


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

const saleMock = {
	"saleId": 2,
	"itemsUpdated": [
		{
			"productId": 1,
			"quantity": 5
		},
	]
}

describe('Teste salesService', () => {
  beforeEach(sinon.restore)
   
  describe('teste de createSale', () => {
    it('retorna um objeto sale', async () => {
      sinon.stub(salesModel, 'createSale').resolves([{id: 3}]);
      sinon.stub(salesModel, 'createSaleProduct').resolves({ productId: 4, quantity: 5 });
      
      const sale = await salesService.createSale([{ id: 3, productId: 4, quantity: 5}]);
      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys('id', 'itemsSold');
    })
  })

  describe('teste de getAll', () => {
    it('retorna todoas as sales', async () => {
      sinon.stub(salesModel, 'getAll').resolves(saleAllMock);
  
      const sale = await salesService.getAll();
      expect(sale).to.be.an('array');
      expect(sale).to.be.deep.equal(saleAllMock);
    })
  })
  
  describe('teste de getById', () => {
    it('retorna o objeto sale pelo id', async () => {
      sinon.stub(salesModel, 'getById').resolves(saleAllMock[2]);
  
      const sale = await salesService.getById(2);
      expect(sale).to.be.an('object');
      expect(sale).to.be.deep.equal(saleAllMock[2]);
    })
    it('retorn null ao não achar o id', async () => {
      sinon.stub(salesModel, 'getById').resolves();
  
      const sale = await salesService.getById();
      expect(sale).to.be.equal(null);
    })
  })

  describe('teste de delete', () => {
    it('retorna um objeto do saleId', async () => {
      sinon.stub(salesModel, 'getById').resolves([ { date: '2022-08-18T01:28:08.000Z', productId: 3, quantity: 15 } ]);
      sinon.stub(salesModel, 'delete').resolves({ id: 1 });
      
      const sale = await salesService.delete(1);
      expect(sale).to.be.an('object');
    })
    it('retorna null ao nao passar id', async () => {
      sinon.stub(salesModel, 'getById').resolves();
      sinon.stub(salesModel, 'delete').resolves({id: 1});
  
      const sale = await salesService.delete(1);
      expect(sale).to.be.equal(null);
    })
  })

  describe('teste de update', () => {
    it('retorna objeto sale atualizada', async () => {
      sinon.stub(salesModel, 'getById').resolves([ { date: '2022-08-18T01:28:08.000Z', productId: 3, quantity: 15 } ]);
      sinon.stub(salesModel, 'update').resolves({ productId: 1, quantity: 5 });
      
      const sale = await salesService.update(2, [{productId: 1, quantity: 5}]);
      expect(sale).to.be.an('object');
      expect(sale).to.be.deep.equal(saleMock);
    })
    it('retorna null ao nao achar idSale correto', async () => {
      sinon.stub(salesModel, 'getById').resolves();
      sinon.stub(salesModel, 'update').resolves({ productId: 1, quantity: 5 });
      
      const sale = await salesService.update(null, [{ productId: 1, quantity: 5 }]);
      expect(sale).to.be.equal(null);
      
    })
  })
})