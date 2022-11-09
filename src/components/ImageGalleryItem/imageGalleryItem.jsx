import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryStyledItem, GalleryImage } from './imageGalleryItem.styled.js'


export class ImageGalleryItem extends Component {
  render() {
    return (
      <>
        <ImageGalleryStyledItem onClick={this.props.openModal}>
          <GalleryImage
            src={this.props.webformatURL}
            data-large={this.props.largeImageURL}
            alt={this.props.tags}
          />
        </ImageGalleryStyledItem>
      </>
    );
  }
}



ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
