const connection = require('../../../models/connection');
const getProductsModels = require('../../../models/getProductsModels');
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
    it('Caso o banco devolva um objeto, a função deve retornar um objeto', () => {
      sinon.stub(connection, 'query').resolves(product);
      expect(getProductsModels.getProductsById(2)).to.eventually.deep.equal(product)
    })
    //caso negativo
    it('Caso o banco retorne um array, a função deve retornar undefined', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      expect(getProductsModels.getProductsById(2)).to.be.undefined;
    })
  });
});
