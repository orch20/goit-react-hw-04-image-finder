import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  };
  // }
  state = {
    // picture: null,
    // loading: false,
    searchQueryApp: '',
  };

  handelFormSubmit = searchQuery => {
    this.setState({ searchQueryApp: searchQuery });
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   setTimeout(() => {
  //     fetch(
  //       'https://pixabay.com/api/?key=28032736-ad36f6ce87d03da58a29c5b67&q=yellow+flowers&image_type=photo'
  //     )
  //       .then(res => res.json())
  //       .then(picture => this.setState({ picture }))
  //       .finally(() => this.setState({ loading: false }));
  //   }, 1000);
  // }

  render() {
    const { picture, loading } = this.state;
    return (
      <>
        <Searchbar onSubmitApp={this.handelFormSubmit} />
        {loading && <Loader lOADING={loading} />}
        {/* <div>{picture && <div>hello2</div>}</div> */}
        <ToastContainer />
      </>
    );
  }
}
