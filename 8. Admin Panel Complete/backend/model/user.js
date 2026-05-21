const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {type: String },
    email: {type: String, required: true},
    password: {type: String },
    phone: {type: Number },
    role: {type: String },
    image: {type: String},
    resetPasswordOtp: {type: String},
    resetPasswordExpires: {type: Date},
}, {
    timestamps: true,
});

module.exports = model("userSchema", userSchema);