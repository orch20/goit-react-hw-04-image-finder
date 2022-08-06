import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Form, Input, Button, Label } from './SearchBar.styled';

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
    this.props.onSubmitApp(searchQuery);
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label title={'Search'} />
          </Button>

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
