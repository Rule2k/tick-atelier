const initialState = {
  commentInput: '',
};

const INPUT_ADD_COMMENT_CHANGE = 'INPUT_ADD_COMMENT_CHANGE';
export const SUBMIT_FORM_COMMENT = 'SUBMIT_FORM_COMMENT';
const RESET_INPUT_COMMENT = 'RESET_INPUT_COMMENT';


const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_ADD_COMMENT_CHANGE:
      return {
        ...state,
        commentInput: action.text,
      };
    case RESET_INPUT_COMMENT:
      return {
        ...state,
        commentInput: '',
      };
    default:
      return state;
  }
};

export const addCommentInputChange = text => ({
  type: INPUT_ADD_COMMENT_CHANGE,
  text,
});

export const submitComment = oneTicket => ({
  type: SUBMIT_FORM_COMMENT,
  oneTicket,
});

export const resetInputComment = () => ({
  type: RESET_INPUT_COMMENT,
});

export default commentsReducer;
