const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getBooks, createBooks, updateBooks, DeleteBooks, getSingleBooks } = require("../controller/bookController");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage});

router.get("/books", getBooks);
router.get("/books/:id", getSingleBooks);
router.post("/books", upload.single('cover'), createBooks);
router.put("/books/:id", upload.single('cover'), updateBooks);
router.delete("/books/:id", DeleteBooks);

module.exports = router;