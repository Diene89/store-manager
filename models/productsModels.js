const connection = require('./connection');

const getProducts = async () => {
  const sql = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.query(sql);
  return products;
};

const getProductsById = async (id) => {
  const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.query(sql, [id]);
  return product;
};

const postProduct = async ({ name }) => {
  const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.query(sql, [name]);
  return insertId;
};

module.exports = {
  getProducts, getProductsById, postProduct,
};
