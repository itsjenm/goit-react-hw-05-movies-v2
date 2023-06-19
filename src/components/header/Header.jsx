import React from 'react';
import { Link } from 'react-router-dom';
import Styled from './Header.module.css';

export const Header = () => {
  return (
    <div className={Styled.header_container}>
      <ul className={Styled.nav_tabs}>
        <li className={Styled.nav_items}>
          <Link to="/" className={Styled.active}>Home</Link>
        </li>
        <li>
          <Link to="/movies" className={Styled.active}>Movies</Link>
        </li>
      </ul>
    </div>
  );
};
