// CarouselComponent.jsx
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, CardMedia } from '@mui/material';

const CarouselComponent = ({ media }) => {
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
