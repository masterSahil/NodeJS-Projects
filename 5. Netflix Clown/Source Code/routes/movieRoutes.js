const express = require("express");
const router = express.Router();
const {getMovies, createMovie, deleteMovie, updateMovie} = require("../controllers/movieController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({storage: storage});

router.get("/", getMovies);
router.post("/", upload.single('poster'), createMovie);
router.post("/update/:id", upload.single('poster'), updateMovie);
router.get("/delete/:id", deleteMovie);

module.exports = router;