import { connect } from 'react-redux';

import { loadUsersBackOffice } from 'src/store/reducers/backoffice-user-reducer';
import { loadedPromosBackoffice } from 'src/store/reducers/backoffice-add-promo-reducer';
import { loadedSpesBackoffice } from 'src/store/reducers/backoffice-add-spe-reducer';
import { loadedProjectsBackoffice } from 'src/store/reducers/backoffice-add-project-reducer';

import BackOffice from 'src/routes/BackOffice';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  loadedUsers: () => {
    dispatch(loadUsersBackOffice());
  },
  loadedPromos: () => {
    dispatch(loadedPromosBackoffice());
  },
  loadedSpe: () => {
    dispatch(loadedSpesBackoffice());
  },
  loadedProjects: () => {
    dispatch(loadedProjectsBackoffice());
  },
});

const BackOfficeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BackOffice);

export default BackOfficeContainer;
