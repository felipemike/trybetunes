import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    disableButton: true,
    searchButton: '',
  };

  handleChange = (element) => {
    const { target: { value } } = element;
    this.setState({
      disableButton: value.length < 2,
      searchButton: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({

    });
    this.setState({
      searchButton: '',
    });
  };

  render() {
    const { disableButton, searchButton } = this.state;
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
        </form>
      </div>
    );
  }
}
