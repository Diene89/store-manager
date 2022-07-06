const express = require('express');
require('express-async-errors');
const error = require('./middlewares/error.middleware');
require('dotenv').config();

const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

// app.use((err, _req, _res, _next) => {
//   if (err) {
//     return err;
//   }
// });

// -> não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(error);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;