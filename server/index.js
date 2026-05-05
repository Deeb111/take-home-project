console.log("Starting server...");
const express = require("express"); 
const mongoose = require("mongoose"); 
const dotenv = require("dotenv"); 
const cors = require("cors");
const authRoutes = require("./routes/auth");
const roomsRoutes = require("./routes/rooms");
const bookingRoutes = require("./routes/bookings");
dotenv.config(); 

//create express instance
const app = express(); 

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

app.listen(5000, "0.0.0.0", () => console.log("Server running at port 5000"));