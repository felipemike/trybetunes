import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/pages/Album.css';

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
        <main className="album-details-container">
          <section className="album-info-container">
            <span data-testid="artist-name">{albumData.artistName}</span>
            <h3 data-testid="album-name">{albumData.collectionName}</h3>
          </section>
          <section className="album-songs-container">
            {artistMusics.map((music) => (
              <MusicCard
                key={ music.trackId }
                musicData={ music }
                onClick={ () => {} }
              />
            ))}
          </section>
        </main>
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
