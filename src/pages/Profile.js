import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="page-profile">PROFILE</p>
      </div>
    );
  }
}

export default Profile;
