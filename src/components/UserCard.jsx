import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material';
import useStore from '../store'; // Make sure to import your zustand store

const UserCard = ({ user }) => {
  const { currentUser, followUser, unfollowUser } = useStore(); // Get follow/unfollow functions from your store

  const isFollowing = false; // Check if the current user is already following this user

  const handleFollowClick = (event) => {
    event.stopPropagation(); // Prevent triggering the card's onClick event
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  const goToUser = (user_id) => {
    console.log("Going to user:", user_id);
  };

  return (
    <Grid item xs={12} md={6} key={user.id} onClick={() => goToUser(user.id)}>
      <Card>
        <Box display="flex" alignItems="center">
          <CardMedia
            component="img"
            image={user.profilePicture}
            alt={user.username}
            sx={{ width: 80, height: 80, borderRadius: '50%', margin: 2 }}
          />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              @{user.username}
            </Typography>
            <Typography variant="h6">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Followers: {user.follower_count}
            </Typography>
            <Button
              variant="contained"
              color={isFollowing ? "secondary" : "primary"}
              onClick={handleFollowClick}
              style={{ marginTop: '10px' }}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default UserCard;
