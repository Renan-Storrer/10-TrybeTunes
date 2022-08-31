import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="page-favorites">FAVORITOS</p>
      </div>
    );
  }
}

export default Favorites;
