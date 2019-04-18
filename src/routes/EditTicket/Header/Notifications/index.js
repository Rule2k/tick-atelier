import React from 'react';
import PropTypes from 'prop-types';

const Notifications = ({ user }) => (
  <div id="header-top-notifications">
    <p>Bonjour,</p>
    <p><span>{user.firstname} {user.lastname}</span></p>
    <p>{user.active_group}</p>
  </div>
);

export default Notifications;

Notifications.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    active_group: PropTypes.string,
  }).isRequired,
};
