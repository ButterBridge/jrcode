import React from 'react';
import Img from "gatsby-image"
import { Container, Centraliser, Detail, Meta } from '../styled-components';

const Image = ({images, caption, sampleColour}) => {
    return (
        <figure>
            <Img sizes={images.sizes} />
            <figcaption>
                <Meta colour={sampleColour}>
                <Detail>{caption}</Detail></Meta></figcaption>
        </figure>
    );
};

export default Image;