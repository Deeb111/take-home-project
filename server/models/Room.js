const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name: {type:String, required: true},
    capacity: {type: Number, required: true},
    operatingHours: {
        open: {type: String, required: true},
        close: {type: String, required: true},
        days: {type: [String], required: true}
    }
})

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;