const productsService = require('../../../services/productsService');
const productsModels = require('../../../models/productsModels');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listProducts, product } = require('../mocks/productsMock');

use(chaiAsPromised);

describe('testando o service', () => {
  beforeEach(() => sinon.restore());
  
  describe('getProducts', () => {
    it('', () => {
      sinon.stub(productsModels, 'getProducts').resolves(listProducts);
      expect(productsService.getProducts()).to.eventually.deep.equal(listProducts);
    })
  })

  describe('getProductsById', () => {
    it('deve retornar o objeto', () => {
      sinon.stub(productsModels, 'getProductsById').resolves(product);
      expect(productsService.getProductsById(2)).to.eventually.deep.equal(product);
    });
    it('deve retornar Product not found', () => {
      sinon.stub(productsModels, 'getProductsById').resolves(undefined);
      return expect(productsService.getProductsById(50000)).to.eventually.be.rejectedWith('Product not found');
    })
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

    it('objeto inválido', () => {
      const invalidData = { name: '' };
      expect(() => productsService.validateBody(invalidData))
      .to.throws('"name" is not allowed to be empty');
    });
  })

  describe('validateParams', () => {
    it('valida parametros', () => {
      const value = productsService.validateParams({ id:2 });
      expect(value).to.be.deep.eq({ id:2 });
    });
  })

  describe('putProduct', () => {
    it('deve disparar um erro caso productsModels também dispare', () => {
      sinon.stub(productsModels, 'putProduct').rejects();
      expect(productsService.putProduct(1, {})).to.eventually.be.rejected;
    })
    it('deve retornar caso productsModel altere o produto', () => {
      sinon.stub(productsModels, 'putProduct').resolves();
      expect(productsService.putProduct(1, {})).to.be(true);
    })
  })
   
});
