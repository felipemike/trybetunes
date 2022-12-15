import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends React.Component {
  state = {
    loading: false,
    favoriteSong: false,
    musics: [],
  };

  componentDidMount() {
    (
      this.fetchFavorites());
  }

  verifyFavorites = () => {
    const { musics } = this.state;
    const { musicData } = this.props;
    const favorite = musics.find((music) => music.trackId === musicData.trackId);
    if (favorite) {
      this.setState({
        favoriteSong: true,
      });
    }
  };

  fetchFavorites = () => {
    this.setState({
      loading: true,
    }, async () => {
      const musics = await getFavoriteSongs();
      this.setState({
        musics,
        loading: false,
      }, () => this.verifyFavorites());
    });
  };

  handleChange = ({ target }) => {
    const { id } = target;
    this.setState({
      loading: true,
    }, async () => {
      const { favoriteSong } = this.state;
      const music = await getMusics(id);
      if (favoriteSong) {
        await removeSong(...music);
      } else {
        await addSong(...music);
      }
      this.setState({
        favoriteSong: !favoriteSong,
        loading: false,
      });
    });
  };

  render() {
    const { musicData } = this.props;
    const { loading, favoriteSong } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ musicData.trackName }</p>
        <div>

          <img src={ musicData.artworkUrl100 } alt={ musicData.collectionName } />

          <audio
            data-testid="audio-component"
            src={ musicData.previewUrl }
            controls
          >
            <track kind="captions" />
            Erro ao carregar o arquivo de áudio
            {' '}
            <code>audio</code>
          </audio>
          <label
            htmlFor={ musicData.trackName }
          >
            Favorite
            <input
              data-testid={ `checkbox-music-${musicData.trackId}` }
              type="checkbox"
              id={ musicData.trackId }
              name="favoriteSong"
              checked={ favoriteSong }
              onChange={ this.handleChange }
            />
          </label>
        </div>
      </div>
    );
  }
}
MusicCard.propTypes = {
  musicData: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
