import React, {useState} from "react";
import { logInUser } from "../utils/api";

function Login(){
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const {username, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e =>{
        e.preventDefault();
        const res = await logInUser(username, password);
        if (res.token){
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', res.role);
            window.location.href = '/';
        }
    };
    return(
        <div>
            <div>
                <form onSubmit = {onSubmit}>
                    <input type = "text" placeholder = "Username" name = "username" value = {username} onChange = {onChange} required/>
                    <input type = "password" placeholder = "Password" name = "password" value={password} onChange = {onChange} required />
                    <button type = "submit">Login</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Login;