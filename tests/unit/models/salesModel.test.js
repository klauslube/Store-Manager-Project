const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
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

describe('testa salesModel', () => {
  beforeEach(sinon.restore);

  describe('teste de createSale ', () => {
    describe('quando criado sale com sucesso', () => {
      it('retorna um objeto', async () => {
        sinon.stub(connection, 'query').resolves([{id: 4}]);
      
        const sale = await salesModel.createSale();
        expect(sale).to.be.an('object');
        expect(sale).to.have.key('id');
      })
    })
  })

  describe('teste de createSaleProduct', () => {
    describe('quando criado uma sale com sucesso', () => {
      it('retorna um objeto', async () => {
        sinon.stub(connection, 'query').resolves([{ productId: 4, quantity: 5 }]);
        
        const saleInfo = { saleId: 1, productId: 4, quantity: 5 }
        const sale = await salesModel.createSaleProduct(saleInfo);
        expect(sale).to.be.an('object');
        expect(sale).to.have.all.keys('productId','quantity')
      })
    })
  })

  describe('teste de getAll ', () => {
    describe('quando acha uma sale com sucesso', () => {
      it('retorna um array', async () => {
        sinon.stub(connection, 'query').resolves([saleAllMock]);
      
        const sale = await salesModel.getAll();
        expect(sale).to.be.an('array');
        expect(sale).to.be.equal(saleAllMock)
      })
    })
  })

  describe('teste de getById ', () => {
    describe('quando acha uma sale pelo id com sucesso', () => {
      it('retorna um objeto', async () => {
        sinon.stub(connection, 'query').resolves([saleAllMock[2]]);
      
        const sale = await salesModel.getById(2);
        expect(sale).to.be.an('object');
        expect(sale).to.be.equal(saleAllMock[2]);
      })
      describe('quando nao acha uma sale pelo id', () => {
        it('retorna null', async () => {
          sinon.stub(connection, 'query').resolves([[]]);

          const sale = await salesModel.getById(999);
          expect(sale).to.be.equal(null);
        })
      })
    })
  })
  describe('teste de delete ', () => {
    describe('quando acha uma sale com sucesso', () => {
      it('retorna um objeto', async () => {
        sinon.stub(connection, 'query').resolves([{id: 1}]);
      
        const sale = await salesModel.delete(1);
        expect(sale).to.be.an('object');
        expect(sale).to.be.not.empty;
      })
    })
  })

  describe('teste de update ', () => {
    describe('quando acha uma sale com sucesso', () => {
      it('retorna um array', async () => {
        sinon.stub(connection, 'query').resolves([{productId: 1, quantity: 10}]);
      
        const sale = await salesModel.update({saleId: 1, productId: 3, quantity: 5});
        expect(sale).to.be.an('object');
        expect(sale).to.be.not.empty;
      })
    })
  })
})