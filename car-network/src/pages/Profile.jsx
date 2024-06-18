import React, { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import useLocalStorage from '../hooks/UseLocalStorage.jsx'
import { fetchUserById, fetchUsers } from '../api/api.js'
import '../css/ProfilePage.css';


const Profile = () => {
  const [profile, setProfile] = useState({
    profilePicture: 'https://placehold.co/600x400',
    name: '',
    bio: '',
    followersCount: 0,
    followingCount: 0
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserById(2);
        setProfile(response.data.user);
        console.log(response.data.user)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
        <h1 className="profile-name">{profile.first_name + " " + profile.last_name}</h1>
      </div>
      <div className="profile-bio">
        <p>{profile.bio}</p>
      </div>
      <div className="profile-stats">
        <div className="profile-followers">
          <span className="count">{profile.follower_count}</span>
          <span className="label">Followers</span>
        </div>
        <div className="profile-following">
          <span className="count">{profile.following_count}</span>
          <span className="label">Following</span>
        </div>
      </div>
    </div>
  );
};


export default Profile