import React from 'react';
import { Breakpoint } from 'react-socks';
import PropTypes from 'prop-types';


const LogOut = ({ userDisconnected }) => (
  <div>
    <Breakpoint medium down>
      <div id="header-mobile-top-logout" onClick={userDisconnected}>
      Déconnexion
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div id="header-top-logout" onClick={userDisconnected}>
        Déconnexion
      </div>
    </Breakpoint>
  </div>
);

LogOut.propTypes = {
  userDisconnected: PropTypes.func.isRequired,
};

export default LogOut;
