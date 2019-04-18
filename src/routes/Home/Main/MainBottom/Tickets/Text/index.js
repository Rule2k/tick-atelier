import React from 'react';
import { Breakpoint } from 'react-socks';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import AssignTo from 'src/containers/Home/AssignTo';
import UnAssign from 'src/containers/Home/UnAssign';

const Text = ({
  title, desc, date, ticketId, currentUser, ticket,
}) => {
  let trimmedDesc = desc.substr(0, 100);
  trimmedDesc = trimmedDesc.substr(0, Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(' ')));
  return (
    <div className="fixed-width-text">
    <Breakpoint medium down>
        <div className="main-mobile-bottom-tickets-text">
          <div className="main-mobile-bottom-tickets-text-top">
            <div className="main-mobile-bottom-tickets-text-top-admin-assign">
              <Link to={`/show-ticket/${ticketId}`}>
                <div className="main-mobile-bottom-tickets-text-top-title">
                  {title}
                </div>
              </Link>
              {(currentUser.admin && ticket.assignement === null && <AssignTo ticketId={ticketId} />)}
              {(currentUser.admin && ticket.assignement === currentUser.username && <UnAssign ticketId={ticketId} />)}
            </div>
            <div className="main-mobile-bottom-tickets-text-top-date">
              le {date} par {ticket.firstname_owner} {ticket.lastname_owner}
            </div>
          </div>
          <div className="main-mobile-bottom-tickets-text-description">
            {}
            {`${trimmedDesc} ...`}
          </div>
        </div>
      </Breakpoint>
  
      <Breakpoint large up>
        <div className="main-bottom-tickets-text">
          <div className="main-bottom-tickets-text-top">
            <div className="main-bottom-tickets-text-top-admin-assign">
              <Link to={`/show-ticket/${ticketId}`}>
                <div className="main-bottom-tickets-text-top-title">
                  {title}
                </div>
              </Link>
              {(currentUser.admin && ticket.assignement === null && <AssignTo ticketId={ticketId} />)}
              {(currentUser.admin && ticket.assignement === currentUser.username && <UnAssign ticketId={ticketId} />)}
            </div>
            <div className="main-bottom-tickets-text-top-date">
              le {date} par {ticket.firstname_owner} {ticket.lastname_owner}
            </div>
          </div>
          <div className="main-bottom-tickets-text-description">
            {}
            {`${trimmedDesc} ...`}
          </div>
        </div>
      </Breakpoint>
    </div>

  );
};

Text.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  ticketId: PropTypes.number.isRequired,
  currentUser: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  ticket: PropTypes.shape({
    assignement: PropTypes.string,
    firstname_owner: PropTypes.string.isRequired,
    lastname_owner: PropTypes.string.isRequired,
  }).isRequired,
};


export default Text;
