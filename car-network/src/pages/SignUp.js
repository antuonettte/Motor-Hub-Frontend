// src/SignUp.js
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        }
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  return (
    <div>
      <input
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
