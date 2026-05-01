console.log("Starting server...");
//load express
const express = require("express"); 
//load mongoose
const mongoose = require("mongoose"); 
//load dotenv
const dotenv = require("dotenv"); 
//execute dotenv making variables available
dotenv.config(); 

//create express instance
const app = express(); 

//tell express to parse json request bodies
app.use(express.json()); 

//connect to MongoDB using .env connection string
mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.listen(5000, "0.0.0.0", () => console.log("Server running at port 5000"));