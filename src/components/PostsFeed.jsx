import React from 'react';
import { ThumbUp, Comment } from '@mui/icons-material';

import CarouselComponent from '../components/Carousel.jsx';
import { AppBar, Avatar, Toolbar, Typography, Container, Box, Grid, Card, CardContent, CardMedia, IconButton, Button } from '@mui/material';

const PostsFeed = ({ posts, handleLike }) => {

  return (
    <Grid container spacing={2}>
                    {posts.map((post, index) => (
                        <Grid item xs={12} key={post.id}>{}
                            <Card>
                                {
                                post.media_metadata.length > 0 && 
                                <CarouselComponent media={post.media_metadata} />
                                }
                                <CardContent>
                                    <Box display="flex" alignItems="center" marginBottom="10px">
                                        <Avatar src={'https://placehold.co/60'} alt="User Avatar" />
                                        <Typography variant="h6" style={{ marginLeft: '10px' }}>
                                            {post.username}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h5">{post.title}</Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                                        {post.content}
                                    </Typography>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="10px">
                                        <Box display="flex" alignItems="center">
                                            <IconButton onClick={() => {handleLike(post.id, post.likedByUser)}}>
                                                <ThumbUp color={post.likedByUser ? "primary" : ""}/>
                                            </IconButton>
                                            <Typography variant="body2">{post.like_count} likes</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <IconButton>
                                                <Comment />
                                            </IconButton>
                                            <Typography variant="body2">{post.comments.length} comments</Typography>
                                        </Box>
                                    </Box>
                                    {post.comments.length > 0 && (
                                        <Box marginTop="10px">
                                            <Typography variant="body2" color="textSecondary">
                                                Most Recent Comment: {post.comments[post.comments.length - 1].text}
                                            </Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
  );
};

export default PostsFeed;
