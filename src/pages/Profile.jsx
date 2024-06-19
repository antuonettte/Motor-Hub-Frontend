import React, { useEffect, useState } from 'react'
import { fetchPostsByUser, fetchUserById } from '../api/api.js'
import '../css/ProfilePage.css';

import { Container, Avatar, Typography, Box, Grid, IconButton, Card, CardContent, CardMedia } from '@mui/material';
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
  const [posts, setPosts] = useState([])
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

    const fetchPosts = async () => {
      try {
        const response = await fetchPostsByUser(2);
        setPosts(response.data.posts);
        console.log(response.data.posts)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
    fetchUser();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        alt="Profile Picture"
        src={profile.profile_picture}
        style={{ width: '150px', height: '150px' }}
      />
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        {profile.first_name + " " + profile.last_name}
      </Typography>
      <Box display="flex" flexDirection="row" style={{ marginTop: '10px' }}>
        <Typography variant="body1" style={{ marginRight: '20px' }}>
          <strong>{profile.follower_count}</strong> Followers
        </Typography>
        <Typography variant="body1">
          <strong>{profile.following_count}</strong> Following
        </Typography>
      </Box>
      <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px', textAlign: 'center' }}>
        {profile.bio}
      </Typography>
      <Box display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
        
      </Box>
    </Box>

    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginTop: '30px', width: '100%' }}>
        <Typography variant="h5">Posts</Typography>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>

          {posts.map( (post) => {
            return <>
            <Grid item xs={12} md={6} key={post[0]}>
            <Card style={{ height: '300px', overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="140"
                image={profile.profile_picture ? profile.profile_picture : "https://via.placeholder.com/400x200"}
                alt="Post image"
              />
              <CardContent>
                
                <Typography variant="body2" color="textSecondary" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {post[3]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
            </>
          } )}


          <Grid item xs={12} md={6}>
          
          </Grid>
          {/* Add more posts here */}
        </Grid>
      </Box>
  </Container>
  );
};



export default Profile