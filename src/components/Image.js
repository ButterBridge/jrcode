import React from 'react';
import Img from "gatsby-image"

const Image = ({images, caption}) => {
    return (
        <figure>
            <Img sizes={images.sizes} />
            <figcaption>{caption}</figcaption>
        </figure>
    );
};

export default Image;