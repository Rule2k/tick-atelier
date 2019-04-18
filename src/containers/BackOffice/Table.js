import { connect } from 'react-redux';

import { submitEditUserForm, submitEditUserFormBdd } from 'src/store/reducers/backoffice-user-reducer';

import Table from 'src/routes/BackOffice/Home/Table';

const mapStateToProps = state => ({
  users: state.userBackOffice.userBackoffice,
  promos: state.addPromoBackOffice.promos,
  specialisations: state.addSpeBackOffice.specialisations,
  projects: state.addProjectBackOffice.projects,
  roles: state.userBackOffice.roles,
});

const mapDispatchToProps = dispatch => ({
  submitForm: (userid, username, firstname, lastname, email, specialization, promotion, project, admin) => {
    dispatch(submitEditUserForm(userid, username, firstname, lastname, email, specialization, promotion, project, admin));
  },
  submitFormBDD: () => {
    dispatch(submitEditUserFormBdd());
  },
});

const TableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);

export default TableContainer;
