const express = require('express');
const app = express.Router();
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

app.get('/categories', verifyToken, categoryController.getAllCategories);
app.get('/category/add', verifyToken, isAdmin, categoryController.getCategoryForm);
app.post('/category/add', verifyToken, isAdmin, categoryController.createCategory);

app.get('/category/edit/:id', verifyToken, isAdmin, categoryController.getCategoryForm);
app.post('/category/edit/:id', verifyToken, isAdmin, categoryController.updateCategory);

app.post('/category/delete/:id', verifyToken, isAdmin, categoryController.deleteCategory);

module.exports = app;