import tickets from 'src/data/tickets';
import user from 'src/data/user';
/**
 * Initial State
 */
const initialState = {
  tickets,
  user,
};

/**
 * Types
 */
export const ASSIGN_TO_TICKET_BUTTON = 'ASSIGN_TO_TICKET_BUTTON';
export const UNASSIGN_TO_TICKET_BUTTON = 'UNASSIGN_TO_TICKET_BUTTON';

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
export const assignAdminToTicket = ticketId => ({
  type: ASSIGN_TO_TICKET_BUTTON,
  ticketId,
});

export const unassignAdminToTicket = ticketId => ({
  type: UNASSIGN_TO_TICKET_BUTTON,
  ticketId,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default assignReducer;
