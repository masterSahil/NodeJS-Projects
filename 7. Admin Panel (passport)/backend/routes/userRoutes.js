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

router.get("/logout", userController.logout);   

router.get("/auth-check", userController.AuthCheck);

module.exports = router;