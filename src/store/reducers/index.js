import { combineReducers } from 'redux';

import ticketsReducer from './tickets-reducer';
import userReducer from './user-reducer';
import userBackofficeReducer from './backoffice-user-reducer';
import AddUserBackofficeReducer from './backoffice-add-user-reducer';
import AddPromoBackofficeReducer from './backoffice-add-promo-reducer';
import AddSpeBackofficeReducer from './backoffice-add-spe-reducer';
import AddProjectBackofficeReducer from './backoffice-add-project-reducer';
import addTicketReducer from './add-ticket-reducer';
import searchReducer from './search-reducer';
import assignReducer from './assign-reducer';
import editTicketReducer from './edit-ticket-reducer';
import commentsReducer from './add-comment-reducer';
import editCommentReducer from './edit-comment-reducer';
import loginReducer from './login-user-reducer';
import editPromoReducer from './backoffice-edit-promo';
import editSpeReducer from './backoffice-edit-spe';
import editProjectReducer from './backoffice-edit-project';


const rootReducer = combineReducers({
  user: userReducer,
  tickets: ticketsReducer,
  addTicket: addTicketReducer,
  searchInput: searchReducer,
  assignButton: assignReducer,
  editTicket: editTicketReducer,
  comments: commentsReducer,
  userBackOffice: userBackofficeReducer,
  addUserBackOffice: AddUserBackofficeReducer,
  addPromoBackOffice: AddPromoBackofficeReducer,
  editPromoBackOffice: editPromoReducer,
  addSpeBackOffice: AddSpeBackofficeReducer,
  editSpeBackOffice: editSpeReducer,
  addProjectBackOffice: AddProjectBackofficeReducer,
  editProjectBackOffice: editProjectReducer,
  editComment: editCommentReducer,
  loginGitHub: loginReducer,
});

export default rootReducer;
