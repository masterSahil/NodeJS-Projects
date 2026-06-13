const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        for (let category of categories) {
            category.productCount = await Product.countDocuments({ category: category._id });
        }

        res.render('categoryList', { categories, user: req.user });
    } catch (err) {
        res.status(500).render('message', {
            title: 'Categories unavailable',
            message: 'We could not load categories right now.'
        });
    }
};

exports.getCategoryForm = async (req, res) => {
    try {
        let category = null;
        if (req.params.id) {
            category = await Category.findById(req.params.id);
        }
        res.render('categoryForm', { category, user: req.user });
    } catch (err) {
        res.status(500).render('message', {
            title: 'Form unavailable',
            message: 'We could not load the category form.'
        });
    }
};

exports.createCategory = async (req, res) => {
    try {
        await Category.create({ name: req.body.name.trim() });
        res.redirect('/categories');
    } catch (err) {
        res.status(500).render('message', {
            title: 'Category not saved',
            message: 'Please check the category name and try again.'
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, { name: req.body.name.trim() });
        res.redirect('/categories');
    } catch (err) {
        res.status(500).render('message', {
            title: 'Category not updated',
            message: 'Please try updating the category again.'
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
        
        await Product.updateMany({ category: categoryId }, { category: null });

        res.redirect('/categories');
    } catch (err) {
        res.status(500).render('message', {
            title: 'Category not deleted',
            message: 'Please try deleting the category again.'
        });
    }
};
