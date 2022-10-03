import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileContainer from '../components/ProfileContainer';

function Profile(props) {
  const { history } = props;

  return (
    <div>
      <Header />
      <Footer />
      <ProfileContainer
        history={ history }
      />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
