const exress = require("express");
const router = exress.Router();
const productController = require("../controller/productController");

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.editableProduct);
router.post('/products', productController.createProducts);
router.put('/products/:id', productController.updateProducts);
router.put("/products/status/:id", productController.toggleStatus);

router.put('/products-delete/:id', productController.deleteProducts);
router.get('/products-trashed', productController.getTrashProducts);
router.put('/products/restore/:id', productController.restoreProduct);
router.delete('/products/permanent/:id', productController.permanentDeleteProduct);

module.exports = router;