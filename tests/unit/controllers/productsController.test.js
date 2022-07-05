const getProductsController = require('../../../controllers/productsController');
const getProductsService = require('../../../services/productsService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('testando o controller', () => {
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
      expect(res.status.calledWith(200)).to.be.eq(true);
      expect(res.json.calledWith(product)).to.be.eq(true);
    })

    // it('caso não ret', async () => {
    //   sinon.stub(getProductsService, 'getProductsById').resolves(null);
    //   const req = {};
    //   const res = {};
    //   res.sendStatus = sinon.stub();
    //   req.params = { id: 10 };

    //   await getProductsController.getProductsById(req, res);

    //   expect(res.sendStatus.calledWith(404)).to.be.true;
    // });
  })
})
