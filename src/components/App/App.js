import React, { Component } from 'react';
import SearchBar from '../Searchbar/Searchbar';
// import s from '../App/App.module.css';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import apiImg from '../../services/apiImg';
// import shortid from 'shortid';

class App extends Component {
  state = {
    images: [],
    filter: '',
    isLoading: false,
    showModal: false,
    error: null,
    currentPage: 1,
    seachQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImg();
    }
  }

  onChangeQuery = query => {
    this.setState({ serchQuery: query, currentPage: 1, images: {} });
    this.fetchImg();
  };
  fetchImg = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    apiImg
      .fetchImg(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { images, showModal, isLoading, error } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <>
        <SearchBar onSubmit={this.onChangeQuery} />
        {error && <h1>No image found</h1>}
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            toggleModal={this.toggleModal}
            showModal={showModal}
            images={images}
          />
        )}
        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImg()} />}
        {showModal && <Modal onClose={this.toggleModal} />}
      </>
    );
  }
}
export default App;




