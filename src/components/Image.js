import React from 'react';
import Img from "gatsby-image"

const Image = ({images}) => {
    return (
        <Img sizes={images.sizes} />
    );
};

export default Image;