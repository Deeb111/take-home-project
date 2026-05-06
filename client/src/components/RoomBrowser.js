import React, {useState, useEffect} from "react";
import {getRooms} from "../utils/api";

function RoomBrowser(){
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");
    const [capacity, setCapacity] = useState("");

    useEffect(() =>{
        async function loadRooms(){
            const data = await getRooms();
            setRooms(data);
        }
        loadRooms();
    }, []);

    const filtered = rooms.filter(room =>{
        const matchName = room.name.toLowerCase().includes(search.toLowerCase());
        const matchCapacity = capacity === "" || room.capacity >= parseInt(capacity);
        return matchName && matchCapacity;
    });

    return(
        <div>
            <h2>Rooms</h2>
            <input placeholder= "Search by name" value = {search} onChange = {(e) => setSearch(e.target.value)}/>
            <input placeholder = "Min capacity" type = "number" value = {capacity} onChange = {(e) => setCapacity(e.target.value)}/>
            {filtered.map(room =>(
                <div key={room.room_id}>
                    <p>{room.name}</p>
                    <p>Capacity: {room.capacity}</p>
                    <p>Hours: {room.operatingHours.open} - {room.operatingHours.close}</p>
                    <p>Days: {room.operatingHours.days.join(", ")}</p>
                    <a href={`/rooms/${room.room_id}`}>View Schedule</a>
                    <hr/>
                </div>
            ))}
        </div>
    );
}

export default RoomBrowser;