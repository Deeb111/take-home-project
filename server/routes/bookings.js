const express = require("express");
const Booking = require("../models/Booking.js");
const User = require("../models/User.js");
const Room = require("../models/Room.js");
const router = express.Router();

//create new booking
router.post("/newbooking/:username/:room_id", async (req, res) =>{
    try{
        const {username, room_id} = req.params;
        const {startTime, endTime} = req.body;

        const user = await User.findOne({username});
        if (!user){
            return res.status(404).json({msg: "User not found"});
        }

        const room = await Room.findOne({room_id});
        if (!room) {
            return res.status(404).json({msg: "Room not found"});
        }

        const start = new Date(startTime);
        const end = new Date(endTime);
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const dayName = days[start.getDay()];

        if (!room.operatingHours.days.includes(dayName)){
            return res.status(400).json({msg: "Room is closed on this day"});
        }

        const startHour = start.getHours() * 60 + start.getMinutes();
        const endHour = end.getHours() * 60 + end.getMinutes();
        const openMinutes = parseInt(room.operatingHours.open.split(":")[0]) * 60 + parseInt(room.operatingHours.open.split(":")[1]);
        const closeMinutes = parseInt(room.operatingHours.close.split(":")[0]) * 60 + parseInt(room.operatingHours.close.split(":")[1]);

        if (startHour < openMinutes || endHour > closeMinutes){
            return res.status(400).json({msg: "Booking is outside operating hours"});
        }

        const conflict = await Booking.findOne({room_id, status: {$in: ["tentative", "confirmed"]}, $or: [{startTime: {$lt: end}, endTime: {$gt: start}}]});

        if (conflict){
            return res.status(400).json({msg: "Room is already booked for this time"});
        }

        const holdTime = new Date(Date.now() + 10 * 60 * 1000);

        const booking = new Booking({
            room: room._id,
            user: user._id,
            startTime,
            endTime,
            holdTime,
            status: "tentative"
        });

        await booking.save();
        res.status(201).json(booking);
    }
    catch (err){
        res.status(500).json({ msg: "Server error" });
    }
});

//confirm booking
router.put("/confirmbooking/:username/:booking_id", async (req, res) => {
    try {
        const {username, booking_id} = req.params;

        const user = await User.findOne({username});
        
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        const booking = await Booking.findById(booking_id);
        if (!booking){
            return res.status(404).json({msg: "Booking not found"});
        }

        if (booking.user.toString() !== user._id.toString()){
            return res.status(403).json({msg: "Not your booking"});
        }

        if (booking.holdTime && booking.holdTime < new Date()){
            return res.status(400).json({msg: "Hold has expired"});
        }

        booking.status = "confirmed";
        booking.holdTime = null;
        await booking.save();

        res.status(200).json(booking);
    } 
    catch (err){
        res.status(500).json({ msg: "Server error"});
    }
});

//cancel a booking
router.put("/cancelbooking/:username/:booking_id", async (req, res) => {
    try {
        const {username, booking_id} = req.params;

        const user = await User.findOne({username});
        if (!user){
            return res.status(404).json({msg: "User not found"});
        }

        const booking = await Booking.findById(booking_id);
        if (!booking){
            return res.status(404).json({msg: "Booking not found"});
        }

        if (booking.user.toString() !== user._id.toString() && user.role !== "admin"){
            return res.status(403).json({msg: "Not your booking"});
        }

        booking.status = "canceled";
        await booking.save();

        res.status(200).json(booking);
    } 
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

//get all bookings for a room
router.get("/getbookings/:room_id", async (req, res) =>{
    try {
        const {room_id} = req.params;

        const room = await Room.findOne({room_id});
        if (!room){
            return res.status(404).json({msg: "Room not found"});
        }

        const bookings = await Booking.find({room: room._id}).populate("user", "username");

        res.status(200).json(bookings);
    } 
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

//get all bookings for a user
router.get("/mybookings/:username", async (req, res) =>{
    try{
        const {username} = req.params;

        const user = await User.findOne({username});
        if (!user){
            return res.status(404).json({msg: "User not found"});
        }

        const bookings = await Booking.find({user: user._id}).populate("room", "name capacity");

        res.status(200).json(bookings);
    } 
    catch (err){
        res.status(500).json({msg: "Server error"});
    }
});

module.exports = router;