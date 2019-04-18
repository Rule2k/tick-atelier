import { connect } from 'react-redux';

import Description from 'src/routes/EditTicket/Main/Form/Description';
import { addDescriptionInput } from 'src/store/reducers/edit-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  desc: state.editTicket.descriptionInput,
});

const mapDispatchToProps = dispatch => ({
  submitDescription: (desc) => {
    dispatch(addDescriptionInput(desc));
  },
});

const addDescriptionTicketContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Description);

export default addDescriptionTicketContainer;
