const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    name: {
        type: String,
        required: [true, "Library name is required"],
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Library", LibrarySchema);
