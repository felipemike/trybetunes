import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  state = {
    loading: false,
    favoritesList: [],
  };

  async componentDidMount() {
    await this.fetchFavoritesSongs();
  }

  fetchFavoritesSongs = async () => {
    this.setState({ loading: true });
    const favoritesList = await getFavoriteSongs();
    this.setState({
      favoritesList,
      loading: false,
    });
  };

  favoretChange = async () => {
    await this.fetchFavoritesSongs();
  };

  render() {
    const { loading, favoritesList } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <main className="page-favorites">
          <section>
            <h3 className="favorite-songs-header">Músicas favoritas:</h3>
            {favoritesList.map((music) => (
              <MusicCard
                key={ music.trackId }
                musicData={ music }
                onClick={ this.favoretChange }
              />
            ))}
          </section>
        </main>
      </div>
    );
  }
}
