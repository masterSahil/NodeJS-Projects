const express = require("express");
const router = express.Router();
const subCategoriesController = require("../controller/subCategoryControl")

router.get("/subcategory", subCategoriesController.getSubCategories);
router.post("/subcategory", subCategoriesController.createSubCategory);
router.put("/subcategory/:id", subCategoriesController.updateSubCategory);
router.delete("/subcategory/:id", subCategoriesController.deleteSubCategory);

module.exports = router;