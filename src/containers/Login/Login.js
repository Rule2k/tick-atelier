import { connect } from 'react-redux';

import Login from 'src/routes/Login';
import { checkUserLoggedIn } from 'src/store/reducers/login-user-reducer';
import { receivedToken } from 'src/store/reducers/user-reducer';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  checkUserLoggedIn: alias => (
    dispatch(checkUserLoggedIn(alias))
  ),
  receivedToken: token => (
    dispatch(receivedToken(token))
  ),
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;
