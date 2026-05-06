import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {getRoom, getRoomBookings, createBooking, confirmBooking, cancelBooking} from "../utils/api";
import {io} from "socket.io-client";

function RoomSchedule(){
    const {room_id} = useParams();
    const [room, setRoom] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");
    const username = localStorage.getItem("username");

    useEffect(() =>{
        loadRoom();
        loadBookings();

        const socket = io("http://localhost:5000");
        socket.emit("joinRoom", room_id);
        socket.on("bookingUpdate", () =>{
            loadBookings();
        });

        return () =>{
            socket.emit("leaveRoom", room_id);
            socket.disconnect();
        };
    }, [room_id]);

    async function loadRoom(){
        const data = await getRoom(room_id);
        setRoom(data);
    }

    async function loadBookings(){
        const data = await getRoomBookings(room_id);
        setBookings(data);
    }

    async function handleBook(){
        const data = await createBooking(username, room_id, startTime, endTime);
        if (data.msg){
            setMessage(data.msg);
        } 
        else{
            setMessage("Booking created - you have 10 minutes to confirm");
            loadBookings();
        }
    }

    async function handleConfirm(booking_id){
        await confirmBooking(username, booking_id);
        loadBookings();
    }

    async function handleCancel(booking_id){
        await cancelBooking(username, booking_id);
        loadBookings();
    }

    if (!room) return null;

    return(
        <div>
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <p>Hours: {room.operatingHours.open} - {room.operatingHours.close}</p>

            <h3>Book this room</h3>
            <input type = "datetime-local" value = {startTime} onChange = {(e) => setStartTime(e.target.value)}/>
            <input type = "datetime-local" value = {endTime} onChange = {(e) => setEndTime(e.target.value)}/>
            <button onClick = {handleBook}>Book</button>
            {message && <p>{message}</p>}

            <h3>Bookings</h3>
            {bookings.map(booking =>(
                <div key = {booking._id}>
                    <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
                    <p>End: {new Date(booking.endTime).toLocaleString()}</p>
                    <p>Status: {booking.status}</p>
                    <p>User: {booking.user.username}</p>
                    {booking.user.username === username && booking.status === "tentative" && (
                        <button onClick={() => handleConfirm(booking._id)}>Confirm</button>
                    )}
                    {booking.user.username === username && booking.status !== "canceled" && (
                        <button onClick={() => handleCancel(booking._id)}>Cancel</button>
                    )}
                    <hr/>
                </div>
            ))}
        </div>
    );
}

export default RoomSchedule;