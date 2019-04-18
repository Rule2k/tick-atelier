import React from 'react';
import { Link } from 'react-router-dom';
import { Breakpoint } from 'react-socks';

const BackToHome = () => (
  <div>
    <Breakpoint medium down>
      <div id="header-mobile-new-ticket">
        <Link to="/">
          <div id="header-mobile-new-ticket-button-ticket">Retour à l'accueil</div>
        </Link>
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div id="header-new-ticket">
        <Link to="/">
          <div id="header-new-ticket-button-ticket">Retour à l'accueil</div>
        </Link>
      </div>
    </Breakpoint>
  </div>
);

export default BackToHome;
