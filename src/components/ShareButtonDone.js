import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Tooltip } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButtonDone(props) {
  const { recipe, index } = props;
  const { type, id } = recipe;
  const [ulrCopy, setUrlCopy] = useState(false);
  const target = useRef(null);
  const copyToClip = () => {
    const pathHome = window.location.href.split('/')[2];
    const linkToCopy = type === 'meal' ? `http://${pathHome}/meals/${id}`
      : `http://${pathHome}/drinks/${id}`;
    copy(linkToCopy);
    setUrlCopy(true);
  };

  return (
    <div
      className="share-btn"
    >
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        className="recipe-footer-btn"
        onClick={ () => {
          copyToClip();
          setUrlCopy(!ulrCopy);
        } }
        ref={ target }
      >
        <img src={ shareIcon } alt="Compartilhar" className="share" />
      </button>
      <Overlay target={ target.current } show={ ulrCopy } placement="top">
        {(p) => (
          <Tooltip { ...p }>
            Link Copied!
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

ShareButtonDone.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default ShareButtonDone;
