const ExtraCategory = require("../model/extraCategory");

exports.getExtraCategories = async (req, res) => {
    try {
        const extraCategories = await ExtraCategory.find({isDeleted: false})
            .populate("categoryId", "category")
            .populate("subCategoryId", "subcategory")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: extraCategories.length,
            extraCategories: extraCategories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getExtraCategoryById = async (req, res) => {
    try {
        const extraCategory = await ExtraCategory.findById(req.params.id).populate("categoryId", "category").populate("subCategoryId", "subcategory");

        if (!extraCategory) {
            return res.status(404).json({
                success: false,
                message: "Extra Category not found",
            });
        }

        res.status(200).json({
            success: true,
            extraCategories: extraCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.createExtraCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId, extraCategory, pricing, isActive } = req.body;
        const newExtraCategory = await ExtraCategory.create({ categoryId, subCategoryId, extraCategory, pricing, isActive });

        res.status(201).json({
            success: true,
            extraCategories: newExtraCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateExtraCategory = async (req, res) => {
    try {
        const updatedExtraCategory = await ExtraCategory.findByIdAndUpdate(req.params.id, req.body,
            {returnDocument: 'after'});
        if (!updatedExtraCategory) {
            return res.status(404).json({
                success: false,
                message: "Extra Category not found",
            });
        }

        res.status(200).json({
            success: true,
            extraCategories: updatedExtraCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteExtraCategory = async (req, res) => {
    try {
        const deletedExtraCategory = await ExtraCategory.findByIdAndDelete(req.params.id);
        if (!deletedExtraCategory) {
            return res.status(404).json({
                success: false,
                message: "Extra Category not found",
            });
        }

        res.status(200).json({
            success: true,
            extraCategories: deletedExtraCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.softDeleteExtraCategory = async (req, res) => {
  try {
    const trashed = await ExtraCategory.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      extraCategories: trashed,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTrashExtraCategories = async (req, res) => {
  try {
    const extraCategories = await ExtraCategory.find({ isDeleted: true })
      .populate("categoryId", "category").populate("subCategoryId", "subcategory").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      extraCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.restoreExtraCategory = async (req, res) => {
  try {
    const restored = await ExtraCategory.findByIdAndUpdate(req.params.id, { isDeleted: false },
      { returnDocument: 'after' });

    res.status(200).json({
      success: true,
      extraCategories: restored,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};