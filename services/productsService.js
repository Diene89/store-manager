const Joi = require('joi');
const productsModel = require('../models/productsModels');
const NotFoundError = require('../middlewares/NotFoundError');

const validateBody = (params) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
  });
  const { error, value } = schema.validate(params);
  if (error) throw error;

  return value;
};

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

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
