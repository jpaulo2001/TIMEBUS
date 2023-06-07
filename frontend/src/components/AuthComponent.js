import React, { useState } from 'react';
import axios from 'axios';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password
      });
      // Handle the response as per your requirement (e.g., store tokens)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        email,
        password
      });
      // Handle the response as per your requirement (e.g., show success message)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <h2>Register</h2>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default AuthComponent;