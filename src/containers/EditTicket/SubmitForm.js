import { connect } from 'react-redux';

import FormTicket from 'src/routes/EditTicket/Main/Form';
import { submitTicket, submitTicketBdd } from 'src/store/reducers/edit-ticket-reducer';


const mapStateToProps = (state, ownProps) => ({
  titleInput: state.editTicket.titleInput,
  gitHubLinkInput: state.editTicket.gitHubLinkInput,
  descriptionInput: state.editTicket.descriptionInput,
  tags: state.editTicket.tags,
  priority: state.editTicket.priority,
  currentUser: state.user.user.username,
});

const mapDispatchToProps = dispatch => ({
  submitTicket: (currentUser) => {
    dispatch(submitTicket(currentUser));
  },
  submitTicketBdd: (currentUser) => {
    dispatch(submitTicketBdd(currentUser));
  },
});

const addTicketFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormTicket);

export default addTicketFormContainer;
