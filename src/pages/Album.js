import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    artistMusics: [],
    albumData: '',
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const [albumData, ...artistMusics] = await getMusics(match.params.id);
    this.setState({
      artistMusics,
      albumData,
    });
  };

  render() {
    const { artistMusics, albumData } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <h2 data-testid="artist-name">{albumData.artistName}</h2>
            <h3 data-testid="album-name">{albumData.collectionName}</h3>
          </div>
          {artistMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              musicData={ music }
              onClick={ () => {} }
            />
          ))}
        </div>
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
