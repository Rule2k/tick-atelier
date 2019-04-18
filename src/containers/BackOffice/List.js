import { connect } from 'react-redux';

import List from 'src/routes/BackOffice/SpeProjectList/List';
import { editPromoSubmit, editPromoSubmitBdd } from 'src/store/reducers/backoffice-edit-promo';
import { editSpeSubmit, editSpeSubmitBdd } from 'src/store/reducers/backoffice-edit-spe';
import { editProjectSubmit, editProjectSubmitBdd } from 'src/store/reducers/backoffice-edit-project';
import { loadedPromosBackoffice } from 'src/store/reducers/backoffice-add-promo-reducer';
import { loadedSpesBackoffice } from 'src/store/reducers/backoffice-add-spe-reducer';
import { loadUsersBackOffice } from 'src/store/reducers/backoffice-user-reducer';

const mapStateToProps = state => ({
  promos: state.addPromoBackOffice.promos,
  specialisations: state.addSpeBackOffice.specialisations,
  projects: state.addProjectBackOffice.projects,
});

const mapDispatchToProps = dispatch => ({
  submitEditedPromo: (promo, id) => {
    dispatch(editPromoSubmit(promo, id));
  },

  submitEditedSpe: (spe, id, oldSpe, promo) => {
    dispatch(editSpeSubmit(spe, id, oldSpe, promo));
  },

  submitEditedProject: (project, originalProject, id, newPromo, oldPromo) => {
    dispatch(editProjectSubmit(project, originalProject, id, newPromo, oldPromo));
  },

  editPromoSubmitBdd: () => {
    dispatch(editPromoSubmitBdd());
  },

  editSpeSubmitBdd: () => {
    dispatch(editSpeSubmitBdd());
  },

  editProjectSubmitBdd: () => {
    dispatch(editProjectSubmitBdd());
  },

  loadedPromos: () => {
    dispatch(loadedPromosBackoffice());
  },

  loadUsersBackOffice: () => {
    dispatch(loadUsersBackOffice());
  },

  loadedSpe: () => {
    dispatch(loadedSpesBackoffice());
  },
});

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export default ListContainer;
