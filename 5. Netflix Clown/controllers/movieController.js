const movieSchema = require("../model/movie");
const fs = require("fs")
const path = require("path")

module.exports.getMovies = async (req, res) => {
    try {
        const movie = await movieSchema.find();

        res.status(200).json({
            success: true,
            movies: movie
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.createMovie = async (req, res) => {
    try {
        const {poster, title, year, genre, director, rating, duration, description} = req.body;

        genre = genre.split(",").map(g => g.trim());
        director = director.split(",").map(item => item.trim());
        
        const newMovie = new movieSchema({poster: req.file ? `/upload/${req.file.filename}` : null, title, year, genre, director, rating, duration, description});
        await newMovie.save();

        res.redirect("/");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.updateMovie = async (req, res) => {
    try {
        let { title, year, genre, director, rating, duration, description } = req.body;

        genre = genre.split(",").map(g => g.trim());
        director = director.split(",").map(d => d.trim());

        const movie = await movieSchema.findById(req.params.id);
        let updateData = { title, year, genre, director, rating, duration, description };

        if (req.file) {
            if (movie.poster) {
                const oldPath = path.join(__dirname, "..", movie.poster);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updateData.poster = `/upload/${req.file.filename}`;
        }
        await movieSchema.findByIdAndUpdate(req.params.id, updateData);

        res.redirect("/movies");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports.deleteMovie = async (req, res) => {
    try {
        const movie = await movieSchema.findById(req.params.id);

        if (movie.poster) {
            const filePath = path.join(__dirname, "..", movie.poster);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        await movieSchema.findByIdAndDelete(req.params.id);

        res.redirect("/movies");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};