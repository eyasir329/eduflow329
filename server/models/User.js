const mongoose = require("mongoose");

const JZSUserSchema = new mongoose.Schema({
    userId : String,
    fName : String,
    lName : String,
    gender : {
        type :String,
        default :"N/A"
    },
    email : String,
    phone : String,
    password : String,
    scecurityQuestion : String,
    role : String
});

const JZSUserModel = mongoose.model("users",JZSUserSchema);
module.exports = JZSUserModel;
