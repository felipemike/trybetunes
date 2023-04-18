import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/components/AlbumsList.css';

export default class Album extends React.Component {
  render() {
    const { data, band } = this.props;
    if (data.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <main>
        <section className="albums-section">
          <h3>{ `Resultado de álbuns de: ${band}` }</h3>
          { data.map((album) => (
            <Link
              key={ album.collectionId }
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <div className="albums-cards-container">
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
                <p>{ album.artistName }</p>
              </div>
            </Link>
          )) }
        </section>
      </main>
    );
  }
}

Album.propTypes = {
  band: PropTypes.string.isRequired,
  data: PropTypes.func.isRequired,
};
