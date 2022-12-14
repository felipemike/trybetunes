import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
    };
  }

  componentDidMount() {
    getUser()
      .then((param) => this
        .setState({ login: param.name }));
  }

  render() {
    const { login } = this.state;
    return (
      login === '' ? <Loading />
        : (

          <header data-testid="header-component">
            <div className="user" data-testid="header-user-name">
              <p>
                { login }
              </p>
            </div>
            <nav>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </nav>
          </header>

        )
    );
  }
}

export default Header;
