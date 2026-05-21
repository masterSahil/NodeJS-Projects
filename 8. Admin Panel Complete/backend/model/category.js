const {Schema, model} = require("mongoose");

const category = new Schema({
    category: {type: String, required: true},
    isActive: {type: Boolean, default: true },
}, {
    timestamps: true,
});

module.exports = model("Category", category);