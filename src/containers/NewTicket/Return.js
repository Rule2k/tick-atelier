import { connect } from 'react-redux';

import Return from 'src/routes/NewTicket/Header/Return';

const mapStateToProps = state => ({
  admin: state.user.user.admin,
});

const mapDispatchToProps = {};

const ReturnContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Return);

export default ReturnContainer;
