const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController")

router.get("/category", categoryController.getCategory);
router.post("/category", categoryController.CreateCategory);
router.put("/category/:id", categoryController.UpdateCategory);
router.delete("/category/:id", categoryController.DeleteCategory);

module.exports = router;