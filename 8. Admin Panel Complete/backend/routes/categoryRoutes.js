const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController")

router.get("/category", categoryController.getCategory);
router.post("/category", categoryController.CreateCategory);
router.put("/category/:id", categoryController.UpdateCategory);
router.delete("/category/:id", categoryController.DeleteCategory);

// soft delete
router.put("/trash-category/:id", categoryController.softDeleteCategory);
router.get("/trash-category", categoryController.getTrashCategories);
router.put("/restore-category/:id", categoryController.restoreCategory);
router.delete("/permanent-category/:id", categoryController.DeleteCategory);

module.exports = router;