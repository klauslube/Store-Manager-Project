const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productService = require('../../../models/productModel');

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
    test('retorna todos os produtos', async () => {
      sinon.stub(connection, 'query').resolves(mockProducts);
      
      const model = await productModel.getAll();
      expect(model).to.be.a('array');
      expect(model).to.have.length(3);
      expect(model).to.be.equal(mockProducts);
    })
    test('retorna null', async () => {
      sinon.stub(connection, 'query').resolves(mockProducts);
      const model = await productModel.getAll();
      expect(model).to.equal(undefined);  
    })
  });

  describe('teste de getById', () => {
    describe('ao achar produto com id informado', () => {
      test('retorna o produto', async () => {
        const query = { "id": 1, "name": "Martelo de Thor" }
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.getById(1);
        expect(product).to.be.a('object');
        expect(product).to.be.all.keys('id', 'name');
      })
    })

    describe('ao não achar produto com id informado', () => {
      test('retorna status e message de produto nao encontrado ', async () => {
        const query = [[]];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.getById(999);
        expect(product).to.equal(null);
      })
    })
  })
})