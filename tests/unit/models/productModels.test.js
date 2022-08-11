const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

describe('Teste Products Model', () => {
  beforeEach(sinon.restore)
   
  describe('teste de getAll',() => {
    test('retorna todos os produtos', async () => {

      const model = await productModel.getAll();
      expect(model).to.be.a();
      sinon.stub(connection, 'query').resolves(query);
    })
  });

  describe('teste de getById', () => {
    describe('ao achar produto com id informado', () => {
      test('retorna o produto', () => {
        const query = [[]];

        sinon.stub(connection, 'query').resolves(query);
      })
    })

    describe('ao não achar produto com id informado', () => {
      test('retorna message de produto nao encontrado ')
    })
  })
})