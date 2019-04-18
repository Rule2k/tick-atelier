/**
 * Initial State
 */
const initialState = {
  inputProject: '',
  projects: [],
  promotion_name: '',
};

// /**
//  * Types
//  */
const ADD_PROJECT_INPUT_PROJECT_CHANGE = 'ADD_PROJECT_INPUT_PROJECT_CHANGE';
export const ADD_PROJECT_SUBMIT = 'ADD_PROJECT_SUBMIT';
export const ADD_PROJECT_SUBMIT_BDD = 'ADD_PROJECT_SUBMIT_BDD';
export const LOAD_PROJECTS_BACKOFFICE = 'LOAD_PROJECTS_BACK_OFFICE';
export const RECEIVED_PROJECTS_BACKOFFICE = 'RECEIVED_PROJECTS_BACK_OFFICE';
const ADD_PROJECT_SELECT_CHANGE = 'ADD_PROJECT_SELECT_CHANGE';

// /**
//  * Traitements
//  */

/**
 * Reducer
 */
const AddProjectBackofficeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_PROJECT_INPUT_PROJECT_CHANGE:
      return {
        ...state,
        inputProject: action.project,
      };
    case ADD_PROJECT_SUBMIT:
      return {
        ...state,
        project: state.inputProject,
        promo: state.promotions_name,
      };
    case RECEIVED_PROJECTS_BACKOFFICE:
      return {
        ...state,
        projects: [...action.projects],
      };
    case ADD_PROJECT_SELECT_CHANGE:
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
export const addProjectInputChange = project => ({
  type: ADD_PROJECT_INPUT_PROJECT_CHANGE,
  project,
});

export const submitForm = () => ({
  type: ADD_PROJECT_SUBMIT,
});

export const submitFormBdd = () => ({
  type: ADD_PROJECT_SUBMIT_BDD,
});

export const loadedProjectsBackoffice = () => ({
  type: LOAD_PROJECTS_BACKOFFICE,
});

export const receivedProjectsBackoffice = projects => ({
  type: RECEIVED_PROJECTS_BACKOFFICE,
  projects,
});

export const selectPromo = promo => ({
  type: ADD_PROJECT_SELECT_CHANGE,
  promo,
});

// /**
//  * Selectors
//  */

export default AddProjectBackofficeReducer;
