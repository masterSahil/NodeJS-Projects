const bookSchema = require("../model/book")
const fs = require("fs");
const path = require("path");

module.exports.getBooks = async (req, res) => {
    try {
        const book = await bookSchema.find();

        res.status(200).json({
            success: true,
            books: book,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.getSingleBooks = async (req, res) => {
    try {
        const book = await bookSchema.findById(req.params.id);

        res.status(200).json({
            success: true,
            books: book,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.createBooks = async (req, res) => {
    try {
        const {cover, title, author, category, price, quantity, description} = req.body;
        const book = new bookSchema({title, author, category, price, quantity, description, 
            cover: req.file ? req.file.filename : null});

        await book.save();

        return res.redirect("/")
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.updateBooks = async (req, res) => {
    try {
        const { title, author, category, price, quantity, description } = req.body;
        const existingBook = await bookSchema.findById(req.params.id);
        if (!existingBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        const updatedData = { title, author, category, price, quantity, description };
        if (req.file) {
            if (existingBook.cover) {
                const oldImagePath = path.join(__dirname, "..", "uploads", existingBook.cover);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updatedData.cover = req.file.filename;
        }

        const updatedBook = await bookSchema.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        res.status(200).json({
            success: true,
            books: updatedBook,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports.DeleteBooks = async (req, res) => {
    try {
        const book = await bookSchema.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        if (book.cover) {
            const imagePath = path.join(__dirname, "..", "uploads", book.cover);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await bookSchema.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};