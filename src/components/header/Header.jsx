import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Styled from './Header.module.css';

export const Header = () => {
  return (
    <div className={Styled.header_container}>
      <ul className={Styled.nav_links}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
      </ul>
    </div>
  );
};
