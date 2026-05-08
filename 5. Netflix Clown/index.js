const express = require("express");
const connectDB = require("./config/db");
const movieRouter = require("./routes/movieRoutes");
const Movie = require("./model/movie");
require("dotenv").config();
const path = require("path")

const port = process.env.PORT;
const app = express();

connectDB();

app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use("/upload", express.static("upload"));

app.listen(port, () => {
    console.log(`Server is Running http://localhost:${port}`);
});

app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("index", { movies });
  } catch (error) {
    console.log(error);
    res.send("Error loading movies");
  }
});

app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.render("movies", { movies });
});

app.get("/add", (req, res) => {
    res.render("add-movie");
})

app.get("/view/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render("view", { movie });
  } catch (error) {
    res.send("Movie not found");
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render("edit-movie", { movie });
  } catch (err) {
    res.send("Movie not found");
  }
});

app.use("/api/movies", movieRouter);