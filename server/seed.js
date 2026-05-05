const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const Room = require("./models/Room");
const Booking = require("./models/Booking");

dotenv.config();

const seed = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // clear data
        await User.deleteMany();
        await Room.deleteMany();
        await Booking.deleteMany();
        console.log("Deleted all existing data");

        const adminPassword = await bcrypt.hash("admin123", 10);
        const memberPassword = await bcrypt.hash("member123", 10);

        //create users
        const admin = await User.create({
            username: "admin",
            password: adminPassword,
            role: "admin"
        });

        const member1 = await User.create({
            username: "john",
            password: memberPassword,
            role: "member"
        });

        const member2 = await User.create({
            username: "mike",
            password: memberPassword,
            role: "member"
        });

        console.log("Users created");
        
        // create rooms
        const room1 = await Room.create({
            room_id: 101,
            name: "Conference Room A",
            capacity: 10,
            operatingHours:{
                open: "09:00",
                close: "17:00",
                days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
            }
        });

        const room2 = await Room.create({
            room_id: 201,
            name: "Conference Room B",
            capacity: 15,
            operatingHours:{
                open: "09:00",
                close: "17:00",
                days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
            }
        });

        const room3 = await Room.create({
            room_id: 301,
            name: "Meeting Room",
            capacity: 5,
            operatingHours:{
                open: "09:00",
                close: "17:00",
                days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
            }
        });

        console.log("Rooms created");

        //create bookings
        await Booking.create({
            room: room1._id,
            user: member1._id,
            startTime: new Date("2026-05-06T09:00:00"),
            endTime: new Date("2026-05-06T10:00:00"),
            status: "confirmed",
            holdTime: null
        });

        await Booking.create({
            room: room1._id,
            user: member2._id,
            startTime: new Date("2026-05-06T11:00:00"),
            endTime: new Date("2026-05-06T12:00:00"),
            status: "tentative",
            holdTime: new Date(Date.now() + 10 * 60 * 1000)
        });

        await Booking.create({
            room: room2._id,
            user: member1._id,
            startTime: new Date("2026-05-07T14:00:00"),
            endTime: new Date("2026-05-07T15:00:00"),
            status: "confirmed",
            holdTime: null
        });

        await Booking.create({
            room: room3._id,
            user: member2._id,
            startTime: new Date("2026-05-05T10:00:00"),
            endTime: new Date("2026-05-05T11:00:00"),
            status: "canceled",
            holdTime: null
        });

        console.log("Bookings created");
        console.log("Seed complete");
        process.exit(0);
    }
    catch (err){
        console.log(err);
        process.exit(1);
    }
};

seed();