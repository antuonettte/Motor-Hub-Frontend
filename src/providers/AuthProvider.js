// src/AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Cookies from 'js-cookie'
import useLocalStorage from '../hooks/UseLocalStorage.jsx'
import { createUser, fetchUserById } from '../api/api.js';
import useStore from '../store.js'
import { useNavigate } from "react-router-dom";

const supabaseUrl = 'https://uowsptyxrtvwphotngro.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvd3NwdHl4cnR2d3Bob3RuZ3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0ODg2MjUsImV4cCI6MjAzNDA2NDYyNX0.EShLjUxjMC2e3xbQXHZ3puMrnCVmFXT_xyemGEtD0E8';
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { currentUser, setCurrentUser, clearData
   } = useStore()
  // const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {

    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth Change: ", _event)
      if (_event == 'SIGNED_OUT') {

      } else if (session) {

      } else if (_event == 'TOKEN_REFRESHED') {
        Cookies.set('access_token', session.access_token)
        console.log("Token Refresh session", session)

      } else if (_event == 'SIGNED_IN') {
        console.log('Sign In Session', session)

        // setCurrentUser(session?.user || null)
        Cookies.set('access_token', session.access_token)
        console.log(session.access_token)
      }
    })

    return () => subscription.unsubscribe()
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    console.log("Email: ", email, 'Password: ', password)

    if (data.user) {
      Cookies.set('access_token', data.session.access_token)
      const response = await fetchUserById(data.user.id)
      console.log("user data: ", response.data.user)
      if (!response.data.user){
        console.log("get user data issue")
      }
      setCurrentUser(response.data.user)

    } else {
      setCurrentUser(null)
    }
    if (error) throw error;

    const token = data.session.access_token
    Cookies.set('access_token', token)
    return data;
  };

  const signUp = async ( userData ) => {
    console.log(userData)
    const { data, error } = await supabase.auth.signUp({
      "email": userData.email,
      "password": userData.password
    });


    if (data.user) {
      Cookies.set('access_token', data.session.access_token)
      userData['id'] = data.user.id
      console.log("userData: ", userData)

      const response = await createUser(userData)
      console.log(response)
      setCurrentUser(userData)
    }

    if (error) throw error;
    return data
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    clearData()
    Cookies.remove("access_token")
  };

  const value = {
    supabase,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
