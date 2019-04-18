import { connect } from 'react-redux';

import Form from 'src/routes/BackOffice/AddSpe/Form';
import { addSpeInputChange, submitForm, submitFormBdd, selectPromo } from 'src/store/reducers/backoffice-add-spe-reducer';

const mapStateToProps = (state, ownProps) => ({
  spe: state.addSpeBackOffice.inputSpe,
  promos: state.addPromoBackOffice.promos,
});

const mapDispatchToProps = dispatch => ({
  submitSpe: (spe) => {
    dispatch(addSpeInputChange(spe));
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

const AddSpeInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default AddSpeInputContainer;
