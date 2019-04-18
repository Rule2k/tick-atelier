import React from 'react';
import PropTypes from 'prop-types';
import { Breakpoint } from 'react-socks';

// import Search from './Search';
import Tickets from './Tickets';


const MainBottom = ({ tickets, user, editTicket }) => {
  return (
    <div>

      <Breakpoint medium down>
        <div id="main-mobile-bottom">
          {tickets.map(ticket => (
            <Tickets ticket={ticket} user={user} editTicket={editTicket} key={ticket.issue_id} />
          ))}
        </div>
      </Breakpoint>

      <Breakpoint large up>
        <div id="main-bottom">
          {/* <Search /> */}
          {tickets.map(ticket => (
            <Tickets ticket={ticket} user={user} editTicket={editTicket} key={ticket.issue_id} />
          ))}
        </div>
      </Breakpoint>
    </div>
  );
};

MainBottom.propTypes = {
  tickets: PropTypes.array,
  user: PropTypes.object.isRequired,
  editTicket: PropTypes.func.isRequired,
};

MainBottom.defaultProps = {
  tickets: [],
};

export default MainBottom;
