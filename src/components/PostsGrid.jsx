import React, { useState } from 'react';
import {
  Box, Grid, Card, CardMedia, Dialog, DialogContent, Typography,
  Avatar, IconButton, Divider, Button, Collapse, CardContent, CardActions
} from '@mui/material';
import { ThumbUp, Comment, ExpandMore, ExpandLess, Send } from '@mui/icons-material';

const PostsGrid = ({ posts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [expandedPostIds, setExpandedPostIds] = useState({});

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  const handleToggleExpand = (postId) => {
    setExpandedPostIds((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleLike = (postId, likedByUser) => {
    // Implement like functionality
  };

  const handleOpenCommentDialog = (postId) => {
    // Implement open comment dialog functionality
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" style={{ marginTop: '30px', width: '100%', marginBottom: '50px' }}>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          {posts.toReversed().map((post, index) => (
            <Grid item xs={12} md={6} key={post['id']}>
              <Card style={{ height: '200px', overflow: 'hidden' }} onClick={() => handleOpenModal(post)}>
                <CardMedia
                  component="img"
                  height="200px"
                  image={post.media_metadata.length > 0 ? post.media_metadata[0]['url'] : "https://via.placeholder.com/400x200"}
                  alt="Post image"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {selectedPost && (
        <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
          <DialogContent>
            <CardMedia
              component="img"
              height="300"
              image={selectedPost.media_metadata.length > 0 ? selectedPost.media_metadata[0]['url'] : "https://via.placeholder.com/400x200"}
              alt="Post media"
            />
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="10px">
                <Avatar src={'https://placehold.co/60'} alt="User Avatar" />
                <Typography variant="h6" style={{ marginLeft: '10px' }}>
                  {selectedPost.username}
                </Typography>
              </Box>
              <Typography variant="h5">{selectedPost.title}</Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                {selectedPost.content}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="10px">
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleLike(selectedPost.id, selectedPost.likedByUser)}>
                    <ThumbUp color={selectedPost.likedByUser ? "primary" : ""} />
                  </IconButton>
                  <Typography variant="body2">{selectedPost.like_count} likes</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleOpenCommentDialog(selectedPost.id)}>
                    <Comment />
                  </IconButton>
                  <Typography variant="body2">{selectedPost.comments.length} comments</Typography>
                </Box>
              </Box>
              {selectedPost.comments.length > 0 && (
                <>
                  <Divider />

                 
                  <Box display="flex" alignItems="center" marginBottom="10px">
                    <Box display="flex" alignItems="center" marginLeft="10px">
                      <Avatar src={'https://placehold.co/30'} alt="Comment User Avatar" />
                      <Typography variant="body2" style={{ marginLeft: '10px' }}>
                        {selectedPost.comments[selectedPost.comments.length - 1].username}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" flexGrow={1}>
                      <Typography variant="body2" color="textSecondary">
                        {selectedPost.comments[selectedPost.comments.length - 1].content}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => handleToggleExpand(selectedPost.id)}
                  endIcon={expandedPostIds[selectedPost.id] ? <ExpandLess /> : <ExpandMore />}
                >
                  {/* {expandedPostIds[selectedPost.id] ? 'Hide Comments' : 'Show All Comments'} */}
                </Button>
              </Box>
              <Collapse in={expandedPostIds[selectedPost.id]} timeout="auto" unmountOnExit>
                {selectedPost.comments.length > 1 && (
                  <>
                    <Box marginTop="10px">
                      {selectedPost.comments.slice(0, selectedPost.comments.length - 1).map((comment, index) => (
                        <Box key={index} display="flex" alignItems="center" marginBottom="10px">
                          <Box display="flex" alignItems="center" marginLeft="10px">
                            <Avatar src={'https://placehold.co/30'} alt="Comment User Avatar" />
                            <Typography variant="body2" style={{ marginRight: '10px' }}>
                              {comment.username}
                            </Typography>
                          </Box>
                          <Box display="flex" flexDirection="column" flexGrow={1}>
                            <Typography variant="body2" color="textSecondary">
                              {comment.content}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Collapse>
            </CardContent>
            <CardActions>
              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
            </CardActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PostsGrid;
