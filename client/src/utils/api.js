// get all rooms
export async function getRooms(){
    const res = await fetch("http://localhost:5000/routes/rooms/allrooms");
    return res.json();
}
// get room by id
export async function getRoom(room_id){
    const res = await fetch(`http://localhost:5000/routes/rooms/getroom/${room_id}`);
    return res.json();
}
// create new room
export async function createRoom(username, room_id, name, capacity, operatingHours){
    const res = await fetch(`http://localhost:5000/routes/rooms/newroom/${username}/${room_id}/${name}/${capacity}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({operatingHours})
    });
    return res.json();
}
// edit room
export async function editRoom(username, room_id, name, capacity, operatingHours){
    const res = await fetch(`http://localhost:5000/routes/rooms/editroom/${username}/${room_id}/${name}/${capacity}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({operatingHours})
    });
    return res.json();
}
// delete room
export async function deleteRoom(username, room_id){
    const res = await fetch(`http://localhost:5000/routes/rooms/deleteroom/${username}/${room_id}`,{
        method: "DELETE"
    });
    return res.json();
}

// create a new booking
export async function createBooking(username, room_id, startTime, endTime){
    const res = await fetch(`http://localhost:5000/routes/bookings/newbooking/${username}/${room_id}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({startTime, endTime})
    });
    return res.json();
}

// confirm a booking
export async function confirmBooking(username, booking_id){
    const res = await fetch(`http://localhost:5000/routes/bookings/confirmbooking/${username}/${booking_id}`,{
        method: "PUT"
    });
    return res.json();
}

// cancel a booking
export async function cancelBooking(username, booking_id){
    const res = await fetch(`http://localhost:5000/routes/bookings/cancelbooking/${username}/${booking_id}`,{
        method: "PUT"
    });
    return res.json();
}

// get all bookings for a room
export async function getRoomBookings(room_id){
    const res = await fetch(`http://localhost:5000/routes/bookings/getbookings/${room_id}`);
    return res.json();
}

// get all bookings for a user
export async function getMyBookings(username){
    const res = await fetch(`http://localhost:5000/routes/bookings/mybookings/${username}`);
    return res.json();
}
//login user
export async function logInUser(username, password){
    const res = await fetch("http://localhost:5000/routes/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}
// register user
export async function registerUser(username, password){
    const res = await fetch("http://localhost:5000/routes/auth/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

//edit a booking
export async function editBooking(username, booking_id, startTime, endTime){
    const res = await fetch(`http://localhost:5000/routes/bookings/editbooking/${username}/${booking_id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({startTime, endTime})
    });
    return res.json();
}