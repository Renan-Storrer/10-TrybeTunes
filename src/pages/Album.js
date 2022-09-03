import React, { Component } from 'react';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    albumCollection: {},
    albumTracks: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumData = await getMusics(id);
    const albumCollection = albumData.filter((_, i) => i === 0)[0];
    const albumTracks = albumData.filter((_, i) => i !== 0);
    this.setState({ albumCollection, albumTracks });
  }

  render() {
    const { albumCollection, albumTracks } = this.state;
    console.log(albumCollection);
    console.log(albumTracks);
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{albumCollection.artistName}</h1>
        <h2 data-testid="album-name">{albumCollection.collectionName}</h2>
        {albumTracks.map(({ trackName, previewUrl }) => (
          <MusicCard
            key={ previewUrl }
            trackName={ trackName }
            previewUrl={ previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default Album;
