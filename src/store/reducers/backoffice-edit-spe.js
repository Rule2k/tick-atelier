const initialState = {

};

/**
 * Types
 */
const SUBMIT_EDIT_SPE_BACKOFFICE = 'SUBMIT_EDIT_SPE_BACKOFFICE';
export const SUBMIT_EDIT_SPE_BACKOFFICE_BDD = 'SUBMIT_EDIT_SPE_BACKOFFICE_BDD';


/**
 * Traitements
 */

/**
 * Reducer
 */
const editSpeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SUBMIT_EDIT_SPE_BACKOFFICE:
      return {
        ...state,
        editedSpe: action.spe,
        id: action.id,
        old_spe: action.oldSpe,
        promo: action.promo,
      };
    // case SUBMIT_EDIT_SPE_BACKOFFICE_BDD:
    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const editSpeSubmit = (spe, id, oldSpe, promo) => ({
  type: SUBMIT_EDIT_SPE_BACKOFFICE,
  spe,
  id,
  oldSpe,
  promo,
});

export const editSpeSubmitBdd = () => ({
  type: SUBMIT_EDIT_SPE_BACKOFFICE_BDD,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default editSpeReducer;
