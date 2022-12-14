import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favSongs = await getFavoriteSongs();
    const isFavorite = favSongs.some((e) => e.trackId === trackId);
    this.setState({
      isChecked: isFavorite,
    });
  }

  handleClick = async (track) => {
    this.setState({
      isLoading: true,
    });
    await addSong(track);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  };

  render() {
    const { isLoading, isChecked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      isLoading ? <Loading /> : (
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="Favoritos">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isChecked }
              onChange={ () => this.handleClick(trackId) }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
