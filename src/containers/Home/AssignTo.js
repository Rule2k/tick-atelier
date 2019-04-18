
import { connect } from 'react-redux';

import AssignTo from 'src/routes/Home/Main/MainBottom/Tickets/Text/AssignTo';
import { assignAdminToTicket } from 'src/store/reducers/assign-reducer';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  assignAdminToTicket: (ticketId) => {
    dispatch(assignAdminToTicket(ticketId));
  },
});

const AssignToContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssignTo);

export default AssignToContainer;
