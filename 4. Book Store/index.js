const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db")
const router = require("./routes/bookRoute")
const bookSchema = require("./model/book")

const port = process.env.PORT;

connectDB();

app.listen(port, ()=> {
    console.log(`Server is Running on http://localhost:${port}`);
})

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use("/uploads", express.static("uploads"));
app.use("/api", router);

app.get("/", async (req, res) => {
    try {
        const books = await bookSchema.find();

        res.render("index", { books });
    } catch (error) {
        res.render("index", { books: [] });
    }
});

app.get("/add", (req, res)=>{
    res.render("add-book");
})

app.get("/manage", async (req, res) => {
    try {
        const books = await bookSchema.find();
        res.render("manage", { books });
    } catch (error) {
        res.render("manage", { books: [] });
    }
});

app.get("/edit/:id", async (req, res) => {
    const book = await bookSchema.findById(req.params.id);
    res.render("edit-book", { book });
});

app.get("/book/:id", async (req, res) => {
    try {
        const book = await bookSchema.findById(req.params.id);
        if (!book) {
            return res.send("Book not found");
        }
        res.render("view-book", { book });
    } catch (error) {
        res.send("Error loading book");
    }
});