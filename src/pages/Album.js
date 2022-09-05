import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    favoritesSongsId: [],
    isLoading: true,
    tracks: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.fetchMusics(id);
  }

  fetchFavoriteMusics = async (id) => {
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const songList = await getFavoriteSongs();
        const response = await addSong(id);
        if (response === 'OK') {
          this.setState((previousState) => ({
            favoritesSongsId: [...previousState.favoritesSongsId, id, songList],
            isLoading: false,
          }));
        }
      },
    );
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(
      {
        [name]: value,
      },
      () => this.fetchFavoriteMusics(target.id),
    );
  };

  fetchMusics = async (id) => {
    const request = await getMusics(id);
    const songList = await getFavoriteSongs();
    const albumName = request[0].collectionName;
    const { artistName } = request[0];
    const tracks = request.filter((_e, i) => i > 0);
    this.setState({
      favoritesSongsId: [...songList],
      isLoading: false,
      albumName,
      artistName,
      tracks: [...tracks],
    });
  };

  render() {
    const { tracks, albumName, artistName, isLoading, favoritesSongsId } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <h1 data-testid="album-name">{albumName}</h1>
            <h2 data-testid="artist-name">{artistName}</h2>
            {tracks.map(({ trackName, previewUrl, trackId, trackNumber }) => (
              <MusicCard
                trackName={ trackName }
                previewUrl={ previewUrl }
                key={ trackId }
                trackId={ trackId }
                trackNumber={ trackNumber }
                name="targetCheck"
                onChange={ this.handleChange }
                checked={ favoritesSongsId.some(
                  (e) => e === trackId.toString() || e.trackId === trackId,
                ) }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
