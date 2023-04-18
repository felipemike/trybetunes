import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileStructure from '../components/ProfileStructure';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',

  };

  componentDidMount() {
    getUser()
      .then((userData) => this.setState({ ...userData }));
  }

  render() {
    const { name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { !name ? <Loading />
          : <ProfileStructure { ...{ name, email, image, description } } />}
      </div>
    );
  }
}
