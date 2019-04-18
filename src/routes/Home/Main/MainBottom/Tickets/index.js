import React from 'react';
import { Link } from 'react-router-dom';
import { Breakpoint } from 'react-socks';
import PropTypes from 'prop-types';

import Left from './Left';
import Text from './Text';
import Tags from './Tags';
import Assign from './Assign';
import Comment from './Comment';
import Edit from './Edit';

const Tickets = ({ ticket, user, editTicket }) => {
  const ticketEdited = () => {
    editTicket(ticket);
  };
  return (
    <div>
      <Breakpoint medium down>
        <div className="main-mobile-bottom-tickets">
          <Text title={ticket.title} desc={ticket.description} date={ticket.created_at} ticketId={ticket.issue_id} currentUser={user} ticket={ticket} />
          <Left priority={ticket.priority} status={ticket.status} />
          <Tags tags={ticket.tags} />
          <Comment numberOfTicket={ticket.answers.length} />
        </div>
      </Breakpoint>

      <Breakpoint large up>
        <div className="main-bottom-tickets">
          <Left priority={ticket.priority} status={ticket.status} />
          <Text title={ticket.title} desc={ticket.description} date={ticket.created_at} ticketId={ticket.issue_id} currentUser={user} ticket={ticket} />
          <Tags tags={ticket.tags} />
          <Assign assign={ticket.assignement} />
          <Comment numberOfTicket={ticket.answers.length} />
          {(user.admin && <Link to={`edit/${ticket.issue_id}`} onClick={ticketEdited}><Edit /></Link>)
            || (user.username === ticket.owner && <Link to={`edit/${ticket.issue_id}`} onClick={ticketEdited}><Edit /></Link>)}
        </div>
      </Breakpoint>
    </div>
  );
};

Tickets.propTypes = {
  ticket: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  editTicket: PropTypes.func.isRequired,
};

export default Tickets;
