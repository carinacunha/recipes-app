import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathName = pathname.replace('/', '').replace('-', ' ').split(' ');
  const title = pathName.map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(' ');

  // if (pathName.includes(' ')) {
  //   title = pathName.split(' ')
  //     .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
  //     .join(' ');
  // } else { title = pathName.charAt(0).toUpperCase() + pathName.slice(1); }

  return (
    <section>
      <input
        type="image"
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile"
        onClick={ () => history.push('/profile') }
      />

      <h1
        className="title"
        data-testid="page-title"
      >
        { title }
      </h1>
    </section>
  );
}

export default Header;
