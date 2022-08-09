import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Form, Input, ButtonSearch, Label } from './SearchBar.styled';
import { ReactComponent as loopSvg } from '../../icons/loop.svg';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = e => {
    this.setState({
      searchQuery: e.currentTarget.value.toLowerCase().trim(),
    });
  };
  handleSubmit = e => {
    const { searchQuery } = this.state;
    e.preventDefault();
    if (searchQuery === '') {
      toast.warn('Enter query!', { autoClose: 3000 });
      return;
    }
    this.setState({
      searchQuery: '',
    });
    this.props.onSubmitApp(searchQuery);
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <ButtonSearch type="submit">
            Search
            <loopSvg width="40" fill="#3f51b5" />
            {/* <Label title={'Search'} /> */}
          </ButtonSearch>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeHolder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleSearchQueryChange}
          />
        </Form>
      </Header>
    );
  }
}
