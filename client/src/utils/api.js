export async function getRooms(){
    const res = await fetch("http://localhost:5000/routes/rooms/allrooms");
    return res.json();
}