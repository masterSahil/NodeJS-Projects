const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const uploads = multer({storage});

router.get("/user", userController.getUser);
router.get("/user/:id", userController.getSingleUser);
router.post("/user", uploads.single('image'), userController.createUser);
router.put("/user/:id", uploads.single('image'), userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

// login and signup
router.post("/signup", userController.Register);
router.post("/login", userController.login);

// logout
router.get("/logout", userController.logout);   

// checking authentication
router.get("/auth-check", userController.AuthCheck);

// change password
router.patch("/users/:id/password", userController.changePassword);

// nodemailer
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOtp);
router.post("/reset-password", userController.resetPassword);

module.exports = router;