import { connect } from 'react-redux';

import DisplayAppOrLogin from 'src/routes/DisplayAppOrLogin';

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.user.user.loggedIn,
});

const mapDispatchToProps = dispatch => ({
});

const DisplayAppOrLoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayAppOrLogin);

export default DisplayAppOrLoginContainer;
