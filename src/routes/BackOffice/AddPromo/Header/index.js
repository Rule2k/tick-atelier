import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../Home/Header/Logo';
import './header.scss';

const Header = () => (
  <div id="backoffice-addpromo-header">
    <Link to="/">
      <Logo />
    </Link>
    <Link to="/admin">
      <button className="backoffice-addpromo-header-button">Retour au Back-Office</button>
    </Link>
    <Link to="/">
      <button className="backoffice-addpromo-header-button">Retour à la home</button>
    </Link>
  </div>
);

export default Header;
