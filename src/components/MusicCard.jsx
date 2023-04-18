import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/components/MusicCard.css';

export default class MusicCard extends React.Component {
  state = {
    loading: false,
    favoriteSong: false,
  };

  componentDidMount() {
    this.fetchFavorites();
  }

  verifyFavorites = (musics) => {
    const { musicData } = this.props;
    const music = musics.find((item) => item.trackId === musicData.trackId);
    if (music) return music;
    return false;
  };

  fetchFavorites = () => {
    this.setState({
      loading: true,
    }, async () => {
      const musics = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteSong: this.verifyFavorites(musics),
      });
    });
  };

  handleChange = ({ target: { checked } }) => {
    const { musicData } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      if (checked) {
        await removeSong(musicData);
      } else {
        await addSong(musicData);
      }
      this.setState({
        favoriteSong: checked,
        loading: false,
      });
    });
  };

  render() {
    const { musicData, onClick } = this.props;
    const { loading, favoriteSong } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="music-card-container">
        <span>{musicData.trackName}</span>

        <img src={ musicData.artworkUrl100 } alt={ musicData.collectionName } />

        <audio
          className="audio-player"
          data-testid="audio-component"
          src={ musicData.previewUrl }
          controls
        >
          <track kind="captions" />
          Erro ao carregar o arquivo de áudio
          {' '}
          <code>audio</code>
        </audio>
        <div className="favorite-icon-container">
          <input
            htmlFor={ musicData.trackName }
            data-testid={ `checkbox-music-${musicData.trackId}` }
            type="checkbox"
            id={ musicData.trackId }
            name="favoriteSong"
            checked={ favoriteSong }
            onChange={ this.handleChange }
            onClick={ onClick }
          />
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
  onClick: PropTypes.func.isRequired,
};
