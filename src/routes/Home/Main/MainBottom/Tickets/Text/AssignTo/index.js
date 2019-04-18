import React from 'react';
import PropTypes from 'prop-types';
import { Breakpoint } from 'react-socks';


const AssignTo = ({ assignAdminToTicket, ticketId }) => {
  const handleClickAssignButton = () => {
    assignAdminToTicket(ticketId);
  };
  return (
    <div>
      <Breakpoint medium down>
        <div className="main-mobile-bottom-tickets-text-top-admin-assign-button" onClick={handleClickAssignButton}>S'assigner</div>
      </Breakpoint>

      <Breakpoint large up>
        <div className="main-bottom-tickets-text-top-admin-assign-button" onClick={handleClickAssignButton}>S'assigner</div>
      </Breakpoint>
    </div>
  );
};

AssignTo.propTypes = {
  assignAdminToTicket: PropTypes.func.isRequired,
  ticketId: PropTypes.number.isRequired,
};


export default AssignTo;
