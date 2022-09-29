import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButtonDone(props) {
  const { recipe, index } = props;
  const { type, id } = recipe;
  const [ulrCopy, setUrlCopy] = useState(false);
  const copyToClip = () => {
    const pathHome = window.location.href.split('/')[2];
    console.log(pathHome);
    const linkToCopy = type === 'meal' ? `http://${pathHome}/meals/${id}`
      : `http://${pathHome}/drinks/${id}`;
    copy(linkToCopy);
    setUrlCopy(true);
  };

  return (
    <div>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ copyToClip }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      {ulrCopy && <p>Link copied!</p>}
    </div>

  );
}

ShareButtonDone.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default ShareButtonDone;
