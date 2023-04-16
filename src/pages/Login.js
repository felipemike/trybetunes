import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    buttonDisabled: true,
    loading: false,
  };

  handleClick = () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    createUser({ name, email, description, image }).then(() => history.push('/search'));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const number = 3;
    this.setState({
      [name]: value,
    });
    if (name === 'name') {
      this.setState({
        buttonDisabled: value.length < number,
      });
    }
  };

  render() {
    const { name, loading, buttonDisabled } = this.state;
    return (
      <div data-testid="page-login" className="page-login">
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <form>
            <label htmlFor="login-name-input">
              Nome:
              <input
                id="login-name-input"
                data-testid="login-name-input"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            ;
            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ this.handleClick }
              disabled={ buttonDisabled }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
