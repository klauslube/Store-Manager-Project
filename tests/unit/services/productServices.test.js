const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productService = require('../../../services/productService');

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

describe('Teste Products Service', () => {
  beforeEach(sinon.restore)
   
  describe('teste de getAll',() => {
    it('retorna todos os produtos', async () => {
      sinon.stub(connection, 'query').resolves([mockProducts]);
      
      const response = await productService.getAll();
      expect(response).to.be.an('array');
      expect(response).to.have.length(3);
      expect(response).to.be.equal(mockProducts);
    })
    it('retorna undefined', async () => {
      sinon.stub(connection, 'query').resolves([]);
      const response = await productService.getAll();
      expect(response).to.equal(undefined);  
    })
  });

  describe('teste de getById', () => {
    describe('ao achar produto com id informado', () => {
      it('retorna o produto', async () => {
        const query = { "id": 1, "name": "Martelo de Thor" }
        sinon.stub(connection, 'query').resolves([[query]]);
        const product = await productService.getById(1);
        expect(product).to.be.a('object');
        expect(product).to.be.all.keys('id','name');
      })
    })

    describe('ao não achar produto com id informado', () => {
      it('retorna status e message de produto nao encontrado ', async () => {
        const query = [[]];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productService.getById(999);
        expect(product).to.equal(null);
      })
    })
  })
})