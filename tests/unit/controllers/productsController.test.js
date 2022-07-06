const getProductsController = require('../../../controllers/productsController');
const getProductsService = require('../../../services/productsService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('testando o controller', () => {
  beforeEach(() => sinon.restore());
  describe('getProducts', () => {

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
  })

  describe('postProducts', () => {
    // caso negativo
    it('deve disparar um erro caso o productsService.validateBody também dispare', async () => {
      sinon.stub(getProductsService, 'validateBody').rejects();
      expect(getProductsController.postProduct({}, {})).to.eventually.be.rejected;
    })
    // caso negativo
    it('deve disparar um erro caso o productsService.postProduct também dispare', async () => {
      sinon.stub(getProductsService, 'validateBody').resolves();
      sinon.stub(getProductsService, 'postProduct').rejects();
      expect(getProductsController.postProduct({}, {})).to.eventually.be.rejected;
    })
    // caso positivo
    it('deve chamar o res.status com 201 e o res.json com o objeto', async () => {
      sinon.stub(getProductsService, 'postProduct').resolves(1);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = { name: 'Braceletes da Viúva Negra' };

      await getProductsController.postProduct(req, res);
      expect(res.status.calledWith(201)).to.be.eq(true);
      expect(res.json.calledWith({ id: 1, name: 'Braceletes da Viúva Negra' })).to.be.eq(true);
    })
  })

})
