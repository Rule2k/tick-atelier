import React from 'react';
import PropTypes from 'prop-types';

const Assign = ({ assign }) => (
  <div className="main-bottom-tickets-assign">
    {assign ? assign.toLowerCase().replace('oclock', '') : 'Non assigné'}
  </div>
);

Assign.propTypes = {
  assign: PropTypes.string,
};

Assign.defaultProps = {
  assign: null,
};


export default Assign;
