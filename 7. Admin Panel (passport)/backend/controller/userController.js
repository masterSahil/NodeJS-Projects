const UserSchema = require("../model/user");
const bcrypt = require("bcrypt")
const fs = require("fs");
const path = require("path");
const passport = require("passport");

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