const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const { verifyToken, isAdmin } = require('./middleware/authMiddleware');
const categoryController = require('./controllers/categoryController');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.redirect('/products');
});
app.use('/', require('./routes/productRoutes'));
app.use('/', require('./routes/categoryRoute'));
app.use('/', require('./routes/userRoutes'));

const PORT = 9001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
