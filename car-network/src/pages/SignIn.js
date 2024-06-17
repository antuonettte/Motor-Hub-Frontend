import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

const SignIn = () => {
  const { supabase } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      console.log(data)
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  return (
    <div>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
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
