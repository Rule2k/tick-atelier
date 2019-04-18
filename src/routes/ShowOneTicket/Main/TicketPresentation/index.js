import React from 'react';
import PropTypes from 'prop-types';

import { Breakpoint } from 'react-socks';

import './ticketpresentation.scss';

const TicketPresentation = ({
  title, date, priority, status, tags, assign, user,
}) => (
  <div>
    <Breakpoint medium down>
      <div id="main-mobile-presentation-ticket">
        <div id="main-mobile-presentation-ticket-status">
          <div className="font-weight-light">Statut :</div>
          <div>{status}</div>
        </div>
        <div id="main-mobile-presentation-ticket-priority">
          <div className="font-weight-light">Priorité</div>
          <div>{priority}</div>
        </div>
        <div id="main-mobile-presentation-ticket-infos">
          <div id="main-mobile-presentation-ticket-infos-title">{title}</div>
          <div id="main-mobile-presentation-ticket-infos-misc">écrit par {user.firstname_owner} {user.lastname_owner}, le {date}</div>
        </div>
        <div id="main-mobile-presentation-ticket-assign">
          <div className="font-weight-light">Assigné à :</div>
          <div>{assign ? assign.toLowerCase().replace('oclock', '') : 'Non assigné'}</div>
          <div id="main-mobile-presentation-ticket-tag">
            {
              tags.map(tag => (
                <div key={tag}>{tag}</div>
              ))
            }
          </div>
        </div>
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div id="main-presentation-ticket">
        <div id="main-presentation-ticket-status">
          <div className="font-weight-light">Statut :</div>
          <div>{status}</div>
        </div>
        <div id="main-presentation-ticket-priority">
          <div className="font-weight-light">Priorité</div>
          <div>{priority}</div>
        </div>
        <div id="main-presentation-ticket-infos">
          <div id="main-presentation-ticket-infos-title">{title}</div>
          <div id="main-presentation-ticket-infos-misc">écrit par {user.firstname_owner} {user.lastname_owner}, le {date}</div>
        </div>
        <div id="main-presentation-ticket-assign">
          <div className="font-weight-light">Assigné à :</div>
          <div>{assign ? assign.toLowerCase().replace('oclock', '') : 'Non assigné'}</div>
        </div>
        <div id="main-presentation-ticket-tag">
          {
            tags.map(tag => (
              <div key={tag}>{tag}</div>
            ))
          }
        </div>
      </div>
    </Breakpoint>
  </div>
);

TicketPresentation.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  assign: PropTypes.string,
  user: PropTypes.shape({
    firstname_owner: PropTypes.string.isRequired,
    lastname_owner: PropTypes.string.isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TicketPresentation.defaultProps = {
  assign: null,
};

export default TicketPresentation;
