import { connect } from 'react-redux';

import Description from 'src/routes/NewTicket/Main/Form/Description';
import { addDescriptionInput } from 'src/store/reducers/add-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  desc: state.addTicket.descriptionInput,
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
