const express = require("express");
const Room = require("../models/Room.js");
const User = require("../models/User.js");
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
router.get("/getroom/:room_id", async (req, res) =>{
    try{
        const {room_id} = req.params;
        const room = await Room.findOne({room_id: room_id});

        if(!room){
            return res.status(404).json({msg: "Room not found"});
        }
        res.status(200).json(room);
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

//create new room, must be an admin
router.post("/newroom/:username/:room_id/:name/:capacity", async (req, res) =>{
    try{
        const {username, room_id, name, capacity} = req.params;
        const {operatingHours} = req.body;
        const user = await User.findOne({username: username});

        if (!user){
            return res.status(404).json({msg: "User not found"});
        }

        if (user.role !== "admin"){
            return res.status(403).json({msg: "Admin use only"});
        }

        const room = new Room({
            room_id,
            name,
            capacity,
            operatingHours
        });

        await room.save();

        res.status(201).json({msg: "Room created successfully"});
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }    
});

//edit rooms, must be admin
router.put("/editroom/:username/:room_id/:name/:capacity", async (req, res) =>{
    try{
        const {username, room_id, name, capacity} = req.params;
        const {operatingHours} = req.body;
        const user = await User.findOne({username: username});

        if (!user){
            return res.status(404).json({msg: "User not found"});
        }

        if (user.role !== "admin"){
            return res.status(403).json({msg: "Admin use only"});
        }

        const room = await Room.findOneAndUpdate({room_id: room_id}, {name, capacity, operatingHours}, {new: true});

        if (!room){
            return res.status(404).json({msg: "Room not found"});
        }
        res.status(200).json(room);
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

//delete rooms, must be admin
router.delete("/deleteroom/:username/:room_id", async (req, res) =>{
    try{
        const {username, room_id} = req.params;
        const user = await User.findOne({username: username});

        if (!user){
            return res.status(404).json({msg: "User not found"});
        }

        if (user.role !== "admin"){
            return res.status(403).json({msg: "Admin use only"});
        }

        const room = await Room.findOneAndDelete({room_id: room_id});

        if (!room){
            return res.status(404).json({msg: "Room not found"});
        }

        res.status(200).json({ msg: "Room deleted successfully" });
    }
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

module.exports = router;