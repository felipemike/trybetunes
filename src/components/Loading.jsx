import React, { Component } from 'react';
import '../styles/components/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-message-container">
        <span>Carregando...</span>
      </div>
    );
  }
}
