import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Tooltip } from 'react-bootstrap';
import shareIcon from '../images/share.png';
import '../css/ShareButton.css';

const copy = require('clipboard-copy');

function ShareButton(props) {
  const [ulrCopy, setUrlCopy] = useState(false);
  const target = useRef(null);

  const copyToClip = () => {
    const pathHome = window.location.href.split('/')[2];
    const { history } = props;
    const { pathname } = history.location;
    if (pathname.includes('in-progress')) {
      const split = pathname.split('/i')[0];
      copy(`http://${pathHome}${split}`);
    } else {
      copy(`http://${pathHome}${pathname}`);
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
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

ShareButton.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ShareButton;
