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

// const getProductsById = async (req, res) => {
//   const { id } = req.params;
//   const productById = await productsService.getProductsById(id);

//   if (!productById) {
//     res.status(404).json({ message: 'Product not found' });
//   }
//   res.status(200).json(productById);
// };

module.exports = {
  getProducts,
  getProductsById,
};
