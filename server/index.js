console.log("Starting server...");
const express = require("express"); 
const mongoose = require("mongoose"); 
const dotenv = require("dotenv"); 

const authRoutes = require("./routes/auth");
const roomsRoutes = require("./routes/rooms");
dotenv.config(); 

//create express instance
const app = express(); 

//tell express to parse json request bodies
app.use(express.json()); 

//connect to MongoDB using .env connection string
mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use("/routes/auth", authRoutes);
app.use("/routes/rooms", roomsRoutes);

app.listen(5000, "0.0.0.0", () => console.log("Server running at port 5000"));