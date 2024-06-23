import React, { useState } from 'react';
import { ThumbUp, Comment, ExpandMore, ExpandLess, Send } from '@mui/icons-material';

import CarouselComponent from '../components/Carousel.jsx';
import { Divider, Avatar, Typography, Box, Grid, Card, CardContent, IconButton, Button, Collapse, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import useStore from '../store.js';
import {postComment} from '../api/api.js'

const PostsFeed = ({ posts, handleLike }) => {
    const [expandedPostIds, setExpandedPostIds] = useState({});
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [comment, setComment] = useState('');
    const {currentUser, addCommentToPost} = useStore()


    const handleToggleExpand = (postId) => {
        setExpandedPostIds((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleOpenCommentDialog = (postId) => {
        setCurrentPostId(postId);
        setCommentDialogOpen(true);
    };

    const handleCloseCommentDialog = () => {
        setCommentDialogOpen(false);
        setCurrentPostId(null);
        setComment('');
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handlePostComment = () => {
        // Implement post comment functionality
        postComment(currentPostId, currentUser.id, comment)
        addCommentToPost(currentPostId, {
            "post_id": currentPostId,
            "user_id": currentPostId.id,
            "content": comment,
            "createdAt": Date.now()
        })
        handleCloseCommentDialog();
    };

    return (
        <>
            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} key={post.id}>
                        <Card>
                            {post.media_metadata.length > 0 && <CarouselComponent media={post.media_metadata} />}
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
                                        <IconButton onClick={() => handleLike(post.id, post.likedByUser)}>
                                            <ThumbUp color={post.likedByUser ? "primary" : ""} />
                                        </IconButton>
                                        <Typography variant="body2">{post.like_count} likes</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <IconButton onClick={() => handleOpenCommentDialog(post.id)}>
                                            <Comment />
                                        </IconButton>
                                        <Typography variant="body2">{post.comments.length} comments</Typography>
                                    </Box>
                                </Box>
                                {post.comments.length > 0 && (
                                    <>
                                        <Divider>
                                            
                                        </Divider>
                                        <Box marginTop="10px">
                                            <Typography variant="body2" color="textSecondary">
                                                Most Recent Comment: {post.comments[post.comments.length - 1].content}
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                                <Box display="flex" justifyContent="flex-end">
                                    <Button
                                        onClick={() => handleToggleExpand(post.id)}
                                        endIcon={expandedPostIds[post.id] ? <ExpandLess /> : <ExpandMore />}
                                    >
                                        {/* {expandedPostIds[post.id] ? 'Hide Comments' : 'Show All Comments'} */}
                                    </Button>
                                </Box>
                                <Collapse in={expandedPostIds[post.id]} timeout="auto" unmountOnExit>
                                    {post.comments.length > 1 && (
                                        <>
                                            <Box marginTop="10px">
                                                {post.comments.slice(0, post.comments.length - 1).map((comment, index) => (
                                                    <Box key={index} marginBottom="10px">
                                                        <Typography variant="body2" color="textSecondary">
                                                            {comment.content}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </Collapse>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={commentDialogOpen} onClose={handleCloseCommentDialog} fullWidth>
                <DialogTitle>Post a Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCommentDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handlePostComment} color="primary" startIcon={<Send />}>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PostsFeed;
