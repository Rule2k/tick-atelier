const initialState = {

};

/**
 * Types
 */
const SUBMIT_EDIT_PROMO_BACKOFFICE = 'SUBMIT_EDIT_PROMO_BACKOFFICE';
export const SUBMIT_EDIT_PROMO_BACKOFFICE_BDD = 'SUBMIT_EDIT_PROMO_BACKOFFICE_BDD';


/**
 * Traitements
 */

/**
 * Reducer
 */
const editPromoReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SUBMIT_EDIT_PROMO_BACKOFFICE:
      return {
        ...state,
        editedPromo: action.promo,
        id: action.id,
      };
    case SUBMIT_EDIT_PROMO_BACKOFFICE_BDD:
      return {
        ...state,
        // editedPromo: action.promo,
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const editPromoSubmit = (promo, id) => ({
  type: SUBMIT_EDIT_PROMO_BACKOFFICE,
  promo,
  id,
});

export const editPromoSubmitBdd = () => ({
  type: SUBMIT_EDIT_PROMO_BACKOFFICE_BDD,

});

/**
 * Selectors
 */

/**
 * Export
 */
export default editPromoReducer;
