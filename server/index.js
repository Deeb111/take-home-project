console.log("Starting server...");
const express = require("express"); //load express
const mongoose = require("mongoose"); //load mongoose
const dotenv = require("dotenv"); //load dotenv
dotenv.config(); //execute dotenv making variables available

const app = express(); //create express instance

app.use(express.json()); //tell express to parse json request bodies

mongoose.connect(process.env.MONGO_URI) //connect to MongoDB using .env connection string
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.listen(5000, "0.0.0.0", () => console.log("Server running at port 5000"));