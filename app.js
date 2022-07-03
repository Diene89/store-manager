require('dotenv').config();
const express = require('express');
require('express-async-errors');

const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.use('/products', productsRoutes);

app.use((err, _req, res, _next) => {
  if (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
});

// -> não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;