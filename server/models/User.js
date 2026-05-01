const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({ //define rules of User in mongodb
    username: {type: String, required: true, unique: true}, //unique username required
    password: {type: String, required: true}, //password required
    role: {type: String, enum: ["admin", "member"], default: "member"} //role is either admin or member, defaults to member
})

const User = mongoose.model("User", UserSchema); //create user model

module.exports = User; //export user model for other files to import and access