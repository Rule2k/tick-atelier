import React from 'react';
import PropTypes from 'prop-types';

import TicketAddComment from 'src/containers/ShowOneTicket/AddComment';
import TicketClosingAssignButtons from 'src/containers/ShowOneTicket/TicketClosingAssignButtons';
import TicketPresentation from './TicketPresentation';
import TicketDescription from './TicketDescription';
import TicketComments from './TicketComments';

import './main.scss';

const Main = ({ ticket, currentUser }) => (
  <div id="main">
    <TicketPresentation
      title={ticket.title}
      date={ticket.created_at}
      priority={ticket.priority}
      status={ticket.status}
      tags={ticket.tags}
      assign={ticket.assignement}
      user={ticket}
    />
    <TicketDescription
      desc={ticket.description}
      link={ticket.repo_url}
    />
    <TicketComments
      comments={ticket.answers}
      currentTicket={ticket}
      currentUser={currentUser}
    />
    <TicketAddComment currentTicket={ticket} />
    <TicketClosingAssignButtons currentTicket={ticket} currentUser={currentUser} />
  </div>
);

Main.propTypes = {
  ticket: PropTypes.shape({
    title: PropTypes.string,
    created_at: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.array,
    assignement: PropTypes.string,
    description: PropTypes.string,
    repo_url: PropTypes.string,
    answers: PropTypes.array,
  }).isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Main;
