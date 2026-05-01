const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

router.post("/register", async (req, res) =>{
    try{
        const {username, password} = req.body;

        let user = await User.findOne({username});
        if(user) {
            return res.status(400).json({msg: "User already exits"});
        }

        user = new User({username, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(201).json({token, role: user.role});
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

router.post("/login", async (req, res) =>{
    try{
        const {username, password} = req.body;

        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({msg: "Invalid Username"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid Password"})
        }
        
        const payload = {
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({token, role: user.role});
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
})

module.exports = router;