import { connect } from 'react-redux';

import Priority from 'src/routes/EditTicket/Main/Form/Priority';
import { changePriority } from 'src/store/reducers/edit-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  priority: state.editTicket.priority,
});

const mapDispatchToProps = dispatch => ({
  submitPriority: (priority) => {
    dispatch(changePriority(priority));
  },
});

const addTicketPriorityContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Priority);

export default addTicketPriorityContainer;
