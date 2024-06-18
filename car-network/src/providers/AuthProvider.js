// src/AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Cookies from 'js-cookie'
import useLocalStorage from '../hooks/UseLocalStorage.jsx'

const supabaseUrl = 'https://uowsptyxrtvwphotngro.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvd3NwdHl4cnR2d3Bob3RuZ3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0ODg2MjUsImV4cCI6MjAzNDA2NDYyNX0.EShLjUxjMC2e3xbQXHZ3puMrnCVmFXT_xyemGEtD0E8';
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log("Auth Change: ", _event)
        if (_event == 'SIGNED_OUT'){
            setSession(null)
        } else if (session){
            setSession(session)
        } else if (_event == 'TOKEN_REFRESHED'){
          localStorage.setItem('access_token', session.access_token)
          console.log("Token Refresh session", session)

        } else if (_event == 'SIGNED_IN'){
          console.log('Sign In Session', session)
          setUser(session?.user || null)
          localStorage.setItem('access_token', session.access_token)
          console.log(session.access_token)
        }
      })

      return () => subscription.unsubscribe()
  }, []);

  const signIn = async ( email, password ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password 
    });
    if (data.user){
      setUser(data.user)
    }else{
      setUser(null)
    }
    if (error) throw error;

    const token = data.session.access_token
    localStorage.setItem('access_token', token)
    return data;
  };

  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
      });

    if (error) throw error;
    return data
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null)
  };

  const value = {
    session,
    supabase,
    signIn,
    signOut,
    signUp,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
