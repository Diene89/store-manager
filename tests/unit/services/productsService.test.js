const productsService = require('../../../services/productsService');
const productsModels = require('../../../models/productsModels');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('testando o service', () => {
  before(() => sinon.restore());
  
  describe('getProducts', () => {
    it('', () => {
      sinon.stub(productsModels, 'getProducts').resolves(listProducts);
      expect(productsService.getProducts()).to.eventually.deep.equal(listProducts);
    })
  })

  describe('getProductsById', () => {
    it('', () => {
      sinon.stub(productsModels, 'getProductsById').resolves(product);
      expect(productsService.getProductsById(2)).to.eventually.deep.equal(product);
    });

    // it('', async () => {
    //   sinon.stub(getProductsModels, 'getProductsById').rejects;
    //   const objError = {
    //     status: 404,
    //     message: 'Product not found',
    //   };
    //   await getProductsController.getProductsById(req, res);
    //   expect(getProductsService.getProductsById(10)).to.eventually.deep.equal(objError);
    // });
  })

  describe('postProduct', () => {
    it('Caso seja um objeto válido', () => {
      sinon.stub(productsModels, 'postProduct').resolves(4);
      expect(productsService.postProduct({ name: 'Braceletes da Viúva Negra' })).to.eventually.equal(4);
    })
  })

  describe('validateBody', () => {
    it('valida objeto', () => {
      const validData = { name: 'Braceletes da Viúva Negra' };
      const value = productsService.validateBody(validData);
      expect(value).to.be.deep.eq(validData);
    });
  })
    
});
