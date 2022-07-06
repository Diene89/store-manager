const { Router } = require('express');
const getProductController = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.get('/:id', getProductController.getProductsById);
productsRoutes.get('/', getProductController.getProducts);
productsRoutes.post('/', getProductController.postProduct);

module.exports = productsRoutes;