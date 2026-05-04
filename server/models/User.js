const mongoose = require("mongoose");

//define rules of User in mongodb
const UserSchema = new mongoose.Schema({ 
    //unique username required
    username: {type: String, required: true, index: true}, 
    //password required
    password: {type: String, required: true}, 
    //role is either admin or member, defaults to member
    role: {type: String, enum: ["admin", "member"], default: "member"} 
});

UserSchema.index({username: 1}, {unique:true});

//create user model
const User = mongoose.model("User", UserSchema); 

//export user model for other files to import and access
module.exports = User; 