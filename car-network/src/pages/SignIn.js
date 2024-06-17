import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const { supabase, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn(email, password)
      console.log("Sign in successful")
      console.log(data)
    
      navigate('/home')
    } catch (error) {
      console.log('error signing in', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
