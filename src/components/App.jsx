import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { imageService } from '../services/serviceApi.js';

export class App extends Component {
  state = {
    isLoading: false,
    query: '',
    page: 1,
    images: [],
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }
  getImages = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      // const { query, page } = this.state;
      const { hits } = await imageService(query, page);
      console.log('app:', hits);
      if (hits.length === 0) {
        toast.warn('Wrong query!', { autoClose: 3000 });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandleSubmit = value => {
    if (value === this.state.query) {
      return;
    }
    this.setState({
      query: value,
      page: 1,
      images: [],
      // isVisible: false,
      // isEmpty: false,
      error: null,
    });
  };

  onHandelLoadMore = () => {
    console.log('click');
    this.setState(prevState => ({
      page: prevState + 1,
    }));
  };

  render() {
    const { isLoading, images } = this.state;
    console.log('render app:', images);
    return (
      <>
        <Searchbar onSubmitApp={this.onHandleSubmit} />
        {isLoading && <Loader lOADING={isLoading} />}
        <ImageGallery images={images} />
        <Button onClick={this.onHandelLoadMore}>Load more</Button>
        <ToastContainer />
      </>
    );
  }
}
