const connection = require('../../../models/connection');
const getProductsModels = require('../../../models/productsModels');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('testando o models', () => {
  beforeEach(() => sinon.restore());
  describe('getProducts', () => {
    //caso positivo
    it('Caso o banco devolva um array, a função deve retornar um array', () => {
      sinon.stub(connection, 'query').resolves(listProducts);
      expect(getProductsModels.getProducts()).to.eventually.deep.equal(listProducts)
    })
    //caso negativo
    it('Caso haja falha de conexão, o banco deve retornar um erro', () => {
      sinon.stub(connection, 'query').rejects();
      expect(getProductsModels.getProducts()).to.eventually.rejected;
    })
  });

  describe('getProductsById', () => {
    //caso positivo
    it('Caso o banco devolva um objeto, a função deve retornar um objeto', async () => {
      sinon.stub(connection, 'query').resolves([product]);
      expect(getProductsModels.getProductsById(2)).to.eventually.deep.eq(product)
    })
    //caso negativo
    it('Caso o banco retorne um array, a função deve retornar undefined', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      expect(await getProductsModels.getProductsById(2)).to.be.undefined;
    })
  });

  describe('postProducts', () => {
    it('Deve ser rejeitado caso o connection.query rejeite', () => {
      sinon.stub(connection, 'query').rejects();
      expect(getProductsModels.postProduct({})).to.eventually.be.rejected;
    })
    it('Deve retornar o produto inserido com sucesso', () => {
      const id = 4;
      sinon.stub(connection, 'query').resolves([{ insertId: id }]);
      expect(getProductsModels.postProduct({ name: 'Braceletes da Viúva Negra' })).to.eventually.equal(id);
    })
  })
});
