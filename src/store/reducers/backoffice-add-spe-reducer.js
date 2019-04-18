/**
 * Initial State
 */
const initialState = {
  specialisations: [],
  inputSpe: '',
  promotion_name: '',
};

// /**
//  * Types
//  */
const ADD_SPE_INPUT_SPE_CHANGE = 'ADD_SPE_INPUT_SPE_CHANGE';
export const ADD_SPE_SUBMIT = 'ADD_SPE_SUBMIT';
export const ADD_SPE_SUBMIT_BDD = 'ADD_SPE_SUBMIT_BDD';
export const LOAD_SPES_BACKOFFICE = 'LOAD_SPES_BACK_OFFICE';
export const RECEIVED_SPES_BACKOFFICE = 'RECEIVED_SPES_BACK_OFFICE';
const ADD_SPE_SELECT_CHANGE = 'ADD_SPE_SELECT_CHANGE';

// /**
//  * Traitements
//  */

/**
 * Reducer
 */
const AddSpeBackofficeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_SPE_INPUT_SPE_CHANGE:
      return {
        ...state,
        inputSpe: action.spe,
      };
    case ADD_SPE_SUBMIT:
      return {
        ...state,
        spe: state.inputSpe,
      };
    case RECEIVED_SPES_BACKOFFICE:
      return {
        ...state,
        specialisations: [...action.spe],
      };
    case ADD_SPE_SELECT_CHANGE:
      return {
        ...state,
        promotion_name: action.promo,
      };

    default:
      return state;
  }
};

// /**
//  * Action Creators
//  */
export const addSpeInputChange = spe => ({
  type: ADD_SPE_INPUT_SPE_CHANGE,
  spe,
});

export const submitForm = () => ({
  type: ADD_SPE_SUBMIT,
});

export const submitFormBdd = () => ({
  type: ADD_SPE_SUBMIT_BDD,
});

export const selectPromo = promo => ({
  type: ADD_SPE_SELECT_CHANGE,
  promo,
});

export const loadedSpesBackoffice = () => ({
  type: LOAD_SPES_BACKOFFICE,
});

export const receivedSpesBackoffice = spe => ({
  type: RECEIVED_SPES_BACKOFFICE,
  spe,
});

// /**
//  * Selectors
//  */

export default AddSpeBackofficeReducer;
