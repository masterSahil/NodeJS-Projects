const UserSchema = require("../model/user");
const bcrypt = require("bcrypt")
const fs = require("fs");
const path = require("path");

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
            { name, email, password: updatedPassword,  phone, role, image: updatedImage }, {new: true});

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
        const {email, password} = req.body;
        const user = await UserSchema.findOne({email});
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User Already Exist with this Email",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const registered = await UserSchema.create({ email, password: hashPassword });

        res.cookie("admin", hashPassword, {
            httpOnly: true,       
            secure: false,  
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(201).json({
            success: true,
            registered
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserSchema.findOne({email});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not Exist with this Email",
            })
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(409).json({
                success: false,
                message: "Invalid Password",
            })
        }

        res.cookie("admin", user._id, {
            httpOnly: true,       
            secure: false,  
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            success: true,
            message: "Logged In Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.AuthCheck = async (req, res) => {
    try {
        const userId = req.cookies.admin;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not logged in",
            });
        }

        res.status(200).json({
            success: true,
            token: userId,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.logout = (req, res) => {
    res.clearCookie("admin", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};