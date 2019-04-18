import React from 'react';

import OneUser from './OneUser';
import './table.scss';

const Table = ({ users, promos, projects, specialisations, roles, submitForm, submitFormBDD }) => {
  return (
    <div id="main-backoffice">
      <div id="main-backoffice-table">
        <div id="main-backoffice-table-titles">
          <div className="mainback-office-table-titles-title">Username</div>
          <div className="mainback-office-table-titles-title">Nom</div>
          <div className="mainback-office-table-titles-title">Prénom</div>
          <div className="mainback-office-table-titles-title">Email</div>
          <div className="mainback-office-table-titles-title">Promo</div>
          <div className="mainback-office-table-titles-title">Spé</div>
          <div className="mainback-office-table-titles-title">Project</div>
          <div className="mainback-office-table-titles-title">Status</div>
          <div className="mainback-office-table-titles-title">Edit</div>
        </div>
        <div className="main-backoffice-table-rows">
          {users.map(user =>
            <OneUser
              user={user}
              promo={promos.map(promo => promo)}
              projects={projects}
              specialisations={specialisations}
              roles={roles}
              submitForm={submitForm}
              submitFormBDD={submitFormBDD}
            />
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Table;
