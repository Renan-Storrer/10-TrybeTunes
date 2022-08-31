import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    offButton: true,
  };

  handleChange = (event) => {
    this.setState({
      user: event.target.value,
    }, this.button);
  };

  button = () => {
    const { user } = this.state;
    const min = 2;
    this.setState({
      offButton: user.length < min,
    });
  };

  render() {
    const { offButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          placeholder="Nome do artista, banda ou musica"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
        />
        <button disabled={ offButton } type="button" data-testid="search-artist-button">
          Pesquisar 🔎
        </button>
      </div>
    );
  }
}
export default Search;
