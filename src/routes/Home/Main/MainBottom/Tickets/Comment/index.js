import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ numberOfTicket }) => (
  <div className="main-bottom-tickets-comment">
    {numberOfTicket}
  </div>
);

Comment.propTypes = {
  numberOfTicket: PropTypes.number.isRequired,
};

export default Comment;
