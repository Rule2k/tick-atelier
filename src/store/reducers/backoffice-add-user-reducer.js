/**
 * Initial State
 */

const initialState = {
  // admin,
  // specializations,
  // promos,
  // projects,
  inputFirstname: '',
  inputLastname: '',
  inputEmail: '',
  inputUsername: '',
};

// /**
//  * Types
//  */
const GET_USER = 'GET_USER';
const ADD_USER_INPUT_NAME_CHANGE = 'ADD_USER_INPUT_NAME_CHANGE';
const ADD_USER_INPUT_SURNAME_CHANGE = 'ADD_USER_INPUT_SURNAME_CHANGE';
const ADD_USER_INPUT_EMAIL_CHANGE = 'ADD_USER_INPUT_EMAIL_CHANGE';
const ADD_USER_INPUT_GITID_CHANGE = 'ADD_USER_INPUT_GITID_CHANGE';
const ADD_USER_SELECT_PROMO_CHANGE = 'ADD_USER_SELECT_PROMO_CHANGE';
const ADD_USER_SELECT_SPE_CHANGE = 'ADD_USER_SELECT_SPE_CHANGE';
const ADD_USER_SELECT_STATUS_CHANGE = 'ADD_USER_SELECT_STATUS_CHANGE';
const ADD_USER_SELECT_PROJECT_CHANGE = 'ADD_USER_SELECT_PROJECT_CHANGE';
export const ADD_USER_FORM_SUBMIT = 'ADD_USER_FORM_SUBMIT';
export const ADD_USER_FORM_SUBMIT_BDD = 'ADD_USER_FORM_SUBMIT_BDD';


// /**
//  * Traitements
//  */

/**
 * Reducer
 */
const AddUserBackofficeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_USER_INPUT_NAME_CHANGE:
      return {
        ...state,
        inputFirstname: action.firstname,
      };
    case ADD_USER_INPUT_SURNAME_CHANGE:
      return {
        ...state,
        inputLastname: action.lastname,
      };
    case ADD_USER_INPUT_EMAIL_CHANGE:
      return {
        ...state,
        inputEmail: action.mail,
      };
    case ADD_USER_INPUT_GITID_CHANGE:
      return {
        ...state,
        inputUsername: action.username,
      };
    case ADD_USER_SELECT_PROMO_CHANGE:
      return {
        ...state,
        selectPromo: action.promo,
      };
    case ADD_USER_SELECT_SPE_CHANGE:
      return {
        ...state,
        selectSpe: action.spe,
      };
    case ADD_USER_SELECT_PROJECT_CHANGE:
      return {
        ...state,
        selectProject: action.project,
      };
    case ADD_USER_SELECT_STATUS_CHANGE:
      return {
        ...state,
        selectStatus: action.status,
      };
    case ADD_USER_FORM_SUBMIT:
      return {
        ...state,
        firstname: state.inputFirstname,
        lastname: state.inputLastname,
        new_username: state.inputUsername,
        email: state.inputEmail,
        promotion: state.selectPromo,
        specialization: state.selectSpe,
        project: state.selectProject,
        admin: state.selectStatus,
      };
    default:
      return state;
  }
};

// /**
//  * Action Creators
//  */
export const addUserInputFirstnameChange = firstname => ({
  type: ADD_USER_INPUT_NAME_CHANGE,
  firstname,
});

export const addUserInputLastNameChange = lastname => ({
  type: ADD_USER_INPUT_SURNAME_CHANGE,
  lastname,
});

export const addUserInputEmailChange = mail => ({
  type: ADD_USER_INPUT_EMAIL_CHANGE,
  mail,
});

export const addUserInputUsernameChange = username => ({
  type: ADD_USER_INPUT_GITID_CHANGE,
  username,
});

export const addUserSelectPromoChange = promo => ({
  type: ADD_USER_SELECT_PROMO_CHANGE,
  promo,
});

export const addUserSelectSpeChange = spe => ({
  type: ADD_USER_SELECT_SPE_CHANGE,
  spe,
});

export const addUserSelectStatusChange = status => ({
  type: ADD_USER_SELECT_STATUS_CHANGE,
  status,
});

export const addUserSelectProjectChange = project => ({
  type: ADD_USER_SELECT_PROJECT_CHANGE,
  project,
});

export const addUserSubmitForm = () => ({
  type: ADD_USER_FORM_SUBMIT,
});

export const addUserSubmitFormBdd = () => ({
  type: ADD_USER_FORM_SUBMIT_BDD,
});

// /**
//  * Selectors
//  */

export default AddUserBackofficeReducer;
