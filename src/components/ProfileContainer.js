import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../css/Profile.css';

function ProfileContainer(props) {
  const [email, setEmail] = useState('');
  const [gravatarUrl, setGravatarUrl] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const hash = md5(user.email).toString();
    if (user) {
      setEmail(user.email);
      setGravatarUrl(`https://www.gravatar.com/avatar/${hash}`);
    } else {
      setEmail('');
      setGravatarUrl('https://www.gravatar.com/avatar/');
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
    <motion.div
      className="profile-container"
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
    >
      <img src={ gravatarUrl } alt="profile" className="profile-image" />
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
    </motion.div>
  );
}

ProfileContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileContainer;
