const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    room_id: {type: String, required: true, index: true},
    name: {type:String, required: true},
    capacity: {type: Number, required: true},
    operatingHours: {
        open: {type: String, required: true},
        close: {type: String, required: true},
        days: {type: [String], required: true}
    }
})

RoomSchema.index({room_id: 1}, {unique: true});
const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;