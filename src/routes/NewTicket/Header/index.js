import React from 'react';
import { Link } from 'react-router-dom';
import { Breakpoint } from 'react-socks';

import Notifications from 'src/containers/Home/Notifications';
import SearchForm from 'src/containers/Home/SearchForm';
import LogOut from 'src/containers/Home/LogOut';
import BackToHome from './BackToHome';

import Logo from './Logo';


import './header.scss';

const Header = () => (
  <div>
    <Breakpoint medium down>
      <div id="header-mobile">
        <div id="header-mobile-top">
          <Link to="/">
            <Logo />
          </Link>
          <LogOut />
        </div>
        <BackToHome />
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div id="header">
        <div id="header-top">
          <Link to="/">
            <Logo />
          </Link>
          <SearchForm />
          <Notifications />
          <LogOut />
        </div>
        <BackToHome />
      </div>
    </Breakpoint>
  </div>
);

export default Header;
