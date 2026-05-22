const express = require("express");
const router = express.Router();
const extraCategoryController = require("../controller/extraCategory");

router.get("/extra-category", extraCategoryController.getExtraCategories);
router.get("/extra-category/:id", extraCategoryController.getExtraCategoryById);
router.post("/extra-category", extraCategoryController.createExtraCategory);
router.put("/extra-category/:id", extraCategoryController.updateExtraCategory);
router.delete("/extra-category/:id", extraCategoryController.deleteExtraCategory);

module.exports = router;