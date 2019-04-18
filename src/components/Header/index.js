import React from 'react';
import { Link } from 'react-router-dom';
import { Breakpoint } from 'react-socks';
import PropTypes from 'prop-types';


import Notifications from 'src/containers/Home/Notifications';
import SearchForm from 'src/containers/Home/SearchForm';
import LogOut from 'src/containers/Home/LogOut';

import NewTicket from './NewTicket';
import Logo from './Logo';
import BackOfficeButton from './BackOfficeButton';


import './header.scss';

const Header = ({ admin }) => (
  <div>
    <Breakpoint medium down>
      <div id="header-mobile">
        <div id="header-mobile-top">
          <Link to="/">
            <Logo />
          </Link>
          <LogOut />
        </div>
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
        {!admin && <NewTicket user={admin} />}
        {admin && <div><BackOfficeButton /></div>}
      </div>
    </Breakpoint>
  </div>
);

Header.propTypes = {
  admin: PropTypes.bool.isRequired,
};
export default Header;
