export async function getRooms(){
    const res = await fetch("http://localhost:5000/routes/rooms/allrooms");
    return res.json();
}

export async function getRoom(room_id){
    const res = await fetch(`http://localhost:5000/api/rooms/getroom/${room_id}`);
    return res.json();
}

export async function createRoom(username, room_id, name, capacity, operatingHours){
    const res = await fetch(`http://localhost:5000/api/rooms/newroom/${username}/${room_id}/${name}/${capacity}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({operatingHour})
    });
    return res.json();
}

export async function editRoom(username, room_id, name, capacity, operatingHours){
    const res = await fetch(`http://localhost:5000/api/rooms/editroom/${username}/${room_id}/${name}/${capacity}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({operatingHours})
    });
    return res.json();
}

export async function deleteRoom(username, room_id){
    const res = await fetch(`http://localhost:5000/api/rooms/deleteroom/${username}/${room_id}`,{
        method: "DELETE"
    });
    return res.json();
}

// create a new booking
export async function createBooking(username, room_id, startTime, endTime){
    const res = await fetch(`http://localhost:5000/api/bookings/newbooking/${username}/${room_id}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({startTime, endTime})
    });
    return res.json();
}

// confirm a booking
export async function confirmBooking(username, booking_id){
    const res = await fetch(`http://localhost:5000/api/bookings/confirmbooking/${username}/${booking_id}`,{
        method: "PUT"
    });
    return res.json();
}

// cancel a booking
export async function cancelBooking(username, booking_id){
    const res = await fetch(`http://localhost:5000/api/bookings/cancelbooking/${username}/${booking_id}`,{
        method: "PUT"
    });
    return res.json();
}

// get all bookings for a room
export async function getRoomBookings(room_id){
    const res = await fetch(`http://localhost:5000/api/bookings/getbookings/${room_id}`);
    return res.json();
}

// get all bookings for a user
export async function getMyBookings(username){
    const res = await fetch(`http://localhost:5000/api/bookings/mybookings/${username}`);
    return res.json();
}