import React from 'react';

import './formselect.scss';

const FormSelect = ({ submitPromo, submitSpe, submitStatus, submitProject, promos, specialisations, projects, roles }) => {


  const handleSelectPromo = (event) => {
    const { value } = event.target;
    submitPromo(value);
  };

  const handleSelectSpe = (event) => {
    const { value } = event.target;
    submitSpe(value);
  };
  const handleSelectStatus = (event) => {
    const { value } = event.target;
    if (value === 'Prof') {
      const value = true;
      submitStatus(value);
    }
    else {
      const value = false;
      submitStatus(value);
    }
  };


  const handleSelectProject = (event) => {
    const { value } = event.target;
    submitProject(value);
  };

  return (
    <div id="backoffice-adduser-form-select">
      <div className="backoffice-adduser-form-select-single">
        <div className="backoffice-adduser-form-select-single-title">Promo</div>
        <select className="backoffice-adduser-form-select-single-global" onChange={handleSelectPromo}>
          <option value="" disabled selected>Promotion</option>
          {promos.map(onePromo => <option name={onePromo.name} value={onePromo.name}>{onePromo.name}</option>)}
        </select>
      </div>
      <div className="backoffice-adduser-form-select-single">
        <div className="backoffice-adduser-form-select-single-title">Spé</div>
        <select className="backoffice-adduser-form-select-single-global" onChange={handleSelectSpe}>
          <option value="" disabled selected>Spécialisation</option>
          {specialisations.map(specialisation => <option name={specialisation.name} value={specialisation.name}>{specialisation.name}</option>)}
        </select>
      </div>
      <div className="backoffice-adduser-form-select-single">
        <div className="backoffice-adduser-form-select-single-title">Project</div>
        <select className="backoffice-adduser-form-select-single-global" onChange={handleSelectProject}>
          <option value="" disabled selected>Projet</option>
          {projects.map(oneProject => <option name={oneProject.name} value={oneProject.name}>{oneProject.name}</option>)}
        </select>
      </div>
      <div className="backoffice-adduser-form-select-single">
        <div className="backoffice-adduser-form-select-single-title">Rôle</div>
        <select className="backoffice-adduser-form-select-single-global" onChange={handleSelectStatus}>
          <option value="" selected disabled>Rôle</option>
          {roles.map(oneStatus => {
            if (oneStatus) {
              return (<option name='prof' value={oneStatus}>Prof</option>)
            } else {
              return (<option name='student' value={oneStatus}>Elève</option>)
            }
          })}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
