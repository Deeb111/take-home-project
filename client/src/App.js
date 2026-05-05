import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";

function App(){
    return(
        <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/login" element={<Login/>}/>
        </Routes>
    )
}
export default App;