const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

//register a new user
router.post("/register", async (req, res) =>{
    try{
        //get the username and password from request body
        const {username, password} = req.body;

        //check if the username is taken
        let user = await User.findOne({username});
        if(user) {
            return res.status(400).json({msg: "User already exits"});
        }

        //create a new user with username and password, role defaults to tentative
        user = new User({username, password});

        //generate salt and hash password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save user to database
        await user.save();

        //built JWT payload with user info
        const payload = {
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        };

        //sign the token with the secret key, expires in 1 hour
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
        //return token and role to the client
        res.status(201).json({token, role: user.role});
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

//login authentication
router.post("/login", async (req, res) =>{
    try{

        const {username, password} = req.body;
        //find user by username
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({msg: "Invalid Username"});
        }
        
        //compare password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid Password"})
        }
        //build JWT payload
        const payload = {
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        }
        //sign token with secret key, expires in 1 hour
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
        //return token and role to client
        res.status(200).json({token, role: user.role});
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
})

module.exports = router;