import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { imageService } from '../services/serviceApi.js';
import styled from 'styled-components';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalURL, setModalURL] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    getImages(query, page);
  }, [query, page]);

  const getImages = async (query, page) => {
    setIsLoading(true);
    try {
      const { hits, totalHits } = await imageService(query, page);

      if (hits.length === 0) {
        toast.warn('Wrong query!', { autoClose: 3000 });
      }

      setImages([...images, ...hits]);
      setIsVisible(totalHits > 12 * page);
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSubmit = value => {
    if (value === query) {
      return;
    }
    setImages([]);
    setQuery(value);
    setPage(1);
    setIsVisible(false);
    // setIsEmpty(false);
    setError(null);
  };

  const onHandelLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, tag) => {
    setIsModal(true);
    setModalURL(url);
    setModalAlt(tag);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <Container>
      {isModal && (
        <Modal onClick={closeModal}>
          <img src={modalURL.url} alt={modalAlt.tag} />
        </Modal>
      )}
      {!isModal && <Searchbar onSubmitApp={onHandleSubmit} />}
      {isLoading && <Loader lOADING={isLoading} />}
      <ImageGallery images={images} onClick={openModal} />
      {isVisible && (
        <Button onClick={onHandelLoadMore} disabled={isLoading} type="button">
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
      <ToastContainer />
      {error && <p textAlign="center">Sorry, {error}</p>}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     isVisible: false,
//     isModal: false,
//     modalURL: '',
//     modalAlt: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.getImages(query, page);
//     }
//   }
//   getImages = async (query, page) => {
//     this.setState({ isLoading: true });
//     try {
//       const { hits, totalHits } = await imageService(query, page);

//       if (hits.length === 0) {
//         toast.warn('Wrong query!', { autoClose: 3000 });
//       }

//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         isVisible: totalHits > 12 * page,
//       }));
//     } catch (error) {
//       console.error(error);
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   onHandleSubmit = value => {
//     if (value === this.state.query) {
//       return;
//     }
//     this.setState({
//       query: value,
//       page: 1,
//       images: [],
//       isVisible: false,
//       isEmpty: false,
//       error: null,
//     });
//   };

//   onHandelLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   openModal = (url, tag) => {
//     this.setState({
//       isModal: true,
//       modalURL: { url },
//       modalAlt: { tag },
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       isModal: false,
//     });
//   };

//   render() {
//     const { isLoading, images, isVisible, error, isModal, modalURL, modalAlt } =
//       this.state;

//     return (
//       <Container>
//         {isModal && (
//           <Modal onClick={this.closeModal}>
//             <img src={modalURL.url} alt={modalAlt.tag} />
//           </Modal>
//         )}
//         {!isModal && <Searchbar onSubmitApp={this.onHandleSubmit} />}
//         {isLoading && <Loader lOADING={isLoading} />}
//         <ImageGallery images={images} onClick={this.openModal} />
//         {isVisible && (
//           <Button
//             onClick={this.onHandelLoadMore}
//             disabled={isLoading}
//             type="button"
//           >
//             {isLoading ? 'Loading...' : 'Load more'}
//           </Button>
//         )}
//         <ToastContainer />
//         {error && <p textAlign="center">Sorry, {error}</p>}
//       </Container>
//     );
//   }
// }

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
