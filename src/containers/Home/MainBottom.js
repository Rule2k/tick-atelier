
import { connect } from 'react-redux';

import MainBottom from 'src/routes/Home/Main/MainBottom';
import { editTicket } from 'src/store/reducers/edit-ticket-reducer';


const mapStateToProps = state => ({
  tickets: state.tickets.tickets,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  editTicket: ticket => (
    dispatch(editTicket(ticket))
  ),
});

const MainBottomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainBottom);

export default MainBottomContainer;
