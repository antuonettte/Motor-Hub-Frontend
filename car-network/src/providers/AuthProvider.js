// src/AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Cookies from 'js-cookie'

const supabaseUrl = 'https://uowsptyxrtvwphotngro.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvd3NwdHl4cnR2d3Bob3RuZ3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0ODg2MjUsImV4cCI6MjAzNDA2NDYyNX0.EShLjUxjMC2e3xbQXHZ3puMrnCVmFXT_xyemGEtD0E8';
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (_event == 'SIGNED_OUT'){
            setSession(null)
        } else if (session){
            setSession(session)
        } else if (_event == 'TOKEN_REFRESHED'){
          Cookies.set('access_token',session.access_token, {
            secure: true,
            sameSite: 'Strict',
            httpOnly: true
          })
          console.log("Token Refresh session", session)
        } else if (_event == 'SIGNED_IN'){
          Cookies.set('access_token',session.access_token, {
            secure: true,
            sameSite: 'Strict',
            httpOnly: true
          })
          console.log('Sign In Session', session)
        }
      })

      return () => subscription.unsubscribe()
  }, []);

  const value = {
    session,
    supabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
