import { connect } from 'react-redux';

import Header from 'src/routes/NewTicket/Header';

const mapStateToProps = state => ({
  admin: state.user.user.admin,
});

const mapDispatchToProps = {};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
