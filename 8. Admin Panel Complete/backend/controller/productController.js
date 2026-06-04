const Product = require("../model/product");

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
        const newProduct = await Product.create(req.body);

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
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });

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
        const deleted = await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            products: deleted,
        })
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
        const product = await Product.findByIdAndUpdate(req.params.id, {isDeleted: true}, {returnDocument: 'after'});

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