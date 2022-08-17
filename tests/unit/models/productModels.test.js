const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

const mockProducts = [
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


describe('Teste Products Model', () => {
  beforeEach(sinon.restore)
   
  describe('teste de getAll',() => {
    it('quando retorna todos os produtos num array', async () => {
      sinon.stub(connection, 'query').resolves([mockProducts]);
      
      const product = await productModel.getAll();
      expect(product).to.be.an('array');
      expect(product).to.have.length(3);
      expect(product).to.be.equal(mockProducts);
    })
    it('quando retorna null', async () => {
      sinon.stub(connection, 'query').resolves([]);
      const product = await productModel.getAll();
      expect(product).to.equal(undefined);  
    })
  });

  describe('teste de getById', () => {
    describe('ao achar produto com id informado', () => {
      it('retorna o produto escolhido', async () => {
        const query = { "id": 1, "name": "Martelo de Thor" }
        sinon.stub(connection, 'query').resolves([[query]]);
        const product = await productModel.getById(1);
        expect(product).to.be.an('object');
        expect(product).to.be.all.keys('id', 'name');
      })
    })

    describe('ao não achar produto com id informado', () => {
      it('retorna status e message de produto nao encontrado ', async () => {
        const query = [[]];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.getById(999);
        expect(product).to.equal(null);
      })
    })
  })
})