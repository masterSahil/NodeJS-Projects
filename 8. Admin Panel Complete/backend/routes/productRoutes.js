const exress = require("express");
const router = exress.Router();
const productController = require("../controller/productController");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({storage});

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.editableProduct);
router.post('/products', upload.single("image"), productController.createProducts);
router.put('/products/:id', upload.single("image"), productController.updateProducts);
router.put("/products/status/:id", productController.toggleStatus);

router.put('/products-delete/:id', productController.deleteProducts);
router.get('/products-trashed', productController.getTrashProducts);
router.put('/products/restore/:id', productController.restoreProduct);
router.delete('/products/permanent/:id', upload.single("image"), productController.permanentDeleteProduct);

module.exports = router;