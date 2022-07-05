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
    it('Caso o banco devolva um array, a função deve retornar um array', async () => {
      sinon.stub(connection, 'query').resolves(listProducts);
      expect(await getProductsModels.getProducts()).to.eventually.deep.equal(listProducts)
    })
    //caso negativo
    it('Caso haja falha de conexão, o banco deve retornar um erro', async () => {
      sinon.stub(connection, 'query').rejects();
      expect(await getProductsModels.getProducts()).to.eventually.rejected;
    })
  });

  describe('getProductsById', () => {
    //caso positivo
    it('Caso o banco devolva um objeto, a função deve retornar um objeto', async () => {
      sinon.stub(connection, 'query').resolves([product]);
      expect(await getProductsModels.getProductsById(2)).to.eventually.deep.eq(product)
    })
    //caso negativo
    it('Caso o banco retorne um array, a função deve retornar undefined', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      expect(await getProductsModels.getProductsById(2)).to.be.undefined;
    })
  });
});
