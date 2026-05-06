import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import RoomBrowser from "./components/RoomBrowser.js";
import RoomSchedule from "./components/RoomSchedule.js";
import MyBookings from "./components/MyBookings.js";

function App(){
    return(
        <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/register" element={<Register/>}/>
            <Route path = "/rooms" element={<RoomBrowser/>}/>
            <Route path = "/rooms/:room_id" element={<RoomSchedule/>}/>
            <Route path = "/mybookings" element={<MyBookings/>}/>
        </Routes>
    )
}
export default App;