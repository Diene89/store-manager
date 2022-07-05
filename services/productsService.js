const getProductsModel = require('../models/productsModels');

const getProducts = async () => {
  const products = await getProductsModel.getProducts();
  return products;
};

const getProductsById = async (id) => {
  const product = await getProductsModel.getProductsById(id);
  if (!product) {
     const objError = {
       status: 404,
       message: 'Product not found',
     };
     throw objError;  
  }
  return product;
};

module.exports = {
  getProducts,
  getProductsById,
};
