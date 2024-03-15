const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: [15, "Username cannot exceed 15 characters"],
        required: [true, "Must provide username"],
    },
    email: { type: String },
    password: { type: String, required: [true, "Must provide password"] },
    library: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    friends: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    following: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    popularity: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
    try {
        if (!this.accountPassword.startsWith("$2b$")) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(
                this.accountPassword,
                salt
            );
            this.accountPassword = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.accountPassword);
};

module.exports = mongoose.model("User", UserSchema);
