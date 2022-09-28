import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton(props) {
  const [ulrCopy, setUrlCopy] = useState(false);

  const copyToClip = () => {
    const pathHome = window.location.href.split('/')[2];
    const { history } = props;
    const { pathname } = history.location;
    const linkToCopy = `http://${pathHome}${pathname}`;
    copy(linkToCopy);
    setUrlCopy(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyToClip }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      {ulrCopy && <p>Link copied!</p>}
    </div>

  );
}

ShareButton.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ShareButton;
