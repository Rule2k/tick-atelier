import React from 'react';
import { Link } from 'react-router-dom';
import { Breakpoint } from 'react-socks';

const NewTicket = () => (
  <div>
    <Breakpoint medium down>
      <div id="header-mobile-new-ticket">
        <Link to="/new-ticket">
          <div id="header-mobile-new-ticket-button-ticket">Nouveau ticket</div>
        </Link>
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div id="header-new-ticket">
        <Link to="/new-ticket">
          <div id="header-new-ticket-button-ticket">Nouveau ticket</div>
        </Link>
      </div>
    </Breakpoint>
  </div>
);

export default NewTicket;
