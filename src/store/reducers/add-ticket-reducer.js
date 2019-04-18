/**
 * Initial State
 */
const initialState = {
  titleInput: '',
  descriptionInput: '',
  gitHubLinkInput: '',
  ticketToAdd: [],
  tags: [],
};

/**
 * Types
 */
const INPUT_ADD_TICKET_TITLE_CHANGE = 'INPUT_ADD_TICKET_TITLE_CHANGE';
const INPUT_ADD_TICKET_DESCRIPTION_CHANGE = 'INPUT_ADD_TICKET_DESCRIPTION_CHANGE';
const INPUT_ADD_TICKET_GITHUB_LINK_CHANGE = 'INPUT_ADD_TICKET_GITHUB_LINK_CHANGE';
const CHECKBOX_CHANGE_TAG = 'CHECKBOX_CHANGE_TAG';
const SELECT_CHANGE_PRIORITY = 'SELECT_CHANGE_PRIORITY';
const SUBMIT_FORM_TICKET = 'SUBMIT_FORM_TICKET';
export const SUBMIT_FORM_TICKET_BDD = 'SUBMIT_FORM_TICKET_BDD';

/**
 * Traitements
 */

/**
 * Reducer
 */
const ticketsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_ADD_TICKET_TITLE_CHANGE:
      return {
        ...state,
        titleInput: action.text,
      };
    case INPUT_ADD_TICKET_DESCRIPTION_CHANGE:
      return {
        ...state,
        descriptionInput: action.desc,
      };
    case INPUT_ADD_TICKET_GITHUB_LINK_CHANGE:
      return {
        ...state,
        gitHubLinkInput: action.link,
      };
    case CHECKBOX_CHANGE_TAG:
      function findTagIndex(tag) {
        return tag === action.tag;
      };
      if (state.tags.findIndex(findTagIndex) === -1) {
        return {
          ...state,
          tags: [...state.tags, action.tag],
        };
      } else {
        const newTagState = state.tags.filter(tag => tag !== action.tag);
        return {
          ...state,
          tags: [...newTagState],
        };
      };
    case SELECT_CHANGE_PRIORITY:
      return {
        ...state,
        priority: action.priority,
      };
    case SUBMIT_FORM_TICKET:
      return {
        ...state,
        titleInput: '',
        descriptionInput: '',
        gitHubLinkInput: '',
        tags: [],
        ticketToAdd: {
          title: state.titleInput,
          description: state.descriptionInput,
          repo_url: state.gitHubLinkInput,
          tags: state.tags,
          priority: state.priority,
          username: action.currentUser,
        },
      };
    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const addTicketInputTitleChange = text => ({
  type: INPUT_ADD_TICKET_TITLE_CHANGE,
  text,
});

export const addDescriptionInput = desc => ({
  type: INPUT_ADD_TICKET_DESCRIPTION_CHANGE,
  desc,
});

export const addGitHubLinkInput = link => ({
  type: INPUT_ADD_TICKET_GITHUB_LINK_CHANGE,
  link,
});

export const checkedTag = tag => ({
  type: CHECKBOX_CHANGE_TAG,
  tag,
});

export const changePriority = priority => ({
  type: SELECT_CHANGE_PRIORITY,
  priority,
});

export const submitTicket = currentUser => ({
  type: SUBMIT_FORM_TICKET,
  currentUser,
});

export const submitTicketBdd = () => ({
  type: SUBMIT_FORM_TICKET_BDD,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default ticketsReducer;
