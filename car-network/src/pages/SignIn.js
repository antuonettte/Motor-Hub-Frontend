// src/SignIn.js
import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';

// let Auth = Amplify.Auth

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const user = await signIn(username, password);
      console.log(user);
    } catch (error) {
      console.log('error signing in', error);
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
      <button onClick={login}>Sign In</button>
    </div>
  );
};

export default SignIn;
