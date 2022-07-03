const Joi = require('joi');
const getProductsModel = require('../models/getProductsModels');

const validateParamsId = (params) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  const { error, value } = schema.validate(params);

  if (error) throw error;

  return value;
};

const getProducts = async () => {
  const products = await getProductsModel.getProducts();
  return products;
};

const getProductsById = async (id) => {
  const product = await getProductsModel.getProductsById(id);
  return product;
};

module.exports = {
  validateParamsId,
  getProducts,
  getProductsById,
};
