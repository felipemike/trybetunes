import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Band from '../components/Band';
import Loading from '../components/Loading';
import '../styles/pages/Search.css';

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
        <main className="page-search">
          <section className="search-form-container">
            <form>
              <input
                type="text"
                name="searchButton"
                value={ searchButton }
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
                Procurar
              </button>
            </form>
          </section>
          { displayLoading && <Loading /> }
          { displayResult && <Band data={ resultBand } band={ band } /> }
        </main>
      </div>
    );
  }
}
