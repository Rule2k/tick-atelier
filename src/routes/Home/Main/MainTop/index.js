import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MainTop = ({
  showAllTicketsUser, showAllTicketsAdmin, showMyTicketsUser, showMyTicketsAdmin,
  currentUser, switchHome, switchAllTickets, switchMyTickets,
}) => {
  const classesOfAllTickets = classNames({
    'inactive-all-tickets': switchHome === 'my-ticket',
  });
  const classesOfMyTickets = classNames({
    'inactive-my-tickets': switchHome === 'all-ticket',
  });

  const handleShowAllTicketsAdmin = () => {
    switchAllTickets();
    showAllTicketsAdmin();
  };

  const handleShowMyTicketsAdmin = () => {
    switchMyTickets();
    showMyTicketsAdmin();
  };

  const handleShowAllTicketsUser = () => {
    switchAllTickets();
    showAllTicketsUser();
  };

  const handleShowMyTicketsUser = () => {
    switchMyTickets();
    showMyTicketsUser();
  };

  return (
    <div id="main-top">
      <div
        className={classesOfAllTickets}
        onClick={currentUser.admin ? handleShowAllTicketsAdmin : handleShowAllTicketsUser}
      >
        Tous les tickets
      </div>
      <div
        className={classesOfMyTickets}
        onClick={currentUser.admin ? handleShowMyTicketsAdmin : handleShowMyTicketsUser}
      >
        Mes tickets
      </div>
    </div>
  );
};

MainTop.propTypes = {
  showAllTicketsUser: PropTypes.func.isRequired,
  showAllTicketsAdmin: PropTypes.func.isRequired,
  showMyTicketsUser: PropTypes.func.isRequired,
  showMyTicketsAdmin: PropTypes.func.isRequired,
  switchAllTickets: PropTypes.func.isRequired,
  switchMyTickets: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
  }).isRequired,
  switchHome: PropTypes.string.isRequired,
};

export default MainTop;
