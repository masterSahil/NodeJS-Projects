const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    productCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    productSubCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
    },
    productName: {
        type: Schema.Types.ObjectId,
        ref: "ExtraCategory",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

module.exports = model("Products", productSchema);