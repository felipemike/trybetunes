import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import headerLogo from '../assets/header-logo.png';
import noPicture from '../assets/no-picture-small.png';
import '../styles/components/Header.css';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      image: '',
    };
  }

  componentDidMount() {
    getUser()
      .then((param) => this
        .setState({ login: param.name }));
  }

  render() {
    const { login, image } = this.state;
    return (
      login === '' ? <Loading />
        : (

          <header data-testid="header-component">
            <img
              className="trybetunes-logo"
              src={ headerLogo }
              alt="logotipo do TrybeTunes"
            />
            <div className="username-container">
              <img
                src={ image || noPicture }
                alt="Foto de perfil"
              />
              <spam className="user" data-testid="header-user-name">
                { login }
              </spam>
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
