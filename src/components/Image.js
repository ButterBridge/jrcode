import React from "react";
import PT from "prop-types";
import Img from "gatsby-image";
import { Detail, Meta } from "../styled-components";

const Image = ({ images, caption, colour }) => (
  <figure>
    <Img sizes={images.sizes} />
    <figcaption>
      <Meta colour={colour}>
        <Detail>{caption}</Detail>
      </Meta>
    </figcaption>
  </figure>
);

Image.propTypes = {
  images: PT.object.isRequired,
  caption: PT.string.isRequired,
  colour: PT.string.isRequired
};

export default Image;
