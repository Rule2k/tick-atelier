
import { connect } from 'react-redux';

import Title from 'src/routes/NewTicket/Main/Form/Title';
import { addTicketInputTitleChange } from 'src/store/reducers/add-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  title: state.addTicket.titleInput,
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
