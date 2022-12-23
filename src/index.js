const express = require('express');

const productController = require('./controllers/product.controller');

const app = express();

app.use('/products', productController);



module.exports = app;