import React from 'react';
import { Link } from 'react-router-dom';

const BackOfficeButton = () => (
  <div id="header-new-ticket">
    <Link to="/admin"> <p id="header-new-ticket-backoffice">Accès au back office</p></Link>
  </div>
);

export default BackOfficeButton;
