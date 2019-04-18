import React from 'react';
import PropTypes from 'prop-types';

import './ticketdescription.scss';

const TicketPresentation = ({ desc, link }) => {
  let correctedLink = link.toLowerCase().replace('www.', '');
  correctedLink = `//${correctedLink}`;
  return (
    <div id="main-description-ticket">
      <div id="main-description-ticket-content">{desc}</div>
      <a id="main-description-ticket-link" rel="noopener noreferrer" target="_blank" href={correctedLink}>Link to github</a>
    </div>
  );
};

TicketPresentation.propTypes = {
  desc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default TicketPresentation;
