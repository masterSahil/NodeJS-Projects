const Product = require("../model/product");
const fs = require("fs");
const path = require("path");

module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({isDeleted: false}).populate("productCategory")
                                      .populate("productSubCategory")
                                      .populate("productName");

        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.createProducts = async (req, res) => {
    try {
        const productData = {...req.body, image: req.file ? req.file.filename : ""};
        const newProduct = await Product.create(productData);

        res.status(201).json({
            success: true,
            products: newProduct,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.updateProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let updatedData = {...req.body}
        if (req.file) {
            if (product.image) {
                const oldPath = path.join(__dirname, "../uploads", product.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updatedData.image = req.file.filename;
        }
        const updated = await Product.findByIdAndUpdate(req.params.id, updatedData, {new: true});

        res.status(200).json({
            success: true,
            products: updated,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.permanentDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.image) {
            const imagePath = path.join(__dirname, "../uploads", product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.toggleStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.editableProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product.isDeleted = true;
        await product.save();

        res.status(200).json({
            success: true,
            products: product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports.restoreProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {isDeleted: false});

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports.getTrashProducts = async (req, res) => {
    try {
        const products = await Product.find({isDeleted: true}).populate("productCategory")
        .populate("productSubCategory")
        .populate("productName");

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};