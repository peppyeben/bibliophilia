const mongoose = require("mongoose");
const genres = require("../utils/book-genres")
const formats = require("../utils/book-formats")

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    genre: {
        type: String,
        enum: genres,
        required: [true, "Genre is required"],
    },
    format: {
        type: String,
        enum: formats,
        required: [true, "Format is required"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    comments: {
        type: [String],
        default: [],
    },
    bookmarks: {
        type: [Number],
        default: [],
    },
    metadata: {
        isbn: String,
        publisher: String,
        publicationDate: Date,
        language: String,
    },
    uploaderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Book", BookSchema);
