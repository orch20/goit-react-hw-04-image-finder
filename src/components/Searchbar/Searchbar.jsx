import React, { Component } from 'react';
import { Button } from '../Button/Button';
import { Header } from './SearchBar.styled';

export class Searchbar extends Component {
  render() {
    return (
      <Header>
        <form class="form">
          <Button title="Search" />

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </Header>
    );
  }
}
