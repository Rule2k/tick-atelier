import React from 'react';

import Main from 'src/containers/ShowOneTicket/Main';
import Header from 'src/containers/ShowOneTicket/Header';
import Footer from './Footer';

const ShowOneTicket = ticket => (
  <div id="ShowOneTicket">
    <Header />
    <Main ticket={ticket.ticket} />
    <Footer />
  </div>
);


export default ShowOneTicket;
