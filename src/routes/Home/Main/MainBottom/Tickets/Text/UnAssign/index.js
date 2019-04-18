import React from 'react';
import PropTypes from 'prop-types';
import { Breakpoint } from 'react-socks';

const UnAssign = ({ unassignAdminToTicket, ticketId }) => {
  const handleClickunassignButton = () => {
    unassignAdminToTicket(ticketId);
  };
  return (
    <div>
      <Breakpoint medium down>
        <div className="main-mobile-bottom-tickets-text-top-admin-assign-button" onClick={handleClickunassignButton}>Se désassigner</div>
      </Breakpoint>

      <Breakpoint large up>
    <div className="main-bottom-tickets-text-top-admin-assign-button" onClick={handleClickunassignButton}>Se désassigner</div>
      </Breakpoint>
    </div>

  );
};

UnAssign.propTypes = {
  unassignAdminToTicket: PropTypes.func.isRequired,
  ticketId: PropTypes.number.isRequired,
};

export default UnAssign;
