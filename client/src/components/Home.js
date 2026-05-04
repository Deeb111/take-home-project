import React, {useEffect, useState} from "react";
import {getRooms} from "../utils/api";

function Home(){
    const [rooms, setRooms] = useState([]);
    useEffect(() =>{
        async function loadRooms(){
            const res = await getRooms();
            setRooms(res);
        }
        loadRooms();
    }, []);

    return(
        <div>
            {rooms.map(room => (
                <div key={room.room_id}>
                    <p>{room.name}</p>
                    <p>{room.capacity}</p>
                    <p>{room.operatingHours.open}</p>
                    <p>{room.operatingHours.close}</p>
                    <p>{room.operatingHours.days}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
