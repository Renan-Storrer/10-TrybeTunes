import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { loading, userName } = this.state;
    if (loading === true) {
      return (
        <Loading />
      );
    }
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{`Olá ${userName}!`}</h1>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Musicas favoritadas</Link>
        <Link to="/profile" data-testid="link-to-profile">Meu perfil</Link>
      </header>
    );
  }
}

export default Header;
