/**
 * Initial State
 */
const initialState = {};

/**
 * Types
 */
export const EDIT_COMMENT_SUBMIT = 'EDIT_COMMENT_SUBMIT';

/**
 * Traitements
 */

/**
 * Reducer
 */
const assignReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const submitEditComment = (id, username, input) => ({
  type: EDIT_COMMENT_SUBMIT,
  id,
  username,
  input,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default assignReducer;
