import { connect } from 'react-redux';

import LogOut from 'src/components/Header/LogOut/';
import { userDisconnected } from 'src/store/reducers/user-reducer';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  userDisconnected: () => (
    dispatch(userDisconnected())
  ),
});

const LogOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogOut);

export default LogOutContainer;
