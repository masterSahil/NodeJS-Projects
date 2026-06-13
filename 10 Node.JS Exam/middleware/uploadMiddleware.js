const fs = require('fs');
const path = require('path');
const multer = require('multer');

const productUploadPath = path.join(__dirname, '..', 'public', 'uploads', 'products');

fs.mkdirSync(productUploadPath, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, productUploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        return cb(null, true);
    }
    cb(new Error('Only image files are allowed.'));
};

const productImageUpload = multer({ storage, fileFilter: imageFileFilter });

const uploadProductImage = (req, res, next) => {
    productImageUpload.single('image')(req, res, (err) => {
        if (!err) {
            return next();
        }

        res.status(400).render('message', {
            title: 'Image upload failed',
            message
        });
    });
};

module.exports = uploadProductImage;
