import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/Profile.css';
import profile from '../images/profile.png';

function ProfileContainer(props) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmail(user.email);
    } else {
      setEmail('');
    }
  }, []);

  const { history } = props;

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div className="profile-container">
      <img src={ profile } alt="profile" className="profile-image" />
      <p data-testid="profile-email" className="profile-email">{email}</p>
      <div className="profile-buttons">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="profile-button"
          onClick={ handleDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="profile-button"
          onClick={ handleFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="profile-button"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

ProfileContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileContainer;
