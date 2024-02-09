// LazyImage.js
import React, { useState, useEffect } from 'react';
import loadImage from './Imageloader';

const LazyImage = ({ src, alt }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        loadImage(src).then(setImageSrc);
    }, [src]);

    if (!imageSrc) {
        // Show loading spinner while the image is loading
        return <div className="loader"></div>; // Use the loader class for the spinner
    }

    return <img src={imageSrc} alt={alt} />;
};

export default LazyImage;
