const getProductsController = require('../../../controllers/getProductsController');
const getProductsService = require('../../../services/getProductsService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('', () => {
  beforeEach(() => sinon.restore());
  describe('', () => {
    it('caso o service devolva um array, a res.status deve ser 200 e res.json com um array', async () => {
      sinon.stub(getProductsService, 'getProducts').resolves(listProducts);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await getProductsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true);
      expect(res.json.calledWith(listProducts)).to.be.eq(true);
    })
    it('caso o service devolva um objeto,a res.status deve ser 200 e res.json deve conter o objeto', async () => {
      sinon.stub(getProductsService, 'getProductsById').resolves(product);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 2 };

      await getProductsController.getProductsById(req, res);

      expect(res.status.calledWith(200)).to.be.eq.true;
      expect(res.status.calledWith(product)).to.be.eq.true;
    })
  })
})
