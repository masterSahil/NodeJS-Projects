const User = require("../model/userSchema");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const { hashPassword, comparePassword, generateToken } = require("../services/authService");
const sendEmail = require("../services/emailService");

 
const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone, role, flatId } = req.body;

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "A user with this email already exists.");
    }

 
    const hashedPassword = await hashPassword(password);

 
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: role || "resident",
        flatId: flatId || undefined,
    });

 
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(
        new ApiResponse(201, { user: userResponse }, "User registered successfully.")
    );
});

 
 
 
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password.");
    }

 
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated. Contact admin.");
    }

 
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password.");
    }

 
    const token = generateToken({ id: user._id, role: user.role });

 
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(
        new ApiResponse(200, { user: userResponse, token }, "Login successful.")
    );
});

 
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
        .select("-password")
        .populate("flatId");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    res.status(200).json(
        new ApiResponse(200, { user }, "Profile fetched successfully.")
    );
});

 
const updateProfile = asyncHandler(async (req, res) => {
    const { name, phone } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;

 
    if (req.file) {
        updateData.profileImage = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateData },
        { returnDocument: 'after', runValidators: true }
    ).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    res.status(200).json(
        new ApiResponse(200, { user }, "Profile updated successfully.")
    );
});

 
 
 
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

 
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

 
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
        throw new ApiError(400, "Current password is incorrect.");
    }

 
    if (currentPassword === newPassword) {
        throw new ApiError(400, "New password must differ from the current password.");
    }

 
    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json(
        new ApiResponse(200, null, "Password changed successfully.")
    );
});

 
 
 
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
 
        return res.status(200).json(
            new ApiResponse(200, null, "If that email exists, an OTP has been sent.")
        );
    }

 
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = otpExpires;
    await user.save();

 
    console.log(`\n=================================================`);
    console.log(`[Email Simulation] OTP for ${email}: ${otp}`);
    console.log(`=================================================\n`);

    try {
        const message = `Your password reset OTP is: ${otp}. It is valid for 2 minutes.\n\nIf you did not request this, please ignore this email.`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Password Reset Request</h2>
                <p>We received a request to reset your password. Here is your One-Time Password (OTP):</p>
                <h1 style="letter-spacing: 5px; color: #4F46E5;">${otp}</h1>
                <p>This OTP is valid for <strong>2 minutes</strong>.</p>
                <p>If you did not request a password reset, you can safely ignore this email.</p>
            </div>
        `;
        
        await sendEmail({
            email: user.email,
            subject: 'Password Reset OTP - Society Management',
            message,
            html,
        });
    } catch (err) {
        console.error("Email could not be sent:", err);
 
 
    }

    res.status(200).json(
        new ApiResponse(200, { otp }, "If that email exists, an OTP has been sent.")
    );
});

 
 
 
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid email or OTP.");
    }

    if (user.resetPasswordOtp !== otp) {
        throw new ApiError(400, "Invalid OTP.");
    }

    if (user.resetPasswordOtpExpires < new Date()) {
        throw new ApiError(400, "OTP has expired.");
    }

 
    res.status(200).json(
        new ApiResponse(200, null, "OTP verified successfully. You can now reset your password.")
    );
});

 
 
 
const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid email or OTP.");
    }

    if (user.resetPasswordOtp !== otp) {
        throw new ApiError(400, "Invalid OTP.");
    }

    if (user.resetPasswordOtpExpires < new Date()) {
        throw new ApiError(400, "OTP has expired.");
    }

 
    user.password = await hashPassword(newPassword);
    
 
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    
    await user.save();

    res.status(200).json(
        new ApiResponse(200, null, "Password reset successfully. You can now log in.")
    );
});

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    verifyOtp,
    resetPassword,
};
