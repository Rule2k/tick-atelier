import { connect } from 'react-redux';

import App from 'src/routes/App';

const mapStateToProps = state => ({
  admin: state.user.user.admin,
});

const mapDispatchToProps = {};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
