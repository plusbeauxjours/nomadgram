import React, { Component } from 'react';
import PropTypes from "prop-types";
import SignupForm from './presenter';

class Container extends Component {
  state = {
    email: "",
    name: "",
    username: "",
    password: ""
  };
  static PropTypes = {
    facebookLogin: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired
  }
  render() {
    const { email, name, username, password } = this.state;
    return (
      <SignupForm
        emailValue={email}
        nameValue={name}
        usernameValue={username}
        passwordValue={password}
        handleFacebookLogin={this._handleFacebookLogin}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }
  _handleInputChange = event => {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };
  _handleSubmit = event => {
    const { username, password, email, name } = this.state;
    const { createAccount } = this.props;
    event.preventDefault();
    createAccount(username, password, email, name);
  };
  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken)
  };
}

export default Container;