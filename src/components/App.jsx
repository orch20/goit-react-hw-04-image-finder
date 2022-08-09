import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { imageService } from '../services/serviceApi.js';
import styled from 'styled-components';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    isVisible: false,
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
      const { hits, totalHits } = await imageService(query, page);
      console.log('hits', totalHits);
      console.log('page', page);
      if (hits.length === 0) {
        toast.warn('Wrong query!', { autoClose: 3000 });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: totalHits > 12 * page,
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
      isVisible: false,
      isEmpty: false,
      error: null,
    });
  };

  onHandelLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isLoading, images, isVisible, error } = this.state;
    console.log(isVisible);
    return (
      <Container>
        <Searchbar onSubmitApp={this.onHandleSubmit} />
        {isLoading && <Loader lOADING={isLoading} />}
        <ImageGallery images={images} />
        {isVisible && (
          <Button onClick={this.onHandelLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}
        <ToastContainer />
        {error && <p textAlign="center">Sorry, {error}</p>}
      </Container>
    );
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
