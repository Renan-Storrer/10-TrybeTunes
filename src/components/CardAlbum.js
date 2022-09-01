import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const {
      artistName,
      collectionName,
      artworkUrl100,
      collectionId,
    } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >

          <br />
          <img src={ artworkUrl100 } alt={ artistName } />
          <h4>{artistName}</h4>
          <h5>{collectionName}</h5>
          <br />

        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
