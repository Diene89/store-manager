const getProductsModel = require('../models/getProductsModels');

const getProducts = async () => {
  const products = await getProductsModel.getProducts();
  return products;
};

const getProductsById = async (id) => {
  const product = await getProductsModel.getProductsById(id);
  return product;
};

module.exports = {
  getProducts,
  getProductsById,
};
