/**
 * Initial State
 */
const initialState = {
  switchHome: 'all-ticket',
  tickets: [],
};

/**
 * Types
 */
export const SHOW_ALL_TICKETS_USER = 'SHOW_ALL_TICKETS_USER';
export const SHOW_ALL_TICKETS_ADMIN = 'SHOW_ALL_TICKETS_ADMIN';
export const SHOW_MY_TICKETS_USER = 'SHOW_MY_TICKETS_USER';
export const SHOW_MY_TICKETS_ADMIN = 'SHOW_MY_TICKETS_ADMIN';
export const TICKETS_RECEIVED = 'TICKETS_RECEIVED';
export const SWITCH_ALL_TICKETS = 'SWITCH_ALL_TICKETS';
export const SWITCH_MY_TICKETS = 'SWITCH_MY_TICKETS';
export const CLOSE_THIS_TICKET = 'CLOSE_THIS_TICKET';
export const NEW_COMMENTS_RECEIVED = 'NEW_COMMENTS_RECEIVED';

/**
 * Traitements
 */

/**
 * Reducer
 */
const ticketsReducer = (state = initialState, action = {}) => {
  
  switch (action.type) {
    case TICKETS_RECEIVED:
      return {
        ...state,
        tickets: action.tickets,
      };
    case SWITCH_ALL_TICKETS:
      return {
        ...state,
        switchHome: 'all-ticket',
      };
    case SWITCH_MY_TICKETS:
      return {
        ...state,
        switchHome: 'my-ticket',
      };
    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const showAllTicketsUser = () => ({
  type: SHOW_ALL_TICKETS_USER,
});

export const showAllTicketsAdmin = () => ({
  type: SHOW_ALL_TICKETS_ADMIN,
});

export const showMyTicketsUser = () => ({
  type: SHOW_MY_TICKETS_USER,
});

export const showMyTicketsAdmin = () => ({
  type: SHOW_MY_TICKETS_ADMIN,
});

export const receivedTickets = alltickets => ({
  type: TICKETS_RECEIVED,
  tickets: alltickets,
});

export const switchAllTickets = () => ({
  type: SWITCH_ALL_TICKETS,
});

export const switchMyTickets = () => ({
  type: SWITCH_MY_TICKETS,
});

export const closeThisTicket = ticketId => ({
  type: CLOSE_THIS_TICKET,
  ticketId,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default ticketsReducer;
