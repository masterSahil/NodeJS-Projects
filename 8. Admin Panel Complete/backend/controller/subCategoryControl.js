const SubCategory = require("../model/subCategory");

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("categoryId", "category").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      subCategory: subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const { categoryId, subcategory } = req.body;
    const newSubCategory = await SubCategory.create({categoryId, subcategory});

    res.status(201).json({
      success: true,
      subCategory: newSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'});

    if (!updatedSubCategory) {
      return res.status(404).json({
        success: false,
        message: "Sub Category Not Found",
      });
    }

    res.status(200).json({
      success: true,
      subCategory: updatedSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!deletedSubCategory) {
      return res.status(404).json({
        success: false,
        message: "Sub Category Not Found",
      });
    }

    res.status(200).json({
      success: true,
      subCategory: deletedSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};