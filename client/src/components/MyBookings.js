import React, {useState, useEffect} from "react";
import {getMyBookings, confirmBooking, cancelBooking} from "../utils/api";

function MyBookings(){
    const [bookings, setBookings] = useState([]);
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