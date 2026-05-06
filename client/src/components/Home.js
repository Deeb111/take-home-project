import React from "react";

function Home(){
    return(
        <div>
           <h1>Room Booking System</h1>
            <a href="/rooms"><button>Browse Rooms</button></a>
            <a href="/mybookings"><button>My Bookings</button></a>
            <a href="/login"><button>Login</button></a>
            <a href="/register"><button>Register</button></a>
        </div>
    );
}

export default Home;
