const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const canManageProduct = (product, user) => {
    if (!product || !user) return false;
    return user.role === 'admin';
};

const getFavoriteIds = async (userId) => {
    const user = await User.findById(userId).select('favorites');
    return user ? user.favorites.map(id => id.toString()) : [];
};

const getUploadedImagePath = (file) => {
    return file ? `/uploads/products/${file.filename}` : '';
};

const deleteProductImage = (imagePath) => {
    if (!imagePath) return;

    const fullPath = path.join(__dirname, '..', 'public', imagePath);
    fs.unlink(fullPath, (err) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Could not delete product image:', err.message);
        }
    });
};

exports.getAllProducts = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const products = await Product.find(filter).populate('category').populate('createdBy', 'username').sort({ createdAt: -1 });
        const categories = await Category.find().sort({ name: 1 });
        const favoriteIds = await getFavoriteIds(req.user.id);

        res.render('productList', {
            products,
            categories,
            selectedCategory: req.query.category || '',
            favoriteIds,
            user: req.user
        });
    } catch (err) {
        res.status(500).render('message', {
            title: 'Products unavailable',
            message: 'We could not load products right now.'
        });
    }
};

exports.getFavoriteProducts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'favorites',
            populate: [
                { path: 'category' },
                { path: 'createdBy', select: 'username' }
            ]
        });

        const products = user ? user.favorites : [];
        const favoriteIds = products.map(product => product._id.toString());

        res.render('myProducts', { products, favoriteIds, user: req.user });
    } catch (err) {
        res.status(500).render('message', {
            title: 'Favorites unavailable',
            message: 'We could not load your favorite products right now.'
        });
    }
};

exports.addFavorite = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorites: req.params.id } });
        res.redirect(req.get('Referrer') || '/products');
    } catch (err) {
        res.status(500).render('message', {
            title: 'Favorite not saved',
            message: 'Please try adding this product again.'
        });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: req.params.id } });
        res.redirect(req.get('Referrer') || '/favorites');
    } catch (err) {
        res.status(500).render('message', {
            title: 'Favorite not removed',
            message: 'Please try removing this product again.'
        });
    }
};

exports.getProductForm = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        let product = null;

        if (req.params.id) {
            product = await Product.findById(req.params.id);

            if (!canManageProduct(product, req.user)) {
                return res.status(403).render('message', {
                    title: 'Access denied',
                    message: 'Only admins can edit products.'
                });
            }
        }

        res.render('productForm', { product, categories, user: req.user });
    } catch (err) {
        res.status(500).render('message', {
            title: 'Form unavailable',
            message: 'We could not load the product form.'
        });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const product = await Product.create({
            name: name.trim(),
            price,
            category,
            image: getUploadedImagePath(req.file),
            createdBy: req.user.id
        });

        await User.findByIdAndUpdate(req.user.id, { $addToSet: { products: product._id } });
        res.redirect('/products');
    } catch (err) {
        deleteProductImage(getUploadedImagePath(req.file));
        res.status(500).render('message', {
            title: 'Product not saved',
            message: 'Please check the product details and try again.'
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const product = await Product.findById(req.params.id);

        if (!canManageProduct(product, req.user)) {
            return res.status(403).render('message', {
                title: 'Access denied',
                message: 'Only admins can update products.'
            });
        }

        const updatedProduct = {
            name: name.trim(),
            price,
            category
        };

        const oldImage = product.image;

        if (req.file) {
            updatedProduct.image = getUploadedImagePath(req.file);
        }

        await Product.findByIdAndUpdate(req.params.id, updatedProduct);

        if (req.file) {
            deleteProductImage(oldImage);
        }

        res.redirect('/products');
    } catch (err) {
        deleteProductImage(getUploadedImagePath(req.file));
        res.status(500).render('message', {
            title: 'Product not updated',
            message: 'Please try updating the product again.'
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!canManageProduct(product, req.user)) {
            return res.status(403).render('message', {
                title: 'Access denied',
                message: 'Only admins can delete products.'
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        if (product) {
            deleteProductImage(product.image);
            await User.findByIdAndUpdate(product.createdBy, { $pull: { products: product._id } });
            await User.updateMany({}, { $pull: { favorites: product._id } });
        }

        res.redirect('/products');
    } catch (err) {
        res.status(500).render('message', {
            title: 'Product not deleted',
            message: 'Please try deleting the product again.'
        });
    }
};
