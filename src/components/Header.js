import React from 'react';
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
      </header>
    );
  }
}

export default Header;
