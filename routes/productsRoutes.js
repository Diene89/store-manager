const { Router } = require('express');
const getProductController = require('../controllers/getProductsController');

const productsRoutes = Router();

productsRoutes.get('/', getProductController.getProducts);
productsRoutes.get('/:id', getProductController.getProductsById);

module.exports = productsRoutes;