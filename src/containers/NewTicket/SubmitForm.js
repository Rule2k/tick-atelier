import { connect } from 'react-redux';

import FormTicket from 'src/routes/NewTicket/Main/Form';
import { submitTicket, submitTicketBdd } from 'src/store/reducers/add-ticket-reducer';

const mapStateToProps = state => ({
  titleInput: state.addTicket.titleInput,
  gitHubLinkInput: state.addTicket.gitHubLinkInput,
  descriptionInput: state.addTicket.descriptionInput,
  tags: state.addTicket.tags,
  priority: state.addTicket.priority,
  currentUser: state.user.user.username,
});

const mapDispatchToProps = dispatch => ({
  submitTicket: (currentUser) => {
    dispatch(submitTicket(currentUser));
  },
  submitTicketBdd: () => {
    dispatch(submitTicketBdd());
  },
});

const addTicketFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormTicket);

export default addTicketFormContainer;
