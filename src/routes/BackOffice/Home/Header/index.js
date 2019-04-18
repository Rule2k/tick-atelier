import React from 'react';
import { Link } from 'react-router-dom';


import Notifications from 'src/containers/Home/Notifications';
import Logo from './Logo';
import Search from './Search';
import LogOut from './LogOut';
import Buttons from './Buttons';

import './header.scss';

const Header = () => (
  <div id="header-backoffice">
    <div id="header-backoffice-top">
      <Link to="/">
        <Logo />
      </Link>
      <Search />
      <Notifications />
      <LogOut />
    </div>
    <Buttons />
  </div>
);

export default Header;
