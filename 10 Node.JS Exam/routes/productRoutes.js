const express = require('express');
const app = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const uploadProductImage = require('../middleware/uploadMiddleware');

app.get('/products', verifyToken, productController.getAllProducts);
app.get('/my-products', verifyToken, (req, res) => res.redirect('/favorites'));
app.get('/favorites', verifyToken, productController.getFavoriteProducts);
app.post('/favorites/:id/add', verifyToken, productController.addFavorite);
app.post('/favorites/:id/remove', verifyToken, productController.removeFavorite);

app.get('/product/add', verifyToken, isAdmin, productController.getProductForm);
app.post('/product/add', verifyToken, isAdmin, uploadProductImage, productController.createProduct);

app.get('/product/edit/:id', verifyToken, isAdmin, productController.getProductForm);
app.post('/product/edit/:id', verifyToken, isAdmin, uploadProductImage, productController.updateProduct);

app.post('/product/delete/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = app;
