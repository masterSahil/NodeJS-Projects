const Category = require("../model/category");

exports.getCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({isDeleted: false});

        res.status(200).json({
            success: true,
            categories: allCategory,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.CreateCategory = async (req, res) => {
    try {
        const {category, isActive} = req.body;
        const newCategory = await Category.create({category, isActive});

        res.status(201).json({
            success: true,
            categories: newCategory,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.UpdateCategory = async (req, res) => {
    try {
        const {category, isActive} = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {category, isActive},
             {returnDocument: 'after'});

        res.status(200).json({
            success: true,
            categories: updatedCategory,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.softDeleteCategory = async (req, res) => {
    try {
        const trashed = await Category.findByIdAndUpdate(req.params.id, {isDeleted: true}, 
            {returnDocument: 'after'});

        res.status(200).json({
            success: true,
            categories: trashed,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.DeleteCategory = async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            categories: removed,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getTrashCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: true });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.restoreCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {isDeleted: false}, 
        {returnDocument: 'after'});

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};