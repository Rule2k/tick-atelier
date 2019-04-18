
import { connect } from 'react-redux';

import Title from 'src/routes/EditTicket/Main/Form/Title';
import { addTicketInputTitleChange } from 'src/store/reducers/edit-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  title: state.editTicket.titleInput,
});

const mapDispatchToProps = dispatch => ({
  submitTitle: (text) => {
    dispatch(addTicketInputTitleChange(text));
  },
});

const addTicketTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Title);

export default addTicketTitleContainer;
