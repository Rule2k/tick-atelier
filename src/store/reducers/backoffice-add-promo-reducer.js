/**
 * Initial State
 */
const initialState = {
  inputPromo: '',
  promos: [],

};

// /**
//  * Types
//  */
const ADD_PROMO_INPUT_PROMO_CHANGE = 'ADD_PROMO_INPUT_PROMO_CHANGE';
export const ADD_PROMO_SUBMIT = 'ADD_PROMO_SUBMIT';
export const ADD_PROMO_SUBMIT_BDD = 'ADD_PROMO_SUBMIT_BDD';
export const LOAD_PROMOS_BACKOFFICE = 'LOAD_PROMOS_BACK_OFFICE';
export const RECEIVED_PROMOS_BACKOFFICE = 'RECEIVED_PROMOS_BACK_OFFICE';

// /**
//  * Traitements
//  */

/**
 * Reducer
 */
const AddPromoBackofficeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_PROMO_INPUT_PROMO_CHANGE:
      return {
        ...state,
        inputPromo: action.promo,
      };
    case ADD_PROMO_SUBMIT:
      return {
        ...state,
        promo: state.inputPromo,
      };
    case RECEIVED_PROMOS_BACKOFFICE:
      return {
        ...state,
        promos: [...action.promos],
      };
    default:
      return state;
  }
};

// /**
//  * Action Creators
//  */
export const addPromoInputChange = promo => ({
  type: ADD_PROMO_INPUT_PROMO_CHANGE,
  promo,
});

export const submitForm = () => ({
  type: ADD_PROMO_SUBMIT,
});

export const submitFormBdd = () => ({
  type: ADD_PROMO_SUBMIT_BDD,
});

export const loadedPromosBackoffice = () => ({
  type: LOAD_PROMOS_BACKOFFICE,
});

export const receivedPromosBackoffice = promos => ({
  type: RECEIVED_PROMOS_BACKOFFICE,
  promos,
});

// /**
//  * Selectors
//  */

export default AddPromoBackofficeReducer;
