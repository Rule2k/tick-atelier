import React from 'react';
import PropTypes from 'prop-types';

import App from 'src/containers/Home/App';
import Login from 'src/containers/Login/Login';

const DisplayAppOrLogin = ({ isLoggedIn }) => (
  isLoggedIn ? <App /> : <Login />
);

DisplayAppOrLogin.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default DisplayAppOrLogin;
