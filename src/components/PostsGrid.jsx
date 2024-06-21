import React from 'react';

import { Container, Avatar, Typography, Box, Grid, IconButton, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';

const PostsGrid = ({ posts }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginTop: '30px', width: '100%' }}>
        <Typography variant="h5">Posts</Typography>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>

          {posts.map((post, index) => {
            console.log(post)
            return (
              <Grid item xs={12} md={6} key={post['id']}>
                <Card style={{ height: '200px', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.media_metadata.length > 0 ? post.media_metadata[0]['url'] : "https://via.placeholder.com/400x200"}
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
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Box>
  );
};

export default PostsGrid;
