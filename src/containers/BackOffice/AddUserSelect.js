import { connect } from 'react-redux';

import FormSelect from 'src/routes/BackOffice/AddUser/Form/FormSelect';
import { addUserSelectPromoChange, addUserSelectSpeChange, addUserSelectStatusChange, addUserSelectProjectChange } from 'src/store/reducers/backoffice-add-user-reducer';

const mapStateToProps = (state, ownProps) => ({
  roles: state.userBackOffice.roles,
  promos: state.addPromoBackOffice.promos,
  specialisations: state.addSpeBackOffice.specialisations,
  projects: state.addProjectBackOffice.projects,
});

const mapDispatchToProps = dispatch => ({
  submitPromo: (promo) => {
    dispatch(addUserSelectPromoChange(promo));
  },
  submitSpe: (spe) => {
    dispatch(addUserSelectSpeChange(spe));
  },
  submitStatus: (status) => {
    dispatch(addUserSelectStatusChange(status));
  },
  submitProject: (project) => {
    dispatch(addUserSelectProjectChange(project));
  },
});

const AddUSerSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormSelect);

export default AddUSerSelectContainer;
