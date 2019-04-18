import axios from 'axios';
import getHistory from 'react-router-global-history';

import { SHOW_ALL_TICKETS_USER, SHOW_ALL_TICKETS_ADMIN, SHOW_MY_TICKETS_USER, SHOW_MY_TICKETS_ADMIN, receivedTickets, CLOSE_THIS_TICKET } from './reducers/tickets-reducer';
import { SEARCH_FORM_SUBMIT, resetInputSearch } from './reducers/search-reducer';
import { ASSIGN_TO_TICKET_BUTTON, UNASSIGN_TO_TICKET_BUTTON } from './reducers/assign-reducer';
import { SUBMIT_FORM_COMMENT, resetInputComment } from './reducers/add-comment-reducer';
import { SUBMIT_FORM_TICKET_BDD } from './reducers/add-ticket-reducer';
import { EDIT_SUBMIT_FORM_TICKET_BDD } from './reducers/edit-ticket-reducer';
import { EDIT_COMMENT_SUBMIT } from './reducers/edit-comment-reducer';
import { LOGIN_USER, LOGIN_USER_HOME } from './reducers/login-user-reducer';
import { receivedUser, receivedToken } from './reducers/user-reducer';

const url = 'http://92.243.19.15:8080/';

const ajaxMiddleware = store => next => (action) => {
  const { searchInput } = store.getState().searchInput;
  const { username } = store.getState().user.user;
  const { ticketToAdd } = store.getState().addTicket;
  const { ticketToEdit } = store.getState().editTicket;
  const { token } = store.getState().user.user;
  const addingTicket = { ...ticketToAdd, token };
  const editingTicket = { ...ticketToEdit, token };

  switch (action.type) {
    case SHOW_ALL_TICKETS_USER:
      axios.post(`${url}users/login`, {
        username,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SHOW_MY_TICKETS_USER:
      axios.post(`${url}users/my-tickets`, {
        username,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SHOW_ALL_TICKETS_ADMIN:
      axios.post(`${url}users/login`, {
        username,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
        });
      break;
    case SHOW_MY_TICKETS_ADMIN:
      axios.post(`${url}users/my-tickets/admin`, {
        username,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SEARCH_FORM_SUBMIT:
      axios.post(`${url}users/search`, {
        username,
        token,
        search: searchInput,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
          store.dispatch(resetInputSearch());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case ASSIGN_TO_TICKET_BUTTON:
      axios.post(`${url}issue/${action.ticketId}/assign`, {
        username,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case UNASSIGN_TO_TICKET_BUTTON:
      axios.post(`${url}issue/${action.ticketId}/unassign`, {
        username,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_FORM_COMMENT:
      axios.post(`${url}answer/new`, {
        username,
        token,
        body: store.getState().comments.commentInput,
        issue_id: action.oneTicket.issue_id,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
          store.dispatch(resetInputComment());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_FORM_TICKET_BDD:
      axios.post(`${url}issue/new`, addingTicket)
        .then((result) => {
          getHistory().push('/');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case EDIT_SUBMIT_FORM_TICKET_BDD:
      axios.post(`${url}issue/${ticketToEdit.id}/edit`, editingTicket)
        .then((result) => {
          getHistory().push('/');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case EDIT_COMMENT_SUBMIT:
      axios.post(`${url}answer/${action.id}/edit`, {
        username: action.username,
        body: action.input,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case LOGIN_USER:
      axios.post(`${url}users/login`, {
        username: action.alias,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case LOGIN_USER_HOME:
      axios.post(`${url}users/login`, {
        username,
        token,
      })
        .then((result) => {
          store.dispatch(receivedTickets(result.data.issues));
          store.dispatch(receivedToken(result.data.token));
          store.dispatch(receivedUser(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case CLOSE_THIS_TICKET:
      axios.post(`${url}issue/${action.ticketId}/close`, {
        username,
        token,
      })
        .then((result) => {
          getHistory().push('/');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
      next(action);
  }
};

export default ajaxMiddleware;
