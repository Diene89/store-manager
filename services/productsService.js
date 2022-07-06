const Joi = require('joi');
const productsModel = require('../models/productsModels');
const NotFoundError = require('./NotFoundError');

const validateBody = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error, value } = schema.validate(params);

  if (error) throw error;

  return value;
};

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

// const getProductsById = async (id) => {
//   const product = await productsModel.getProductsById(id);
//   if (!product) {
//      const objError = {
//        status: 404,
//        message: 'Product not found',
//      };
//      throw objError;  
//   }
//   return product;
// };

const getProductsById = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product) throw new NotFoundError('Product not found');
  return product;
};

const postProduct = async ({ name }) => {
  const productId = await productsModel.postProduct({ name });
  return productId;
};

module.exports = {
  getProducts,
  getProductsById,
  validateBody,
  postProduct,
};
