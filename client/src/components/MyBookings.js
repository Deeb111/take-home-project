import React, {useState, useEffect} from "react";
import {getMyBookings, confirmBooking, cancelBooking, editBooking} from "../utils/api";

function MyBookings(){
    const [bookings, setBookings] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newStart, setNewStart] = useState("");
    const [newEnd, setNewEnd] = useState("");
    const username = localStorage.getItem("username");

    useEffect(() =>{
        async function loadBookings(){
            const data = await getMyBookings(username);
            setBookings(data);
        }
        loadBookings();
    }, []);

    const upcoming = bookings.filter(b => new Date(b.startTime) >= new Date() && b.status !== "canceled");
    const past = bookings.filter(b => new Date(b.startTime) < new Date() || b.status === "canceled");

    async function handleConfirm(booking_id){
        await confirmBooking(username, booking_id);
        const data = await getMyBookings(username);
        setBookings(data);
    }

    async function handleCancel(booking_id){
        await cancelBooking(username, booking_id);
        const data = await getMyBookings(username);
        setBookings(data);
    }

    async function handleEdit(booking_id){
        await editBooking(username, booking_id, newStart, newEnd);
        setEditingId(null);
        const data = await getMyBookings(username);
        setBookings(data);
    }

    return(
        <div>
            <h2>My Bookings</h2>
            <h3>Upcoming</h3>
            {upcoming.length === 0 && <p>No upcoming bookings</p>}
            {upcoming.map(booking =>(
                <div key={booking._id}>
                    <p>Room: {booking.room.name}</p>
                    <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
                    <p>End: {new Date(booking.endTime).toLocaleString()}</p>
                    <p>Status: {booking.status}</p>
                    {booking.status === "tentative" && (
                        <button onClick={() => handleConfirm(booking._id)}>Confirm</button>
                    )}
                    {booking.status !== "canceled" && (
                        <button onClick={() => handleCancel(booking._id)}>Cancel</button>
                    )}
                    {booking.status !== "canceled" && (
                        <button onClick = {() => setEditingId(booking._id)}>Edit</button>
                    )}
                    {editingId === booking._id &&(
                        <div>
                            <input type = "datetime-local" value = {newStart} onChange = {(e) => setNewStart(e.target.value)}/>
                            <input type = "datetime-local" value = {newEnd} onChange = {(e) => setNewEnd(e.target.value)}/>
                            <button onClick = {() => handleEdit(booking._id)}>Save</button>
                            <button onClick = {() => setEditingId(null)}>Close</button>
                        </div>
                    )}
                    <hr/>
                </div>
            ))}
            <h3>Past</h3>
            {past.length === 0 && <p>No past bookings</p>}
            {past.map(booking =>(
                <div key={booking._id}>
                    <p>Room: {booking.room.name}</p>
                    <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
                    <p>End: {new Date(booking.endTime).toLocaleString()}</p>
                    <p>Status: {booking.status}</p>
                    <hr/>
                </div>
            ))}
        </div>
    );
}

export default MyBookings;