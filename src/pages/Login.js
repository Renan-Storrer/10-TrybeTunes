import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    btnDisabled: true,
    loading: false,
    redirect: false,
  };

  handleChange = (event) => {
    const { target: { value } } = event;
    this.setState({ name: value }, () => this.buttonAvailable());
  };

  buttonAvailable = () => {
    const minimo = 3;
    const { name } = this.state;
    if (name.length >= minimo) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ redirect: true });
  };

  render() {
    const { btnDisabled, loading, redirect } = this.state;
    return (
      <Route exact path="/">
        {loading ? <Loading /> : (
          <div data-testid="page-login">
            <h1>Login</h1>
            <label htmlFor="loginInput">
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ btnDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        )}
        {redirect && <Redirect to="/search" />}
      </Route>
    );
  }
}

export default Login;
