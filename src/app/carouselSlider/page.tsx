'use client';
import React, { FC } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import '../carouselSlider/style.scss'; 

export const CarouselSlider: FC = () => {
  const images = [
    {
      original: './img/meo1.jpg',
      thumbnail: './img/meo1.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/cucmo.png',
      thumbnail: './img/cucmo.png',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo8.jpg',
      thumbnail: './img/meo8.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo8.jpg',
      thumbnail: './img/meo8.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo7.jpg',
      thumbnail: './img/meo7.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo8.jpg',
      thumbnail: './img/meo8.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo8.jpg',
      thumbnail: './img/meo8.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo8.jpg',
      thumbnail: './img/meo8.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo8.jpg',
      thumbnail: './img/meo8.jpg',
      description: 'Hello, have a nice day!',
    },
    {
      original: './img/meo8.jpg',
      thumbnail: './img/meo8.jpg',
      description: 'Hello, have a nice day!',
    },
  ];

  return (
    <div className="custom-gallery-container">
      <ImageGallery
        items={images}
        showThumbnails={true}
        showBullets={true}
        showFullscreenButton={true}
        showPlayButton={false}
        slideInterval={2800}
        autoPlay={true}
        renderItem={(item) => {
          console.log('Rendering item:', item); // Debug log
          return (
            <div className="image-gallery-item">
              <img src={item.original} alt={item.description} />
              <div className="lightGallery-captions">
                <p>{item.description}</p>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CarouselSlider;
