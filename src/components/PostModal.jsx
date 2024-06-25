import React, { useState, useCallback } from 'react';
import {
  Box, Dialog, DialogContent, DialogTitle, TextField, IconButton, Chip, Grid, Button
} from '@mui/material';
import { Add, AddBox, AddPhotoAlternate, Cancel, Send } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import useStore from '../store';
import { createPost } from '../api/api.js'

const CreatePostModal = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [images, setImages] = useState([]);
  const { addPost, currentUser } = useStore();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setContent('');
    setHashtags([]);
    setHashtagInput('');
    setImages([]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleHashtagInputChange = (e) => {
    setHashtagInput(e.target.value);
  };

  const handleAddHashtag = () => {
    if (hashtagInput.trim() !== '' && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (hashtag) => {
    setHashtags(hashtags.filter((tag) => tag !== hashtag));
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImages([...images, ...acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
  }, [images]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCreatePost = () => {
    const postNames = images.map((image) => image.name.replace(/\..+$/, '') )
    console.log(postNames)
    // addPost({ content, hashtags, postNames });
    const response = createPost(currentUser.id, currentUser.username, content, postNames)
    console.log(response)
    
    handleCloseModal();
  };

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <AddBox />
      </IconButton>
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Content"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={content}
            onChange={handleContentChange}
            style={{ marginBottom: '20px' }}
          />
          <Box {...getRootProps()} border="1px dashed gray" padding="20px" textAlign="center">
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <AddPhotoAlternate />
          </Box>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {images.map((image, index) => (
              <Grid item xs={3} key={index}>
                <Box position="relative">
                  <img src={image.preview} alt="preview" style={{ width: '100%' }} />
                  <IconButton
                    size="small"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                  >
                    <Cancel />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
          <TextField
            label="Add Hashtag"
            fullWidth
            variant="outlined"
            value={hashtagInput}
            onChange={handleHashtagInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddHashtag();
                e.preventDefault();
              }
            }}
            style={{ marginTop: '20px' }}
          />
          <Box display="flex" flexWrap="wrap" marginTop="10px">
            {hashtags.map((hashtag, index) => (
              <Chip
                key={index}
                label={hashtag}
                onDelete={() => handleRemoveHashtag(hashtag)}
                style={{ margin: '5px' }}
              />
            ))}
          </Box>
          <Box display="flex" justifyContent="flex-end" marginTop="20px">
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCreatePost} color="primary" variant="contained" startIcon={<Send />} style={{ marginLeft: '10px' }}>
              Post
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostModal;
