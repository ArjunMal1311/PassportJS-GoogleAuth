const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    picture: {
        type: String
    }
});

module.exports = mongoose.model("User", UserSchema);
