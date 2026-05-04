import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";

function App(){
    return(
        <Routes>
            <Route path = "/" element={<Home/>}/>
        </Routes>
    )
}
export default App;