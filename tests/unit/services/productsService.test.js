const getProductsService = require('../../../services/productsService');
const getProductsModels = require('../../../models/productsModels');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('testando o service', () => {
  before(() => sinon.restore());
  
  describe('getProducts', () => {
    it('', () => {
      sinon.stub(getProductsModels, 'getProducts').resolves(listProducts);
      expect(getProductsService.getProducts()).to.eventually.deep.equal(listProducts);
    })
  })

  describe('getProductsById', () => {
    it('', () => {
      sinon.stub(getProductsModels, 'getProductsById').resolves(product);
      expect(getProductsService.getProductsById(2)).to.eventually.deep.equal(product);
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
})
