import { connect } from 'react-redux';

import FormInput from 'src/routes/BackOffice/AddUser/Form/FormInput';
import { addUserInputFirstnameChange, addUserInputLastNameChange, addUserInputEmailChange, addUserInputUsernameChange, addUserSubmitForm, addUserSubmitFormBdd } from 'src/store/reducers/backoffice-add-user-reducer';

const mapStateToProps = (state, ownProps) => ({
  specializations: state.addUserBackOffice.specializations,
  promos: state.addUserBackOffice.promos,
  projects: state.addUserBackOffice.projects,
  firstname: state.addUserBackOffice.inputFirstname,
  lastname: state.addUserBackOffice.inputLastname,
  username: state.addUserBackOffice.inputUsername,
  email: state.addUserBackOffice.inputEmail,
  roles: state.userBackOffice.roles,
});

const mapDispatchToProps = dispatch => ({
  submitFirstname: (firstname) => {
    dispatch(addUserInputFirstnameChange(firstname));
  },
  submitLastname: (lastname) => {
    dispatch(addUserInputLastNameChange(lastname));
  },
  submitEmail: (mail) => {
    dispatch(addUserInputEmailChange(mail));
  },
  submitUsername: (username) => {
    dispatch(addUserInputUsernameChange(username));
  },
  submitForm: () => {
    dispatch(addUserSubmitForm());
  },
  submitFormBDD: () => {
    dispatch(addUserSubmitFormBdd());
  },
});

const AddUserInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormInput);

export default AddUserInputContainer;
