import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    const { images, onClick } = this.props;

    return images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li key={id} onClick={() => onClick(largeImageURL, tags)}>
        <img src={webformatURL} alt={tags} />
      </li>
    ));
  }
}

export default ImageGalleryItem;
