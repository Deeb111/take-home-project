const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    //reference to room booked
    room: {type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true}, 
    //refence to user booking
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, 
    //only 3 possible states, default tentative
    status: {type: String, enum: ["tentative", "confirmed", "canceled"], default: "tentative"}, 
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    holdTime: {type: Date}
})

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;