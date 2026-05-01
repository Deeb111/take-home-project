const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    room: {type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true}, //reference to room booked
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, //refence to user booking
    status: {type: String, enum: ["tentative", "confirmed", "canceled"], default: "tentative"}, //only 3 possible states, default tentative
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    holdTime: {type: Date}
})

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;