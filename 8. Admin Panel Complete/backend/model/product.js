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
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

module.exports = model("Products", productSchema);