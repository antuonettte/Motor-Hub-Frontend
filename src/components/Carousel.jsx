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
        console.log("Checking media url, Current Time: ", currentTimestamp, " expiresAt: ", expiresAt)
        // // Check if the URL has expired
        if (currentTimestamp >= expiresAt) {
            // URL has expired, call function to update the URL
            console.log("Refreshing Download URL")
            const response = await updateUrl(s3_key, post_id);
        //     updateMediaUrl(postIndex, mediaIndex, response.data.url, response.data.expiresAt)
            return response.data.url
        } else {
            return url
        }
    }

    // media.map((item, index) => {
    //     console.log(item)
    //     checkAndUpdateS3UrlIfNeeded(item.s3_key, postIndex, index, postId, item.url, item.expiresAt)
    // })

    return (
        <Carousel indicators={true} navButtonsAlwaysVisible={true} autoPlay={false}>
            {media.map((item, index) => {
                // Check if the media item has expired
                console.log(postId);
                checkAndUpdateS3UrlIfNeeded(item.s3_key, postIndex, index, postId, item.url, item.expiresAt)


                return (
                    <Paper key={index}>
                        <CardMedia component="img" height="200" image={item.url} alt={`media-${index}`} />
                    </Paper>
                );
            })}
        </Carousel>
    );
};

export default CarouselComponent;
