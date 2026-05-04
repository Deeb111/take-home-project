const express = require("express");
const Room = require("../models/Room.js");
const User = require("../models/User.js");
const auth = require("../middleware/auth.js");
const router = express.Router();


//gets all rooms, usable by all user roles
router.get("/allrooms", async (req, res) =>{
    try{
        const rooms = await Room.find();

        res.status(200).json(rooms);
    }
    catch(err){
        res.status(500).json({msg: "Server error"});
    }
});

//gets single room by room id
router.get("/rooms/:room_id", async (req, res) =>{
    try{
        const {room_id} = req.params;
        const room = await Room.findOne({room_id: room_id});

        if(!room){
            return res.status(404).json({msg: "Room not found"});
        }
        res.status(200).json(rooms);
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

//create new room, must be an admin
router.post("/newroom/:username/:name/:capacity", async (req, res) =>{
    try{
        const {username, name, capacity} = req.params;
        const {operatingHours} = req.body;
        const user = await User.findOne({ username: username });

        if (user.role !== "admin"){
            return res.status(403).json({msg: "Admin use only"});
        }

        const room = new Room({
            name,
            capacity,
            operatingHours
        });

        await room.save();

        res.status().json({msg: "Room created successfully"});
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }    
});

module.exports = router;