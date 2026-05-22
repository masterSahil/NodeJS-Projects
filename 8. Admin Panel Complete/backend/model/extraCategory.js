const { Schema, model } = require("mongoose");

const extraCategory = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    extraCategory: {
        type: String,
        required: true,
        trim: true
    },
    pricing: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = model("ExtraCategory", extraCategory);