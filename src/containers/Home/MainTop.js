
import { connect } from 'react-redux';

import MainTop from 'src/routes/Home/Main/MainTop';

import {
  showAllTicketsUser, showAllTicketsAdmin, showMyTicketsUser, showMyTicketsAdmin, switchMyTickets, switchAllTickets,
} from 'src/store/reducers/tickets-reducer';

const mapStateToProps = state => ({
  currentUser: state.user.user,
  switchHome: state.tickets.switchHome,
});

const mapDispatchToProps = dispatch => ({
  showAllTicketsUser: () => {
    dispatch(showAllTicketsUser());
  },
  showAllTicketsAdmin: () => {
    dispatch(showAllTicketsAdmin());
  },
  showMyTicketsUser: () => {
    dispatch(showMyTicketsUser());
  },
  showMyTicketsAdmin: () => {
    dispatch(showMyTicketsAdmin());
  },
  switchMyTickets: () => {
    dispatch(switchMyTickets());
  },
  switchAllTickets: () => {
    dispatch(switchAllTickets());
  },
});

const MainTopContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTop);

export default MainTopContainer;
