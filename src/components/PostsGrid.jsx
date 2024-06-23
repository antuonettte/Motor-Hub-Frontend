import React from 'react';

import { Container, Avatar, Typography, Box, Grid, IconButton, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';

const PostsGrid = ({ posts }) => {

  const openPost = (post_id) => {
    console.log("Finishing opening posts: ", post_id)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginTop: '30px', width: '100%', marginBottom: '50px' }}>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>

          {posts.map((post, index) => {
            return (
              <Grid item xs={12} md={6} key={post['id']}>
                <Card style={{ height: '200px', overflow: 'hidden' }} onClick={() => openPost(post['id'])}>
                  <CardMedia
                    component="img"
                    height="200px"
                    image={post.media_metadata.length > 0 ? post.media_metadata[0]['url'] : "https://via.placeholder.com/400x200"}
                    alt="Post image"
                  />
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Box>
  );
};

export default PostsGrid;
