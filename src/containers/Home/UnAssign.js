
import { connect } from 'react-redux';

import UnAssign from 'src/routes/Home/Main/MainBottom/Tickets/Text/UnAssign';
import { unassignAdminToTicket } from 'src/store/reducers/assign-reducer';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  unassignAdminToTicket: (ticketId) => {
    dispatch(unassignAdminToTicket(ticketId));
  },
});

const UnAssignContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnAssign);

export default UnAssignContainer;
