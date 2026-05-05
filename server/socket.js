const socketIO = require("socket.io");

let io;

const initSocket = (server) =>{
    io = socketIO(server,{
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) =>{
        console.log("Client connected:", socket.id);

        socket.on("joinRoom", (room_id) =>{
            socket.join(room_id);
            console.log(`Client joined room: ${room_id}`);
        });

        socket.on("leaveRoom", (room_id) =>{
            socket.leave(room_id);
            console.log(`Client left room:, ${room_id}`);
        });

        socket.on("disconnect", () =>{
            console.log("Client disconnected:", socket.id);
        });
    });
};

const liveUpdate = (room_id, booking) =>{
    if (io){
        io.to(room_id).emit("bookingUpdate", booking);
    }
};

module.exports = {initSocket, liveUpdate};