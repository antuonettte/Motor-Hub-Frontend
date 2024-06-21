// CarouselComponent.jsx
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, CardMedia } from '@mui/material';
import useStore from '../store.js'
import { updateUrl } from '../api/api.js';

const CarouselComponent = ({ media, postIndex, postId }) => {
    const { updateMediaUrl } = useStore()

    async function checkAndUpdateS3UrlIfNeeded(s3_key, postIndex, mediaIndex, post_id, url, expiresAt) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

        // Check if the URL has expired
        if (currentTimestamp >= expiresAt) {
            // URL has expired, call function to update the URL
            const response = await updateUrl(s3_key, post_id); // Replace with your function to update the URL
            console.log(response)
            updateMediaUrl(postIndex, mediaIndex, response.data.url, response.data.expiresAt)
            return response.data.url
        } else {
            console.log("S3 URL is still valid");
            console.log(url)
            return url
        }
    }

    media.map((item, index) => {
        checkAndUpdateS3UrlIfNeeded(item.s3_key, postIndex, index, postId, item.url, item.expiresAt)
    })

    return (
        <Carousel indicators={true} navButtonsAlwaysVisible={true} autoPlay={false}>
            {media.map((item, index) => (
                <Paper key={index}>
                    {/* <img src={item.url} alt={`media-${index}`} style={{ width: '100%', height: 'auto' }} /> */}
                    
                    <CardMedia component="img" height="200" image={item.url} alt="Post image" />
                </Paper>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
