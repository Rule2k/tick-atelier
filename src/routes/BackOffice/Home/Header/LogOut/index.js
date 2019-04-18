import React from 'react';
import { Link } from 'react-router-dom';

const LogOut = () => (
  <Link to="/Login">
    <div id="header-backoffice-top-logout">
      Déconnexion
    </div>
  </Link>
);

export default LogOut;
