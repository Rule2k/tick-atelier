import { connect } from 'react-redux';

import Priority from 'src/routes/NewTicket/Main/Form/Priority';
import { changePriority } from 'src/store/reducers/add-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  priority: state.addTicket.priority,
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
