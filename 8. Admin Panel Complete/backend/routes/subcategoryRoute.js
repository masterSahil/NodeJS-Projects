const express = require("express");
const router = express.Router();
const subCategoriesController = require("../controller/subCategoryControl")

router.get("/subcategory", subCategoriesController.getSubCategories);
router.post("/subcategory", subCategoriesController.createSubCategory);
router.put("/subcategory/:id", subCategoriesController.updateSubCategory);
router.delete("/permanent-subcategory/:id", subCategoriesController.deleteSubCategory);

// soft delete
router.put("/trash-subcategory/:id", subCategoriesController.softDeleteSubCategory);
router.get("/trash-subcategory", subCategoriesController.getTrashSubCategories);
router.put("/restore-subcategory/:id", subCategoriesController.restoreSubCategory);

module.exports = router;