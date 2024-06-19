import React, { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import useLocalStorage from '../hooks/UseLocalStorage.jsx'
import { AppBar, Avatar, Toolbar, Typography, Container, Box, Grid, Card, CardContent, CardMedia, IconButton, Button } from '@mui/material';
import { ThumbUp, Comment } from '@mui/icons-material';
import { generateFeed, likePost } from '../api/api.js';
import CarouselComponent from '../components/Carousel.jsx';


const Home = () => {
    const { signOut } = useAuth();
    const [user, setUser] = useLocalStorage("user", null);
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const response = await generateFeed(2);
                setPosts(response.data.message['posts']);
            } catch (err) {
                setError(err);
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchFeed()
    }, []);


    const handleLike = async (post_id, index) => {
        console.log(post_id, index)
        try {
            const response = await likePost(2, post_id);
            console.log(response)
        } catch (err) {
            setError(err);
            console.log(err)
        } finally {
            setLoading(false);
        }
    }
    console.log(posts)
    return (
        <div>
            <Container maxWidth="md" style={{ marginTop: '150px' }}>
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
                                            <IconButton onClick={() => {handleLike(post.id, index)}}>
                                                <ThumbUp />
                                            </IconButton>
                                            <Typography variant="body2">{post.likes} likes</Typography>
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
            </Container>
        </div>
    )
}

export default Home