console.log("Starting server...");
const express = require("express"); 
const mongoose = require("mongoose"); 
const dotenv = require("dotenv"); 
const cors = require("cors");
const authRoutes = require("./routes/auth");
const roomsRoutes = require("./routes/rooms");
const bookingRoutes = require("./routes/bookings");
const Booking = require("./models/Booking");
const {initSocket} = require("./socket");
const {createServer} = require("node:http");
dotenv.config(); 

//create express instance
const app = express(); 
const server = createServer(app);

//tell express to parse json request bodies
app.use(express.json()); 
app.use(cors({origin: "*"}));
//connect to MongoDB using .env connection string
mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use("/routes/auth", authRoutes);
app.use("/routes/rooms", roomsRoutes);
app.use("/routes/bookings", bookingRoutes);

//runs every 1 minute, in milliseconds to cancel expired tentative bookings
setInterval(async() =>{
    await Booking.updateMany(
        {status: "tentative", holdTime:{$lt: new Date()}},
        {status: "canceled"}
    );
}, 60* 1000);


initSocket(server);
server.listen(5000, () => console.log("Server running at port 5000"));