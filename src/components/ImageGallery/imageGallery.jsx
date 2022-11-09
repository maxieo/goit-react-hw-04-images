import React from "react";
import PropTypes from 'prop-types'
import { ImageGalleryStyle } from './imageGallery.styled.js'
import { ImageGalleryItem } from 'components/ImageGalleryItem/imageGalleryItem'

export const ImageGallery = ({ results, openModal }) => { 
  return (
    <ImageGalleryStyle>
      {results.map(result => (
        <ImageGalleryItem
          key={result.id}
          webformatURL={result.webformatURL}
          largeImageURL={result.largeImageURL}
          tags={result.tags}
          openModal={ openModal }
        />
    ))}
    </ImageGalleryStyle>
  ) 
}

ImageGallery.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired
    })
  )
} 