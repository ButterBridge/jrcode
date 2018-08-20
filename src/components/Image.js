import React from 'react';
import Img from "gatsby-image"
import { Container, Centraliser, Detail, Meta } from '../styled-components';

const Image = ({images, caption, colour}) => {
    return (
        <figure>
            <Img sizes={images.sizes} />
            <figcaption>
                <Meta colour={colour}>
                <Detail>{caption}</Detail></Meta></figcaption>
        </figure>
    );
};

export default Image;