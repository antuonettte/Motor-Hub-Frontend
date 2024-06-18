import React, { useEffect, useState } from 'react'
import { fetchUserById, fetchUsers } from '../api/api.js'
import '../css/ProfilePage.css';

import { Container, Avatar, Typography, Box, Grid, IconButton } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';


const Profile = () => {
  const [profile, setProfile] = useState({
    profile_picture: 'https://placehold.co/600x600',
    first_name: 'John',
    last_name: 'Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra vel turpis nunc eget lorem dolor sed. Nunc mattis enim ut tellus elementum sagittis vitae et.',
    location: 'Atlanta',
    follower_count: 0,
    following_count: 0
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
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          alt="Profile Picture"
          src="https://via.placeholder.com/150"
          style={{ width: '150px', height: '150px' }}
        />
        <Typography variant="h4" style={{ marginTop: '20px' }}>
          John Doe
        </Typography>
        <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px', textAlign: 'center' }}>
          A passionate developer with experience in React and Material-UI. Love to create beautiful and functional
          user interfaces.
        </Typography>
        <Box display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
          <IconButton aria-label="email">
            <Email />
          </IconButton>
          <IconButton aria-label="phone">
            <Phone />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};



export default Profile