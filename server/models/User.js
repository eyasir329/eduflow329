const mongoose = require("mongoose");

const JZSUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true });

const JZSUserModel = mongoose.model("SchoolUser", JZSUserSchema);
module.exports = JZSUserModel;
