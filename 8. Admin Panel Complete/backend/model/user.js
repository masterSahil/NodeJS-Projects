const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String},
    phone: {type: Number},
    role: {type: String, enum: ["user", "admin", "superadmin", "manager"], default: "superadmin"},
    image: {type: String},
    isDeleted: {type: Boolean, default: false},
    resetPasswordOtp: {type: String},
    resetPasswordExpires: {type: Date},
}, {
    timestamps: true,
});

module.exports = model("userSchema", userSchema);