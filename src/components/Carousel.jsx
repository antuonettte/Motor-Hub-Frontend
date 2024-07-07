// CarouselComponent.jsx
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, CardMedia } from '@mui/material';
import useStore from '../store.js';
import { updateUrl } from '../api/api.js';

const CarouselComponent = ({ media, postIndex, postId }) => {
    const { updateMediaUrl } = useStore();
    const [updatedMedia, setUpdatedMedia] = useState(media);

    useEffect(() => {
        async function checkAndUpdateS3UrlIfNeeded(s3_key, mediaIndex, post_id, url, expiresAt) {
            const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
            console.log("Checking media url, Current Time: ", currentTimestamp, " expiresAt: ", expiresAt);

            // Check if the URL has expired
            if (currentTimestamp >= expiresAt) {
                // URL has expired, call function to update the URL
                console.log("Refreshing Download URL");
                try {
                    const response = await updateUrl(s3_key, post_id);
                    const newUrl = response.data.url;
                    const newExpiresAt = response.data.expiresAt;

                    setUpdatedMedia((prevMedia) => {
                        const newMedia = [...prevMedia];
                        newMedia[mediaIndex].url = newUrl;
                        newMedia[mediaIndex].expiresAt = newExpiresAt;
                        return newMedia;
                    });

                    // updateMediaUrl(postIndex, mediaIndex, newUrl, newExpiresAt);

                    return newUrl;
                } catch (err) {
                    console.log(err);
                }
            } else {
                return url;
            }
        }

        // Check each media item once when the component mounts
        media.forEach((item, index) => {
            checkAndUpdateS3UrlIfNeeded(item.s3_key, index, postId, item.url, item.expiresAt);
        });
    }, [media, postIndex, postId, updateMediaUrl]);

    return (
        <Carousel indicators={true} navButtonsAlwaysVisible={true} autoPlay={false}>
            {updatedMedia.map((item, index) => (
                <Paper key={index}>
                    <CardMedia component="img" height="300" image={item.url} alt={`media-${index}`} />
                </Paper>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
