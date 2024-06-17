import React, { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import useLocalStorage from '../hooks/UseLocalStorage.jsx'
import { fetchUserById } from '../api/api.js'


const Profile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserById(2);
        setUserProfile(response.data);
        console.log(response.data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>Profile</div>
  )
}

export default Profile