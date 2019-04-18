
import { connect } from 'react-redux';

import Notifications from 'src/components/Header/Notifications';

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = {};

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);

export default NotificationsContainer;
