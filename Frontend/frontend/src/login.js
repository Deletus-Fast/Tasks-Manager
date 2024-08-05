import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 
const login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //use localstorage to store user, forget about the token
    const handleLogin = async (e) => {
        setError('');
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/login', { name, password });
            const { token, user } = response.data;
            console.log(response.data);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // setUser(response.data.user);
            window.location.href = '/';
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default login;
