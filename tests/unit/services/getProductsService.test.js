const getProductsService = require('../../../services/getProductsService');
const getProductsModels = require('../../../models/getProductsModels');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('testando o service', () => {
  before(() => sinon.restore());
  
  describe('getProducts', () => {
    it('', async () => {
      sinon.stub(getProductsModels, 'getProducts').resolves(listProducts);
      expect(await getProductsService.getProducts()).to.eventually.deep.equal(listProducts);
    })
  })

  describe('getProductsById', () => {
    it('', async () => {
      sinon.stub(getProductsModels, 'getProductsById').resolves(product);
      expect(await getProductsService.getProductsById(2)).to.eventually.deep.equal(product);
    });

    it('', async () => {
      sinon.stub(getProductsModels, 'getProductsById').resolves(undefined);
      await getProductsService.getProductsById(10).to.Throw
      expect(await getProductsService.getProductsById(10)).to.Throw()
    });
  })
})
