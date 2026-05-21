const UserSchema = require("../model/user");
const bcrypt = require("bcrypt")
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const sendEmail = require('../config/nodemailer');

exports.getUser = async (req, res) => {
    try {
        const user = await UserSchema.find();

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id);

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const {name, email, password, phone, role, image} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserSchema.create({name, email, password: hashPassword, phone, role, 
            image: req.file ? `/uploads/${req.file.filename}` : null});

        res.status(201).json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const user = await UserSchema.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let updatedImage = user.image;

        if (req.file) {
            if (user.image) {
                const oldPath = path.join(__dirname, "..", user.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updatedImage = `/uploads/${req.file.filename}`;
        }

        let updatedPassword = user.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id, 
            {name, email, password:updatedPassword, phone, role, image: updatedImage}, {returnDocument: 'after'});

        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserSchema.findByIdAndDelete(req.params.id);

        if (user.image) {
            const oldPath = path.join(__dirname, "..", user.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.Register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserSchema.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await UserSchema.create({ email, password: hashPassword });

        res.status(201).json({
            success: true,
            message: "Registered successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.login = (req, res, next) => {
    try {
        passport.authenticate("local", (err, user) => {
            if (err) return res.status(500).json({ error: err });
    
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }
    
            req.login(user, (err) => {
                if (err) return next(err);
    
                return res.status(200).json({
                    success: true,
                    message: "Logged in",
                    user
                });
            });
        })(req, res, next);
    } catch (error) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.AuthCheck = (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    }

    return res.status(401).json({
        success: false,
        message: "Not logged in",
    });
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed"
            });
        }

        req.session.destroy(() => {
            res.clearCookie("connect.sid"); 
            return res.status(200).json({
                success: true,
                message: "Logged out successfully"
            });
        });
    });
};

exports.changePassword = async (req, res) => {
    try {
        const {id} = req.params;
        const {currentPassword, newPassword} = req.body;

        const user = await UserSchema.findById(id);

        const passwordCheck = await bcrypt.compare(currentPassword, user.password);
        if (!passwordCheck) {
            return res.status(409).json({
                success: false,
                message: "Current Password is Invalid",
            })
        }

        if (currentPassword === newPassword) {
            return res.status(501).json({
                success: false,
                message: "New Password Shouldn't Be Same as Current Password",
            });
        }

        const hashed = await bcrypt.hash(newPassword, 10)
        await UserSchema.findByIdAndUpdate(id, {password: hashed});

        res.status(204).json({
            success: true,
            message: "Password Updated Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await UserSchema.findOne({ email, resetPasswordOtp: otp,
            resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired OTP"
            });
        }

        res.status(200).json({
            success: true,
            message: "OTP Verified Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No user found with this email" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordOtp = otp;
        user.resetPasswordExpires = Date.now() + 2 * 60 * 1000;
        await user.save();

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-w-md; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2563eb; text-align: center;">Reset Your Password</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. Here is your One-Time Password (OTP):</p>
                <div style="background-color: #f3f4f6; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
                <h1 style="letter-spacing: 5px; color: #1f2937; margin: 0;">${otp}</h1>
                </div>
                <p>This OTP is valid for <strong>2 minutes</strong>. Do not share it with anyone.</p>
                <p>If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
        `;

        await sendEmail({ email: email, subject: 'Password Reset OTP - Admin Panel', html: emailHtml });

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully to your email'
        });
    } catch (error) {
        console.error("Forgot Password Error:", error);

        user.resetPasswordOtp = undefined;
        user.resetPasswordExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500).json({
            success: false,
            message: 'There was an error sending the email. Try again later.'
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await UserSchema.findOne({email, resetPasswordOtp: otp, resetPasswordExpires: 
            { $gt: Date.now() }});

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired or Invalid"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}