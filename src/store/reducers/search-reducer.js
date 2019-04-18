const initialState = {
  searchInput: '',
};

const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE';
const RESET_INPUT_SEARCH = 'RESET_INPUT_SEARCH';
export const SEARCH_FORM_SUBMIT = 'SEARCH_FORM_SUBMIT';

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_INPUT_CHANGE:
      return {
        ...state,
        searchInput: action.input,
      };
    case RESET_INPUT_SEARCH:
      return {
        ...state,
        searchInput: '',
      };
    default:
      return state;
  }
};

export const handleSearchInputChange = input => ({
  type: SEARCH_INPUT_CHANGE,
  input,
});

export const handleSearchSubmit = () => ({
  type: SEARCH_FORM_SUBMIT,
});

export const resetInputSearch = () => ({
  type: RESET_INPUT_SEARCH,
});

// /**
//  * Selectors
//  */

export default userReducer;
