import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from './Header.module.css';

export const Header = () => {

 
  return (
    <div className={Styled.header_container}>
      <ul className={Styled.nav_tabs}>
        <li className={Styled.nav_items}>
          <NavLink to="/" >Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies" >Movies</NavLink>
        </li>
      </ul>
    </div>
  );
};
