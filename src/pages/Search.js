import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="page-search">SEARCH</p>
      </div>
    );
  }
}

export default Search;
