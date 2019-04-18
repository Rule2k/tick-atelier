
import { connect } from 'react-redux';

import TicketClosingAssignButtons from 'src/routes/ShowOneTicket/Main/TicketClosingAssignButtons';
import { assignAdminToTicket, unassignAdminToTicket } from 'src/store/reducers/assign-reducer';
import { closeThisTicket } from 'src/store/reducers/tickets-reducer';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  assignAdminToTicket: (ticketId) => {
    dispatch(assignAdminToTicket(ticketId));
  },
  unassignAdminToTicket: (ticketId) => {
    dispatch(unassignAdminToTicket(ticketId));
  },
  closeThisTicket: (ticketId) => {
    dispatch(closeThisTicket(ticketId));
  },
});

const TicketClosingAssignButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketClosingAssignButtons);

export default TicketClosingAssignButtonsContainer;
