const { Router } = require('express');
const getProductController = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.get('/:id', getProductController.getProductsById);
productsRoutes.get('/', getProductController.getProducts);
productsRoutes.post('/', getProductController.postProduct);
productsRoutes.put('/:id', getProductController.putProduct);

module.exports = productsRoutes;