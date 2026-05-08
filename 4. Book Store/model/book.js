const {Schema, model} = require("mongoose");

const bookSchema = new Schema({
    cover: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    description: {type: String, required: true},
}, {
    timestamps: true,
})

module.exports = model("Books_Record", bookSchema);