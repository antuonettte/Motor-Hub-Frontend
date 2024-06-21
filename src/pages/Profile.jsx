import React, { useEffect, useState } from 'react'
import { fetchPostsByUser, fetchUserById } from '../api/api.js'
import '../css/ProfilePage.css';
import PostsGrid from '../components/PostsGrid.jsx';
import PostsFeed from '../components/PostsFeed.jsx';

import { Container, Avatar, Typography, Box, Grid, IconButton, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import { likePost } from '../api/api.js';

// TODO: Implement Clicking on post

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
  const [view, setView] = useState('grid');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserById(2);
        setProfile(response.data.user);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetchPostsByUser(2, 2);
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

  const handleLike = async (post_id, index) => {
    console.log(post_id, index)
    try {
        const response = await likePost(2, post_id);
        setPosts((prePosts) => 
             prePosts.map((post) => 
                post.id === post_id ? {...post, likedByUser: !post.likedByUser, like_count: post.likedByUser ? post.like_count - 1 : post.like_count + 1} : post
            )
        )
        console.log(response)
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
          Grid View
        </Button>
        <Button variant={view === 'feed' ? 'contained' : 'outlined'} onClick={() => setView('feed')}>
          Feed View
        </Button>
        <Button variant={view === 'none' ? 'contained' : 'outlined'} onClick={() => setView('none')}>
          Empty View
        </Button>
      </Box>

      {view === 'grid' && <PostsGrid posts={posts} />}
      {view === 'feed' && <PostsFeed posts={posts} handleLike={handleLike}/>}
      {view === 'none' && (
        <Box textAlign="center">
          <Typography variant="h6">Nothing to display</Typography>
        </Box>
      )}

      

    </Container>
  );
};



export default Profile