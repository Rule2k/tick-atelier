import axios from 'axios';
import getHistory from 'react-router-global-history';

import { ADD_USER_FORM_SUBMIT_BDD } from './reducers/backoffice-add-user-reducer';
import { ADD_PROMO_SUBMIT_BDD, LOAD_PROMOS_BACKOFFICE, receivedPromosBackoffice } from './reducers/backoffice-add-promo-reducer';
import { ADD_SPE_SUBMIT_BDD, LOAD_SPES_BACKOFFICE, receivedSpesBackoffice } from './reducers/backoffice-add-spe-reducer';
import { ADD_PROJECT_SUBMIT_BDD, LOAD_PROJECTS_BACKOFFICE, receivedProjectsBackoffice } from './reducers/backoffice-add-project-reducer';
import { SUBMIT_EDIT_USER_BACKOFFICE_BDD, LOAD_USERS_BACKOFFICE, receivedUsersBackOffice } from './reducers/backoffice-user-reducer';
import { SUBMIT_EDIT_PROMO_BACKOFFICE_BDD } from './reducers/backoffice-edit-promo';
import { SUBMIT_EDIT_PROJECT_BACKOFFICE_BDD } from './reducers/backoffice-edit-project';
import { SUBMIT_EDIT_SPE_BACKOFFICE_BDD } from './reducers/backoffice-edit-spe';
import { receivedToken } from './reducers/user-reducer';

const backOfficeMiddleware = store => next => (action) => {

  const { username } = store.getState().user.user;
  const { token } = store.getState().user.user;
  const url = 'http://92.243.19.15:8080/';

  switch (action.type) {
    case ADD_USER_FORM_SUBMIT_BDD:
      axios.post(`${url}backoffice/users/new`, {
        username,
        new_username: store.getState().addUserBackOffice.new_username,
        firstname: store.getState().addUserBackOffice.firstname,
        lastname: store.getState().addUserBackOffice.lastname,
        email: store.getState().addUserBackOffice.email,
        promotion: store.getState().addUserBackOffice.promotion,
        specialization: store.getState().addUserBackOffice.specialization,
        project: store.getState().addUserBackOffice.project,
        admin: store.getState().addUserBackOffice.admin,
      })
        .then((result) => {
          store.dispatch(receivedUsersBackOffice(result.data.usersArray));
          getHistory().push('/admin');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_EDIT_USER_BACKOFFICE_BDD:
      axios.post(`${url}backoffice/users/${store.getState().userBackOffice.editedUser.user_id}/edit`, {
        username,
        user_id: store.getState().userBackOffice.editedUser.user_id,
        new_username: store.getState().userBackOffice.editedUser.new_username,
        firstname: store.getState().userBackOffice.editedUser.firstname,
        lastname: store.getState().userBackOffice.editedUser.lastname,
        email: store.getState().userBackOffice.editedUser.email,
        admin: store.getState().userBackOffice.editedUser.admin,
        promotion: store.getState().userBackOffice.editedUser.promotion,
        specialization: store.getState().userBackOffice.editedUser.specialization,
      })
        .then((result) => {
          store.dispatch(receivedUsersBackOffice(result.data.usersArray));
          getHistory().push('/admin');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case ADD_PROMO_SUBMIT_BDD:
      axios.post(` ${url}backoffice/promotion/new`, {
        username,
        name: store.getState().addPromoBackOffice.promo,
      })
        .then((result) => {
          store.dispatch(receivedPromosBackoffice(result.data.promotionList));
          getHistory().push('/admin/list');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case ADD_SPE_SUBMIT_BDD:
      axios.post(` ${url}backoffice/speciality/new`, {
        username,
        name: store.getState().addSpeBackOffice.spe,
        promotion_name: store.getState().addSpeBackOffice.promotion_name,
      })
        .then((result) => {
          store.dispatch(receivedSpesBackoffice(result.data.specializationList));
          getHistory().push('/admin/list');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case ADD_PROJECT_SUBMIT_BDD:
      axios.post(`${url}backoffice/project/new`,
        {
          username,
          name: store.getState().addProjectBackOffice.project,
          promotion_name: store.getState().addProjectBackOffice.promotion_name,
        })
        .then((result) => {
          store.dispatch(receivedProjectsBackoffice(result.data.projectList));
          getHistory().push('/admin/list');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case LOAD_USERS_BACKOFFICE:
      axios.post(`${url}backoffice/users/`,
        {
          username,
          token,
        })
        .then((result) => {
          store.dispatch(receivedUsersBackOffice(result.data.usersArray));
          store.dispatch(receivedToken(result.data.token));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case LOAD_PROMOS_BACKOFFICE:
      axios.post(`${url}backoffice/users/`,
        {
          username,
          token,
        })
        .then((result) => {
          const arrayUser = result.data.usersArray;
          const oneArrayPromUser = arrayUser.map(oneUser => oneUser.promotionList);
          const arrayPromoSingleUser = oneArrayPromUser.map(oneUserArray => oneUserArray);
          arrayPromoSingleUser.map(oneProm => store.dispatch(receivedPromosBackoffice(oneProm)));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case LOAD_SPES_BACKOFFICE:
      axios.post(`${url}backoffice/users/`,
        {
          username,
          token,
        })
        .then((result) => {
          const arrayUser = result.data.usersArray;
          const oneArraySpeUser = arrayUser.map(oneUser => oneUser.specializationList);
          const arraySpeSingleUser = oneArraySpeUser.map(oneUserArray => oneUserArray);
          arraySpeSingleUser.map(oneSpe => store.dispatch(receivedSpesBackoffice(oneSpe)));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case LOAD_PROJECTS_BACKOFFICE:
      axios.post(`${url}backoffice/users/`,
        {
          username,
          token,
        })
        .then((result) => {
          const arrayUser = result.data.usersArray;
          const oneArrayPromUser = arrayUser.map(oneUser => oneUser.projectList);
          const arrayProjectsSingleUser = oneArrayPromUser.map(oneUserArray => oneUserArray);
          arrayProjectsSingleUser.map(oneProject => store.dispatch(receivedProjectsBackoffice(oneProject)));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_EDIT_PROMO_BACKOFFICE_BDD:
      axios.post(`${url}backoffice/promotion/${store.getState().editPromoBackOffice.id}/edit`,
        {
          username,
          name: store.getState().editPromoBackOffice.editedPromo,
        })
        .then((result) => {
          console.log(result);
          store.dispatch(receivedPromosBackoffice(result.data.promotionList));
          getHistory().push('/admin/list');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_EDIT_PROJECT_BACKOFFICE_BDD:
      axios.post(`${url}backoffice/project/${store.getState().editProjectBackOffice.id}/edit`,
        {
          username,
          name: store.getState().editProjectBackOffice.original.name,
          new_name: store.getState().editProjectBackOffice.editedProject,
          promotion_name: store.getState().editProjectBackOffice.new_promo,
        })
        .then((result) => {
          store.dispatch(receivedProjectsBackoffice(result.data.projectList));
          getHistory().push('/admin/list');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_EDIT_SPE_BACKOFFICE_BDD:
      console.log(store.getState().editSpeBackOffice.editedSpe);
      console.log(store.getState().editSpeBackOffice.old_spe);
      console.log(store.getState().editSpeBackOffice.id);
      console.log(store.getState().editSpeBackOffice.promo);

      axios.post(`${url}backoffice/speciality/${store.getState().editSpeBackOffice.id}/edit`,
        {
          username,
          name: store.getState().editSpeBackOffice.old_spe,
          new_name: store.getState().editSpeBackOffice.editedSpe,
          new_promotion_name: store.getState().editSpeBackOffice.promo,
        })
        .then((result) => {
          store.dispatch(receivedSpesBackoffice(result.data.specializationList));
          getHistory().push('/admin/list');
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
      next(action);
  }
};

export default backOfficeMiddleware;
