const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productService = require('../../../services/productService');
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

describe('Teste Products Service', () => {
  beforeEach(sinon.restore)
   
  describe('teste de getAll',() => {
    it('retorna todos os produtos', async () => {
      sinon.stub(productModel, 'getAll').resolves([mockProducts]);
      
      const response = await productService.getAll();
      expect(response).to.be.an('array');
      // expect(response).to.have.length(3);
      // expect(response).to.be.equal(mockProducts);
    })
    it('retorna undefined', async () => {
      sinon.stub(productModel, 'getAll').resolves();
      const response = await productService.getAll();
      expect(response).to.equal(undefined);  
    })
  });

  describe('teste de getById', () => {
    describe('ao achar produto com id informado', () => {
      it('retorna um objeto com chave id e name', async () => {
        const query = { "id": 1, "name": "Machado do Thor Stormbreaker" }
        sinon.stub(productModel, 'getById').resolves(query);
        const product = await productService.getById(1);
        expect(product).to.be.a('object');
        expect(product).to.be.all.keys('id','name');
      })
    })

    describe('ao não achar produto com id informado', () => {
      it('retorna null ', async () => {
        // const query = [];
        sinon.stub(productModel, 'getById').resolves();
        const product = await productService.getById(999);
        expect(product).to.equal(null);
      })
    })
  })

  describe('teste de create', () => {
    describe('ao ter um produto criado', () => {
      it('retorna o id do novo produto', async () => {
        const query = [{ insertId: 4 }];
        sinon.stub(productModel, 'create').resolves(query);
        const product = await productService.create("ProdutoX");
        expect(product).to.be.an('object');
        expect(product).to.be.all.keys('id', 'name');
      })
    })
    // describe('ao nao ter passado um name', () => {
    //   it('retorna undefined', async () => {
    //     const query = [[]];
    //     sinon.stub(connection, 'query').resolves(query);
    //     const product = await productService.create();
    //     expect(product).to.equal(undefined);
    //   })
    // })
  })


  // describe.only('teste de check', () => {
  //   describe('ao nao achar um productId', () => {
  //     it.only('retorna falso', async () => {
  //       const query = {id: 999}
  //       sinon.stub(productModel, 'getById').resolves(query);
  //       const productId = await productService.check(999);
  //       expect(productId).to.be.a('boolean');
  //     })
  //   })
  // })

  describe('teste de update', () => {
    describe('ao ter um produto atualizado', () => {
      it('retorna um objeto com chave name e id', async () => {
        const query01 = { id: 1, name: "Machado do Thor Stormbreaker" };
        // const query02 
        sinon.stub(productModel, 'getById').resolves(query01);
        sinon.stub(productModel, 'update').resolves(query01);
        const product = await productService.update(1, "Martelo do Batman");
        // console.log(product);
        expect(product).to.be.an('object');
        // expect(product).to.be.all.keys('id','name');
      })
    })
    describe('ao não achar um id de produto', () => {
      it('retorna null', async () => {
        // const query = [[]];
        sinon.stub(productModel, 'getById').resolves();
        const product = await productService.update(999, "Martelo do Batman");
        expect(product).to.be.equal(null);
      })
    })
  })
  
  describe('teste de delete', () => {
    describe('ao ter um produto deletado', () => {
      it('retorna um objeto', async () => {
        const query = {id: 1};
        sinon.stub(productModel, 'delete').resolves(query);
        const product = await productService.delete(1);
        expect(product).to.be.a('object');
      })
    })
    describe('ao nao ter passado um id', () => {
      it('retorna null', async () => {
        const query = [[]];
        sinon.stub(productModel, 'delete').resolves(query);
        const product = await productService.delete();
        expect(product).to.equal(null);
      })
    })
  })
})