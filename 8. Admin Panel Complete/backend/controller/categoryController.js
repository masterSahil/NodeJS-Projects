const Category = require("../model/category");

exports.getCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();

        res.status(200).json({
            success: true,
            categories: allCategory,
        })
    } catch (error) {
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
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}