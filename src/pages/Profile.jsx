import React, { useEffect, useState } from 'react'
import { fetchPostsByUser, fetchUserById } from '../api/api.js'
import '../css/ProfilePage.css';
import PostsGrid from '../components/PostsGrid.jsx';
import PostsFeed from '../components/PostsFeed.jsx';

import { GridOn, TableRowsRounded, Garage } from '@mui/icons-material';

import { Container, Avatar, Typography, Box, Grid, IconButton, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import { likePost } from '../api/api.js';
import useStore from '../store.js';

// TODO: Implement Clicking on post

const Profile = () => {
  // const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [view, setView] = useState('grid');
  const { currentUser, profile, setProfile, setCurrentUserPosts, currentUserPosts, updateCurrentUserLike } = useStore()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(fetching user)
        const response = await fetchUserById(currentUser.id);
        setProfile(response.data.user);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetchPostsByUser(currentUser.id, currentUser.id);
        setCurrentUserPosts(response.data.posts);
        console.log(response.data.posts)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    
    fetchUser();
    fetchPosts();
    console.log(profile)
  }, []);

  const handleLike = async (post_id, likedByUser) => {
    console.log(post_id, likedByUser)
    try {
        const response = await likePost(currentUser.id, post_id);
        updateCurrentUserLike(post_id)
        console.log(currentUserPosts)
    } catch (err) {
        setError(err);
        console.log(err)
    } finally {
        setLoading(false);
    }
}


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

      <Box textAlign="center" mb={2}>
        <Button variant={view === 'grid' ? 'contained' : 'outlined'} onClick={() => setView('grid')}>
          <GridOn/>
        </Button>
        <Button variant={view === 'feed' ? 'contained' : 'outlined'} onClick={() => setView('feed')}>
          <TableRowsRounded/>
        </Button>
        <Button variant={view === 'none' ? 'contained' : 'outlined'} onClick={() => setView('none')}>
          <Garage/>
        </Button>
      </Box>

      {view === 'grid' && <PostsGrid posts={currentUserPosts} />}
      {view === 'feed' && <PostsFeed posts={currentUserPosts} handleLike={handleLike}/>}
      {view === 'none' && (
        <Box textAlign="center">
          <Typography variant="h6">Nothing to display</Typography>
        </Box>
      )}

      

    </Container>
  );
};



export default Profile