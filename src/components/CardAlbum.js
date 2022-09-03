import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CardAlbum extends Component {
  render() {
    const { collectionName, artworkUrl100, artistName } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h4>{collectionName}</h4>
        <p>{artistName}</p>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;

export default CardAlbum;
