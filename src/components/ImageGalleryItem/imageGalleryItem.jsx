import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryStyledItem, GalleryImage } from './imageGalleryItem.styled.js'


export const ImageGalleryItem = ({webformatURL, largeImageURL, tags, openModal}) =>
{
    return (
      <>
        <ImageGalleryStyledItem onClick={openModal}>
          <GalleryImage
            src={webformatURL}
            data-large={largeImageURL}
            alt={tags}
          />
        </ImageGalleryStyledItem>
      </>
    );
  }



ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
