const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

const mockProducts = [
	{
		"id": 1,
		"name": "Machado do Thor Stormbreaker"
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
      it('retorna um objeto com chave id e name', async () => {
        const query = { "id": 1, "name": "Machado do Thor Stormbreaker" }
        sinon.stub(connection, 'query').resolves([[query]]);
        const product = await productModel.getById(1);
        expect(product).to.be.an('object');
        expect(product).to.be.all.keys('id', 'name');
      })
    })

    describe('ao não achar produto com id informado', () => {
      it('retorna null ', async () => {
        const query = [[]];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.getById(999);
        expect(product).to.equal(null);
      })
    })
  })

  describe('teste de create', () => {
    describe('ao ter um produto criado', () => {
      it('retorna o id do novo produto', async () => {
        const query = [{ insertId: 4 }];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.create("ProdutoX");
        expect(product).to.be.an('number');
        expect(product).to.be.equal(4);
      })
    })
    describe('ao nao ter passado um name', () => {
      it('retorna undefined', async () => {
        const query = [[]];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.create();
        expect(product).to.equal(undefined);
      })
    })
  })

  describe('teste de update', () => {
    describe('ao ter um produto atualizado', () => {
      it('retorna um objeto com chave name', async () => {
        const query = [{ id: 1, name: "Machado do Thor Stormbreaker" }];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.update(1, "Martelo do Batman");
        console.log(product);
        expect(product).to.be.an('object');
        expect(product).to.be.all.keys('id','name');
      })
    })
    // describe('ao nao ter passado um id', () => {
    //   it('retorna undefined', async () => {
    //     const query = [[]];
    //     sinon.stub(connection, 'query').resolves(query);
    //     const product = await productModel.update();
    //     expect(product).to.equal(undefined);
    //   })
    // })
  })

  describe('teste de delete', () => {
    describe('ao ter um produto deletado', () => {
      it('retorna um objeto', async () => {
        const query = [[{ "name": "ProdutoX" }]];
        sinon.stub(connection, 'query').resolves(query);
        const product = await productModel.delete('');
        expect(product).to.be.a('object');
      })
    })
    // describe('ao nao ter passado um id', () => {
    //   it('retorna undefined', async () => {
    //     const query = [[]];
    //     sinon.stub(connection, 'query').resolves(query);
    //     const product = await productModel.delete();
    //     console.log(product);
    //     expect(product).to.equal(undefined);
    //   })
    // })
  })
})