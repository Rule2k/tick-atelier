import React from 'react';
import PropTypes from 'prop-types';

import './ticketclosingbutton.scss';

const TicketClosingAssignButtons = ({
  currentUser, assignAdminToTicket, unassignAdminToTicket, currentTicket, closeThisTicket,
}) => {
  const handleClickAssignButton = () => {
    assignAdminToTicket(currentTicket.issue_id);
  };
  const handleClickUnassignedButton = () => {
    unassignAdminToTicket(currentTicket.issue_id);
  };
  const handleCloseThisTicket = () => {
    closeThisTicket(currentTicket.issue_id);
  };
  return (
    <div id="closing-button">
      {(currentUser.admin || (currentUser.username === currentTicket.owner))
      && <button type="button" id="ticket-closing-button" onClick={handleCloseThisTicket}>Fermer le ticket</button>}
      {(currentUser.admin && currentTicket.assignement === null && (
      <button
        type="button"
        id="ticket-assign-button"
        onClick={handleClickAssignButton}
      >
        S'assigner
      </button>
      ))}
      {(currentUser.admin && currentTicket.assignement !== null && (
      <button
        type="button"
        id="ticket-assign-button"
        onClick={handleClickUnassignedButton}
      >
        Enlever l'assignation
      </button>
      ))}
    </div>
  );
};

TicketClosingAssignButtons.propTypes = {
  assignAdminToTicket: PropTypes.func.isRequired,
  closeThisTicket: PropTypes.func.isRequired,
  unassignAdminToTicket: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentTicket: PropTypes.object.isRequired,
};

export default TicketClosingAssignButtons;
