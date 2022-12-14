import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Album from '../components/Album';
import Loading from '../components/Loading';

export default class Search extends React.Component {
  state = {
    disableButton: true,
    searchButton: '',
    displayResult: false,
    resultBand: '',
    band: '',
  };

  handleChange = (element) => {
    const { target: { value } } = element;
    this.setState({
      disableButton: value.length < 2,
      searchButton: value,
    });
  };

  handleSubmit = async (event) => {
    const { searchButton } = this.state;
    event.preventDefault();
    this.setState({ searchButton: '' });
    searchAlbumsAPI(searchButton).then((band) => {
      this.setState({
        displayLoading: false,
        band: searchButton,
        searchButton: '',
        displayResult: true,
        resultBand: band,

      });
    });
  };

  render() {
    const {
      disableButton,
      searchButton, band,
      displayLoading,
      displayResult,
      resultBand } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            type="text"
            name="searchButton"
            value={ searchButton }
            id=""
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disableButton }
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
          { displayLoading && <Loading /> }
          { displayResult && <Album data={ resultBand } band={ band } /> }
        </form>
      </div>
    );
  }
}
