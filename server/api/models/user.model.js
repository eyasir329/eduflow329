const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
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
    profilePicture:{
        type : String,
        default : "https://img.freepik.com/premium-vector/slim-spiration-central-vector-illustration-cartoon_969863-2375.jpg?size=626&ext=jpg"
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model("SchoolUser", UserSchema);
module.exports = UserModel;
