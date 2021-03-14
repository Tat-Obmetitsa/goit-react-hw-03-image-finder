import React, { Component } from 'react';
import SearchBar from '../Searchbar/Searchbar';
// import s from '../App/App.module.css';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import * as API from '../../services/apiImg';
// import apiImg from '../../services/apiImg';
// import shortid from 'shortid';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    seachQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { seachQuery, currentPage } = this.state;
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImg(seachQuery, currentPage);
    }
  }

  onChangeQuery = seachQuery => {
    this.setState({ seachQuery, isLoading: true });
    API.getImages(seachQuery)
      .then(prevState => {
        console.log('prevState', prevState);
        this.setState({ images: prevState.data.hits });
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  fetchImg = () => {
    const { seachQuery, currentPage } = this.state;
    API.getImages(seachQuery, currentPage + 1).then(prevState => {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
        images: [...prevState.images, ...prevState.data.hits],
      }));
    });
  };

  render() {
    const { images, isLoading, error } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <>
        <SearchBar onSubmit={this.onChangeQuery} />
        {error && <h1>No image found</h1>}
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images}/>
        )}
        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImg} />}
      </>
    );
  }
}
export default App;




