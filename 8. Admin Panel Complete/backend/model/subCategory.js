const {Schema, model} = require("mongoose");

const subCategory = new Schema({
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},
    subcategory: {type: String, required: true},
    isActive: {type: Boolean, default: true },
    isDeleted: {type: Boolean, default: false},
}, {
    timestamps: true,
});

module.exports = model("SubCategory", subCategory);