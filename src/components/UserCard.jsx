import React from 'react';
import { Container, Box, TextField, Tabs, Tab, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

const UserCard = ({ user }) => {

  const goToUser = (user_id) => {
    console.log("Going to user:", user_id)
  }

  return (
    <Grid item xs={12} md={6} key={user['id']} onClick={()=>{goToUser(user['id'])}}>
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
          </CardContent>
        </Box>
      </Card>

    </Grid>
  );
};

export default UserCard;
