import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="page-profile-edit">PROFILE-EDIT</p>
      </div>
    );
  }
}

export default ProfileEdit;
