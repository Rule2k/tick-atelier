import { connect } from 'react-redux';

import Form from 'src/routes/BackOffice/AddProject/Form';
import { addProjectInputChange, submitForm, submitFormBdd, selectPromo } from 'src/store/reducers/backoffice-add-project-reducer';

const mapStateToProps = (state, ownProps) => ({
  project: state.addProjectBackOffice.inputProject,
  promos: state.addPromoBackOffice.promos,
});

const mapDispatchToProps = dispatch => ({
  submitProject: (project) => {
    dispatch(addProjectInputChange(project));
  },
  submitForm: () => {
    dispatch(submitForm());
  },
  submitFormBDD: () => {
    dispatch(submitFormBdd());
  },
  selectPromo: (promo) => {
    dispatch(selectPromo(promo));
  },
});

const AddProjectInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default AddProjectInputContainer;
