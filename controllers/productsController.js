const productsService = require('../services/productsService');

const getProducts = async (_req, res) => {
  const products = await productsService.getProducts();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const productById = await productsService.getProductsById(id);
  res.status(200).json(productById);
};

const postProduct = async (req, res) => {
  const value = await productsService.validateBody(req.body);
  const productId = await productsService.postProduct(value);
  const productCreated = { productId, ...value };
  res.status(201).json(productCreated);
};

module.exports = {
  getProducts,
  getProductsById,
  postProduct,
};
