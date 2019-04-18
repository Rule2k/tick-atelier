import { connect } from 'react-redux';

import Form from 'src/routes/BackOffice/AddPromo/Form';
import { addPromoInputChange, submitForm, submitFormBdd } from 'src/store/reducers/backoffice-add-promo-reducer';

const mapStateToProps = (state, ownProps) => ({
  promo: state.addPromoBackOffice.inputPromo,
});

const mapDispatchToProps = dispatch => ({
  submitPromo: (promo, id) => {
    dispatch(addPromoInputChange(promo, id));
  },
  submitForm: () => {
    dispatch(submitForm());
  },
  submitFormBDD: () => {
    dispatch(submitFormBdd());
  },
});

const AddPromoInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default AddPromoInputContainer;
