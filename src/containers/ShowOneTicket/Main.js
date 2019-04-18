
import { connect } from 'react-redux';

import Main from 'src/routes/ShowOneTicket/Main';


const mapStateToProps = state => ({
  currentUser: state.user.user,
});

const mapDispatchToProps = {};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainContainer;
