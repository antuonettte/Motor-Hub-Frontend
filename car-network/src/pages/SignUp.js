// src/SignUp.js
import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

const SignUp = () => {
  const { supabase, signUp } = useAuth();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      const data = signUp(email, password)

    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
