/**
 * Initial State
 */
const initialState = {
  user: {
    loggedIn: false,
    user_id: '',
    username: '',
    admin: false,
    promotion: '',
    specialization: '',
    project: '',
    active_group: '',
    issues: [],
    token: '',
  },
};

// /**
//  * Types
//  */
const USER_RECEIVED = 'USER_RECEIVED';
const USER_DISCONNECTED = 'USER_DISCONNECTED';
const TOKEN_RECEIVED = 'TOKEN_RECEIVED';

// /**
//  * Traitements
//  */

/**
 * Reducer
 */
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_RECEIVED:
      return {
        ...state,
        user: action.user,
      };
    case TOKEN_RECEIVED:
      return {
        ...state,
        user: {
          ...state.user,
          token: action.token,
        },
      };
    case USER_DISCONNECTED:
      return {
        ...state,
        user: {
          ...state.user,
          loggedIn: false,
          user_id: '',
          username: '',
          admin: false,
          promotion: '',
          specialization: '',
          project: '',
          active_group: '',
          issues: [],
        },
      };
    default:
      return state;
  }
};

// /**
//  * Action Creators
//  */
export const receivedUser = user => ({
  type: USER_RECEIVED,
  user,
});

export const receivedToken = token => ({
  type: TOKEN_RECEIVED,
  token,
});

export const userDisconnected = () => ({
  type: USER_DISCONNECTED,
});

// /**
//  * Selectors
//  */

export default userReducer;
