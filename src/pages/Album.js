import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="page-album">ALBUM</p>
      </div>
    );
  }
}

export default Album;
