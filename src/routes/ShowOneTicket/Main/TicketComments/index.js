import React from 'react';
import PropTypes from 'prop-types';

import './ticketcomments.scss';
import TicketOneComment from 'src/containers/ShowOneTicket/TicketOneComment';

const TicketComments = ({ comments, currentUser, currentTicket }) => (
  <div id="ticket-comments">
    {comments.map(comment => (
      <TicketOneComment
        key={comment.answer_id}
        id={comment.answer_id}
        user={comment}
        date={comment.created_at}
        message={comment.body}
        currentTicket={currentTicket}
        currentUser={currentUser}
      />
    ))}
  </div>
);

TicketComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.object.isRequired,
  currentTicket: PropTypes.object.isRequired,
};

TicketComments.defaultProps = {
  comments: [],
};


export default TicketComments;
