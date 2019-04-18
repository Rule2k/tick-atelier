const initialState = {
  id: '',
  titleInput: '',
  descriptionInput: '',
  gitHubLinkInput: '',
  tags: [],
  priority: '',
  ticketToEdit: [],
};

/**
 * Types
 */
const EDIT_INPUT_TICKET_TITLE_CHANGE = 'EDIT_INPUT_TICKET_TITLE_CHANGE';
const EDIT_INPUT_TICKET_DESCRIPTION_CHANGE = 'EDIT_INPUT_TICKET_DESCRIPTION_CHANGE';
const EDIT_INPUT_TICKET_GITHUB_LINK_CHANGE = 'EDIT_INPUT_TICKET_GITHUB_LINK_CHANGE';
const EDIT_SUBMIT_FORM_TICKET = 'EDIT_SUBMIT_FORM_TICKET';
const EDIT_CHECKBOX_CHANGE_TAG = 'EDIT_CHECKBOX_CHANGE_TAG';
const EDIT_SELECT_CHANGE_PRIORITY = 'EDIT_SELECT_CHANGE_PRIORITY';
const EDIT_TICKET = 'EDIT_TICKET';
export const EDIT_SUBMIT_FORM_TICKET_BDD = 'EDIT_SUBMIT_FORM_TICKET_BDD';

/**
 * Traitements
 */

/**
 * Reducer
 */
const editTicketReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case EDIT_INPUT_TICKET_TITLE_CHANGE:
      return {
        ...state,
        titleInput: action.text,
      };
    case EDIT_INPUT_TICKET_DESCRIPTION_CHANGE:
      return {
        ...state,
        descriptionInput: action.desc,
      };
    case EDIT_INPUT_TICKET_GITHUB_LINK_CHANGE:
      return {
        ...state,
        gitHubLinkInput: action.link,
      };
    case EDIT_CHECKBOX_CHANGE_TAG:
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
    case EDIT_SELECT_CHANGE_PRIORITY:
      return {
        ...state,
        priority: action.priority,
      };
    case EDIT_SUBMIT_FORM_TICKET:
      return {
        ...state,
        ticketToEdit: {
          id: state.id,
          title: state.titleInput,
          description: state.descriptionInput,
          repo_url: state.gitHubLinkInput,
          tags: state.tags,
          priority: state.priority,
          username: action.currentUser,
        },
      };

    case EDIT_TICKET:
      return {
        ...state,
        id: action.ticket.issue_id,
        titleInput: action.ticket.title,
        descriptionInput: action.ticket.description,
        gitHubLinkInput: action.ticket.repo_url,
        priority: action.ticket.priority,
        tags: [...action.ticket.tags],
      };
    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const addTicketInputTitleChange = text => ({
  type: EDIT_INPUT_TICKET_TITLE_CHANGE,
  text,
});

export const addDescriptionInput = desc => ({
  type: EDIT_INPUT_TICKET_DESCRIPTION_CHANGE,
  desc,
});

export const addGitHubLinkInput = link => ({
  type: EDIT_INPUT_TICKET_GITHUB_LINK_CHANGE,
  link,
});

export const checkedTag = tag => ({
  type: EDIT_CHECKBOX_CHANGE_TAG,
  tag,
});

export const changePriority = priority => ({
  type: EDIT_SELECT_CHANGE_PRIORITY,
  priority,
});

export const submitTicket = currentUser => ({
  type: EDIT_SUBMIT_FORM_TICKET,
  currentUser,
});

export const editTicket = ticket => ({
  type: EDIT_TICKET,
  ticket,
});

export const submitTicketBdd = currentUser => ({
  type: EDIT_SUBMIT_FORM_TICKET_BDD,
  currentUser,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default editTicketReducer;
