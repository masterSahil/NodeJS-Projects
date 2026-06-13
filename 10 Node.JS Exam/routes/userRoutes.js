const express = require('express');
const app = express.Router();
const authController = require("../controllers/authController")

app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/logout', authController.logout);

module.exports = app;