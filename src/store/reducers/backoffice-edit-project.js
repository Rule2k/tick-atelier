const initialState = {

};

/**
 * Types
 */
const SUBMIT_EDIT_PROJECT_BACKOFFICE = 'SUBMIT_EDIT_PROJECT_BACKOFFICE';
export const SUBMIT_EDIT_PROJECT_BACKOFFICE_BDD = 'SUBMIT_EDIT_PROJECT_BACKOFFICE_BDD';


/**
 * Traitements
 */

/**
 * Reducer
 */
const editProjectReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SUBMIT_EDIT_PROJECT_BACKOFFICE:
      return {
        ...state,
        editedProject: action.project,
        original: action.originalProject,
        id: action.id,
        new_promo: action.newPromo,
        old_promo: action.oldPromo,
      };
    // case SUBMIT_EDIT_PROJECT_BACKOFFICE_BDD:
    //   return {
    //     ...state,
    //     editedProject: action.project,
    //   };

    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const editProjectSubmit = (project, originalProject, id, newPromo, oldPromo) => ({
  type: SUBMIT_EDIT_PROJECT_BACKOFFICE,
  project,
  originalProject,
  id,
  newPromo,
  oldPromo,
});

export const editProjectSubmitBdd = () => ({
  type: SUBMIT_EDIT_PROJECT_BACKOFFICE_BDD,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default editProjectReducer;
