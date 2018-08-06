import React from 'react';

const Image = ({images}) => {
    return (
        <img src={images.originalImg}/>
    );
};

export default Image;