import React from 'react';

import Header from '../components/Header';
import CardAlbum from '../components/CardAlbum';
import Loading from './Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      offButton: true,
      search: '',
      searchInput: '',
      loading: false,
      message: false,
      data: [],
    };
  }

  handleChangeInput = ({ target }) => {
    const { value } = target;
    const minInput = 2;
    this.setState({
      search: value,
    }, () => {
      if (value.length >= minInput) {
        return this.setState({ offButton: false });
      }
      return this.setState({ offButton: true });
    });
  };

  handleChangeClick = async () => {
    const { search } = this.state;

    this.setState({
      offButton: false,
      loading: true,
      searchInput: search,
    });

    const response = await searchAlbumsAPI(search);

    this.setState({
      loading: false,
      message: true,
      data: response,
      search: '',
    });
  };

  render() {
    const { search,
      offButton,
      loading,
      message,
      data,
      searchInput,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="search-input">
              <input
                data-testid="search-artist-input"
                value={ search }
                onChange={ this.handleChangeInput }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ offButton }
              onClick={ this.handleChangeClick }
            >
              Pesquisar 🔎
            </button>

          </form>
        )}
        { message && (
          <h2>
            {`Albuns de ${searchInput}` }
          </h2>
        )}
        { data.length === 0 ? (
          <p>Desculpe! Nenhum álbum foi encontrado 😔</p>
        ) : data.map((item, index) => (
          <CardAlbum
            key={ index }
            artistName={ item.artistName }
            collectionName={ item.collectionName }
            artworkUrl100={ item.artworkUrl100 }
            collectionId={ item.collectionId }
          />))}
      </div>
    );
  }
}
export default Search;
