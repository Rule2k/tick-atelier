/**
 * Initial State
 */
const initialState = {
  userBackoffice: [],
  roles: [true, false],
};
// /**
//  * Types
//  */
export const SUBMIT_EDIT_USER_BACKOFFICE = 'SUBMIT_EDIT_USER_BACKOFFICE';
export const SUBMIT_EDIT_USER_BACKOFFICE_BDD = 'SUBMIT_EDIT_USER_BACKOFFICE_BDD';
export const LOAD_USERS_BACKOFFICE = 'LOAD_USERS_BACKOFFICE';
export const RECEIVED_USERS_BACKOFFICE = 'RECEIVED_USERS_BACKOFFICE';

// /**
//  * Traitements
//  */

/**
 * Reducer
 */
const userBackofficeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SUBMIT_EDIT_USER_BACKOFFICE:
      return {
        ...state,
        editedUser: {
          user_id: action.userid,
          new_username: action.username,
          firstname: action.firstname,
          lastname: action.lastname,
          email: action.email,
          promotion: action.promotion,
          specialization: action.specialization,
          project: action.project,
          admin: action.admin,
        }


      };
    case RECEIVED_USERS_BACKOFFICE:
      return {
        ...state,
        userBackoffice: [...action.users],
      };
    default:
      return state;
  }
};

// /**
//  * Action Creators
//  */
export const submitEditUserForm = (userid, username, lastname, firstname, email, promotion, specialization, project, admin) => ({
  type: SUBMIT_EDIT_USER_BACKOFFICE,
  userid,
  lastname,
  firstname,
  username,
  email,
  promotion,
  specialization,
  project,
  admin,
});

export const submitEditUserFormBdd = () => ({
  type: SUBMIT_EDIT_USER_BACKOFFICE_BDD,
});

export const loadUsersBackOffice = () => ({
  type: LOAD_USERS_BACKOFFICE,

});

export const receivedUsersBackOffice = users => ({
  type: RECEIVED_USERS_BACKOFFICE,
  users,
});

// /**
//  * Selectors
//  */

export default userBackofficeReducer;
